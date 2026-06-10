import type { ProjectCategory, ProjectRecord } from "../types/project";
import { apiFetch } from "./client";

export interface ProjectFilters {
  category?: ProjectCategory | "all";
  featured?: boolean;
  published?: "all";
}

export async function fetchProjects(filters: ProjectFilters = {}, admin = false) {
  const params = new URLSearchParams();

  if (filters.category && filters.category !== "all") {
    params.set("category", filters.category);
  }
  if (filters.featured) {
    params.set("featured", "true");
  }
  if (filters.published === "all") {
    params.set("published", "all");
  }

  const query = params.toString();
  const path = `/api/projects${query ? `?${query}` : ""}`;

  return apiFetch<ProjectRecord[]>(path, {}, admin);
}

export async function fetchProject(id: string) {
  return apiFetch<ProjectRecord>(`/api/projects/${id}`, {}, true);
}

export type ProjectInput = Omit<ProjectRecord, "createdAt" | "updatedAt">;

export type ProjectPayload = Partial<ProjectInput> & {
  tags?: string[] | string;
};

export async function createProject(
  data: ProjectPayload & Pick<ProjectRecord, "name" | "description" | "category" | "image">,
) {
  return apiFetch<ProjectRecord>("/api/projects", {
    method: "POST",
    body: JSON.stringify(data),
  }, true);
}

export async function updateProject(id: string, data: ProjectPayload) {
  return apiFetch<ProjectRecord>(`/api/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }, true);
}

export async function deleteProject(id: string) {
  return apiFetch<{ success: boolean }>(`/api/projects/${id}`, {
    method: "DELETE",
  }, true);
}

export async function uploadImage(file: File, type: "project" | "logo" = "project") {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch<{ url: string; filename: string }>(
    `/api/upload?type=${type === "logo" ? "logo" : "project"}`,
    {
      method: "POST",
      body: formData,
    },
    true,
  );
}
