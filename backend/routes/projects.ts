import { Router } from "express";
import { db, rowToProject, type DbProject } from "../database.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.map(String).map((t) => t.trim()).filter(Boolean);
  }
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

router.get("/", (req, res) => {
  const { category, featured, published } = req.query;
  const isAdmin = Boolean(req.headers.authorization?.startsWith("Bearer "));

  let sql = "SELECT * FROM projects WHERE 1=1";
  const params: Record<string, string | number> = {};

  if (!isAdmin || published !== "all") {
    sql += " AND published = 1";
  }

  if (category && category !== "all") {
    sql += " AND category = @category";
    params.category = String(category);
  }

  if (featured === "true") {
    sql += " AND featured = 1";
  }

  sql += " ORDER BY sort_order ASC, name ASC";

  const rows = db.prepare(sql).all(params) as DbProject[];
  res.json(rows.map(rowToProject));
});

router.get("/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id) as
    | DbProject
    | undefined;

  if (!row) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(rowToProject(row));
});

router.post("/", requireAuth, (req, res) => {
  const body = req.body as Record<string, unknown>;
  const name = String(body.name || "").trim();
  const description = String(body.description || "").trim();
  const category = String(body.category || "").trim();
  const image = String(body.image || "").trim();

  if (!name || !description || !category || !image) {
    res.status(400).json({ error: "Name, description, category, and image are required" });
    return;
  }

  const id = String(body.id || slugify(name) || "").trim() || `project-${Date.now()}`;
  const existing = db.prepare("SELECT id FROM projects WHERE id = ?").get(id);
  if (existing) {
    res.status(409).json({ error: "Project ID already exists" });
    return;
  }

  const maxOrder = db.prepare("SELECT MAX(sort_order) as max FROM projects").get() as {
    max: number | null;
  };

  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO projects (
      id, name, description, category, url, featured, image, logo, logo_fit, tags, sort_order, published, created_at, updated_at
    ) VALUES (
      @id, @name, @description, @category, @url, @featured, @image, @logo, @logo_fit, @tags, @sort_order, @published, @created_at, @updated_at
    )
  `).run({
    id,
    name,
    description,
    category,
    url: body.url ? String(body.url).trim() : null,
    featured: body.featured ? 1 : 0,
    image,
    logo: body.logo ? String(body.logo).trim() : null,
    logo_fit: body.logoFit === "contain" ? "contain" : "cover",
    tags: JSON.stringify(parseTags(body.tags)),
    sort_order: Number(body.sortOrder ?? (maxOrder.max ?? 0) + 1),
    published: body.published === false ? 0 : 1,
    created_at: now,
    updated_at: now,
  });

  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as DbProject;
  res.status(201).json(rowToProject(row));
});

router.put("/:id", requireAuth, (req, res) => {
  const existing = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id) as
    | DbProject
    | undefined;

  if (!existing) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const body = req.body as Record<string, unknown>;
  const name = String(body.name ?? existing.name).trim();
  const description = String(body.description ?? existing.description).trim();
  const category = String(body.category ?? existing.category).trim();
  const image = String(body.image ?? existing.image).trim();

  if (!name || !description || !category || !image) {
    res.status(400).json({ error: "Name, description, category, and image are required" });
    return;
  }

  const now = new Date().toISOString();

  db.prepare(`
    UPDATE projects SET
      name = @name,
      description = @description,
      category = @category,
      url = @url,
      featured = @featured,
      image = @image,
      logo = @logo,
      logo_fit = @logo_fit,
      tags = @tags,
      sort_order = @sort_order,
      published = @published,
      updated_at = @updated_at
    WHERE id = @id
  `).run({
    id: req.params.id,
    name,
    description,
    category,
    url: body.url !== undefined ? (body.url ? String(body.url).trim() : null) : existing.url,
    featured:
      body.featured !== undefined ? (body.featured ? 1 : 0) : existing.featured,
    image,
    logo:
      body.logo !== undefined ? (body.logo ? String(body.logo).trim() : null) : existing.logo,
    logo_fit:
      body.logoFit !== undefined
        ? body.logoFit === "contain"
          ? "contain"
          : "cover"
        : existing.logo_fit,
    tags:
      body.tags !== undefined
        ? JSON.stringify(parseTags(body.tags))
        : existing.tags,
    sort_order:
      body.sortOrder !== undefined ? Number(body.sortOrder) : existing.sort_order,
    published:
      body.published !== undefined ? (body.published ? 1 : 0) : existing.published,
    updated_at: now,
  });

  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id) as DbProject;
  res.json(rowToProject(row));
});

router.delete("/:id", requireAuth, (req, res) => {
  const result = db.prepare("DELETE FROM projects WHERE id = ?").run(req.params.id);

  if (result.changes === 0) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json({ success: true });
});

export default router;
