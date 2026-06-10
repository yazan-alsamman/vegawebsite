import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import {
  createProject,
  fetchProject,
  updateProject,
  uploadImage,
} from "../../api/projects";
import { assetUrl } from "../../api/client";
import {
  categories,
  categoryLabels,
  type ProjectCategory,
} from "../../types/project";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  category: "e-commerce" as ProjectCategory,
  url: "",
  featured: false,
  image: "",
  logo: "",
  logoFit: "cover" as "cover" | "contain",
  tags: "",
  sortOrder: 0,
  published: true,
};

export default function AdminProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetchProject(id)
      .then((project) => {
        setForm({
          id: project.id,
          name: project.name,
          description: project.description,
          category: project.category,
          url: project.url || "",
          featured: Boolean(project.featured),
          image: project.image,
          logo: project.logo || "",
          logoFit: project.logoFit || "cover",
          tags: project.tags.join(", "),
          sortOrder: project.sortOrder,
          published: project.published,
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load project"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleImageUpload = async (file: File, type: "project" | "logo") => {
    const setUploading = type === "logo" ? setUploadingLogo : setUploadingImage;
    setUploading(true);
    setError("");

    try {
      const { url } = await uploadImage(file, type);
      setForm((prev) => ({
        ...prev,
        [type === "logo" ? "logo" : "image"]: url,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      id: form.id || undefined,
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      url: form.url.trim() || undefined,
      featured: form.featured,
      image: form.image.trim(),
      logo: form.logo.trim() || undefined,
      logoFit: form.logoFit,
      tags,
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
    };

    try {
      if (isEdit && id) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading project...</p>;
  }

  return (
    <div>
      <Link
        to="/admin/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-300 mb-6"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">
          {isEdit ? "Edit project" : "Add new project"}
        </h1>
        <p className="text-slate-400 mt-1">
          Upload images and fill in project details for the portfolio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="space-y-5 rounded-2xl border border-white/10 bg-navy-900/50 p-6">
          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Project ID (slug)</label>
              <input
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                placeholder="auto-generated from name if empty"
                className="w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Project name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50 resize-y"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
                className="w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryLabels[cat]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sort order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className="w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Website URL</label>
            <input
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tags (comma separated)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="E-Commerce, Web App, React"
              className="w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50"
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-white/20"
              />
              Featured project
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-white/20"
              />
              Published on website
            </label>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-navy-900/50 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Project image *</label>
              {form.image && (
                <img
                  src={assetUrl(form.image)}
                  alt="Project preview"
                  className="w-full h-40 object-cover rounded-xl border border-white/10 mb-3"
                />
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-slate-200 cursor-pointer transition-colors">
                {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {uploadingImage ? "Uploading..." : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "project");
                  }}
                />
              </label>
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/uploads/projects/... or external URL"
                className="w-full mt-3 rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Logo (optional)</label>
              {form.logo && (
                <img
                  src={assetUrl(form.logo)}
                  alt="Logo preview"
                  className="w-full h-28 object-contain rounded-xl border border-white/10 bg-navy-950 mb-3 p-3"
                />
              )}
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-slate-200 cursor-pointer transition-colors">
                {uploadingLogo ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {uploadingLogo ? "Uploading..." : "Upload logo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "logo");
                  }}
                />
              </label>
              <input
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
                placeholder="/uploads/logos/... or external URL"
                className="w-full mt-3 rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Logo fit</label>
              <select
                value={form.logoFit}
                onChange={(e) =>
                  setForm({ ...form, logoFit: e.target.value as "cover" | "contain" })
                }
                className="w-full rounded-xl border border-white/10 bg-navy-950/80 px-4 py-3 text-white outline-none focus:border-blue-500/50"
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-3 transition-colors"
          >
            {saving ? "Saving..." : isEdit ? "Update project" : "Create project"}
          </button>
        </div>
      </form>
    </div>
  );
}
