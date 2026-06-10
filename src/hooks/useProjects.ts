import { useEffect, useState } from "react";
import { fetchProjects, type ProjectFilters } from "../api/projects";
import { projects as staticProjects, featuredProjects as staticFeatured } from "../data/projects";
import type { Project, ProjectCategory, ProjectRecord } from "../types/project";
import { toProject } from "../types/project";

interface UseProjectsResult {
  projects: Project[];
  featuredProjects: Project[];
  loading: boolean;
  error: string | null;
  source: "api" | "static";
  refresh: () => void;
}

function filterStatic(filters: ProjectFilters): Project[] {
  let list = staticProjects;

  if (filters.featured) {
    list = staticFeatured;
  } else if (filters.category && filters.category !== "all") {
    list = staticProjects.filter((p) => p.category === filters.category);
  }

  return list;
}

export function useProjects(filters: ProjectFilters = {}): UseProjectsResult {
  const [records, setRecords] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"api" | "static">("static");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProjects(filters);
        if (!cancelled) {
          setRecords(data);
          setSource("api");
        }
      } catch {
        if (!cancelled) {
          setRecords([]);
          setSource("static");
          setError(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [filters.category, filters.featured, tick]);

  const projects =
    source === "api" ? records.map(toProject) : filterStatic(filters);

  const featuredProjects =
    source === "api"
      ? records.filter((p) => p.featured).map(toProject)
      : staticFeatured;

  return {
    projects,
    featuredProjects,
    loading,
    error,
    source,
    refresh: () => setTick((v) => v + 1),
  };
}

export function useAdminProjects() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects({ published: "all" }, true);
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { projects, loading, error, refresh: load };
}

export type { ProjectCategory };
