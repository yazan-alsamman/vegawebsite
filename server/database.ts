import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "vegacore.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    url TEXT,
    featured INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL,
    logo TEXT,
    logo_fit TEXT NOT NULL DEFAULT 'cover',
    tags TEXT NOT NULL DEFAULT '[]',
    sort_order INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export interface DbProject {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string | null;
  featured: number;
  image: string;
  logo: string | null;
  logo_fit: string;
  tags: string;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  description: string;
  category: string;
  url?: string;
  featured: boolean;
  image: string;
  logo?: string;
  logoFit: "cover" | "contain";
  tags: string[];
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export function rowToProject(row: DbProject): ProjectRecord {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    url: row.url ?? undefined,
    featured: Boolean(row.featured),
    image: row.image,
    logo: row.logo ?? undefined,
    logoFit: (row.logo_fit as "cover" | "contain") || "cover",
    tags: JSON.parse(row.tags) as string[],
    sortOrder: row.sort_order,
    published: Boolean(row.published),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
