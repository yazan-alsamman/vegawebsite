import bcrypt from "bcryptjs";
import { projects } from "../src/data/projects.js";
import { Project } from "./models/Project.js";
import { AdminUser } from "./models/AdminUser.js";

export async function seedDatabase() {
  const projectCount = await Project.countDocuments();

  if (projectCount === 0) {
    await Project.insertMany(
      projects.map((project, index) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        category: project.category,
        url: project.url ?? null,
        featured: Boolean(project.featured),
        image: project.image,
        logo: project.logo ?? null,
        logoFit: project.logoFit ?? "cover",
        tags: project.tags,
        sortOrder: index,
        published: true,
      })),
    );
    console.log(`Seeded ${projects.length} projects`);
  }

  const adminCount = await AdminUser.countDocuments();

  if (adminCount === 0) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const passwordHash = bcrypt.hashSync(password, 10);

    await AdminUser.create({ username, passwordHash });
    console.log(`Created admin user "${username}"`);
  }
}
