import { Router } from "express";
import { Project } from "../models/Project.js";
import { toProjectRecord } from "../types.js";
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

router.get("/", async (req, res) => {
  try {
    const { category, featured, published } = req.query;
    const isAdmin = Boolean(req.headers.authorization?.startsWith("Bearer "));

    const filter: Record<string, unknown> = {};

    if (!isAdmin || published !== "all") {
      filter.published = true;
    }

    if (category && category !== "all") {
      filter.category = String(category);
    }

    if (featured === "true") {
      filter.featured = true;
    }

    const docs = await Project.find(filter).sort({ sortOrder: 1, name: 1 }).lean();
    res.json(docs.map((doc) => toProjectRecord(doc)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doc = await Project.findOne({ id: req.params.id }).lean();

    if (!doc) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json(toProjectRecord(doc));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
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
    const existing = await Project.findOne({ id }).lean();
    if (existing) {
      res.status(409).json({ error: "Project ID already exists" });
      return;
    }

    const maxOrderDoc = await Project.findOne().sort({ sortOrder: -1 }).select("sortOrder").lean();
    const nextOrder = Number(body.sortOrder ?? (maxOrderDoc?.sortOrder ?? 0) + 1);

    const doc = await Project.create({
      id,
      name,
      description,
      category,
      url: body.url ? String(body.url).trim() : null,
      featured: Boolean(body.featured),
      image,
      logo: body.logo ? String(body.logo).trim() : null,
      logoFit: body.logoFit === "contain" ? "contain" : "cover",
      tags: parseTags(body.tags),
      sortOrder: nextOrder,
      published: body.published !== false,
    });

    res.status(201).json(toProjectRecord(doc.toObject()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const existing = await Project.findOne({ id: req.params.id });

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

    existing.name = name;
    existing.description = description;
    existing.category = category;
    existing.image = image;

    if (body.url !== undefined) {
      existing.url = body.url ? String(body.url).trim() : null;
    }
    if (body.featured !== undefined) {
      existing.featured = Boolean(body.featured);
    }
    if (body.logo !== undefined) {
      existing.logo = body.logo ? String(body.logo).trim() : null;
    }
    if (body.logoFit !== undefined) {
      existing.logoFit = body.logoFit === "contain" ? "contain" : "cover";
    }
    if (body.tags !== undefined) {
      existing.tags = parseTags(body.tags);
    }
    if (body.sortOrder !== undefined) {
      existing.sortOrder = Number(body.sortOrder);
    }
    if (body.published !== undefined) {
      existing.published = Boolean(body.published);
    }

    await existing.save();
    res.json(toProjectRecord(existing.toObject()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const result = await Project.deleteOne({ id: req.params.id });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
