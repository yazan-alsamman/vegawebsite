export type ProjectCategory =
  | "e-commerce"
  | "systems"
  | "ai-solutions"
  | "mobile-apps"
  | "cloud-solutions";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  url?: string;
  featured?: boolean;
  image: string;
  logo?: string;
  logoFit?: "cover" | "contain";
  tags: string[];
}

export interface ProjectRecord extends Project {
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  "e-commerce": "E-Commerce",
  systems: "Systems & Platforms",
  "ai-solutions": "AI Solutions",
  "mobile-apps": "Mobile Apps",
  "cloud-solutions": "Cloud Solutions",
};

export const categories: ProjectCategory[] = [
  "e-commerce",
  "systems",
  "ai-solutions",
  "mobile-apps",
  "cloud-solutions",
];

export function toProject(record: ProjectRecord): Project {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    category: record.category,
    url: record.url,
    featured: record.featured,
    image: record.image,
    logo: record.logo,
    logoFit: record.logoFit,
    tags: record.tags,
  };
}
