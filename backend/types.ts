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

export interface ProjectDocLike {
  id: string;
  name: string;
  description: string;
  category: string;
  url?: string | null;
  featured?: boolean;
  image: string;
  logo?: string | null;
  logoFit?: "cover" | "contain";
  tags?: string[];
  sortOrder?: number;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export function toProjectRecord(doc: ProjectDocLike): ProjectRecord {
  return {
    id: doc.id,
    name: doc.name,
    description: doc.description,
    category: doc.category,
    url: doc.url || undefined,
    featured: Boolean(doc.featured),
    image: doc.image,
    logo: doc.logo || undefined,
    logoFit: doc.logoFit || "cover",
    tags: doc.tags || [],
    sortOrder: doc.sortOrder ?? 0,
    published: doc.published !== false,
    createdAt: doc.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString() || new Date().toISOString(),
  };
}
