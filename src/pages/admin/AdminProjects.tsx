import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Star, EyeOff } from "lucide-react";
import { useAdminProjects } from "../../hooks/useProjects";
import { deleteProject } from "../../api/projects";
import { assetUrl } from "../../api/client";
import { categoryLabels } from "../../types/project";

export default function AdminProjects() {
  const { projects, loading, error, refresh } = useAdminProjects();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    try {
      await deleteProject(id);
      refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 mt-1">Add, edit, and manage portfolio projects.</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition-colors"
        >
          <Plus size={18} />
          Add project
        </Link>
      </div>

      {loading && <p className="text-slate-400">Loading projects...</p>}
      {error && (
        <p className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-navy-900/50">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-4">Preview</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <img
                        src={assetUrl(project.logo || project.image)}
                        alt={project.name}
                        className="w-16 h-12 rounded-lg object-cover bg-navy-950 border border-white/10"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{project.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{project.id}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {categoryLabels[project.category]}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-amber-500/15 text-amber-300 border border-amber-500/20">
                            <Star size={12} />
                            Featured
                          </span>
                        )}
                        {!project.published && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-slate-500/15 text-slate-300 border border-slate-500/20">
                            <EyeOff size={12} />
                            Draft
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/projects/${project.id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-blue-300 hover:bg-blue-600/10 transition-colors"
                        >
                          <Pencil size={15} />
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id, project.name)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="px-5 py-16 text-center text-slate-400">
              No projects yet. Create your first project.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
