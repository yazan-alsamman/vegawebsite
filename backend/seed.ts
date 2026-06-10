import bcrypt from "bcryptjs";
import { db } from "./database.js";
import { projects } from "../src/data/projects.js";

export function seedDatabase() {
  const projectCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as {
    count: number;
  };

  if (projectCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO projects (
        id, name, description, category, url, featured, image, logo, logo_fit, tags, sort_order, published
      ) VALUES (
        @id, @name, @description, @category, @url, @featured, @image, @logo, @logo_fit, @tags, @sort_order, @published
      )
    `);

    const insertMany = db.transaction((items: typeof projects) => {
      items.forEach((project, index) => {
        insert.run({
          id: project.id,
          name: project.name,
          description: project.description,
          category: project.category,
          url: project.url ?? null,
          featured: project.featured ? 1 : 0,
          image: project.image,
          logo: project.logo ?? null,
          logo_fit: project.logoFit ?? "cover",
          tags: JSON.stringify(project.tags),
          sort_order: index,
          published: 1,
        });
      });
    });

    insertMany(projects);
    console.log(`Seeded ${projects.length} projects`);
  }

  const adminCount = db.prepare("SELECT COUNT(*) as count FROM admin_users").get() as {
    count: number;
  };

  if (adminCount.count === 0) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const passwordHash = bcrypt.hashSync(password, 10);

    db.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)").run(
      username,
      passwordHash,
    );

    console.log(`Created admin user "${username}"`);
  }
}
