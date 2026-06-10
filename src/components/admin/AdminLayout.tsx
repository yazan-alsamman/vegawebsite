import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FolderKanban, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
      : "text-slate-400 hover:text-white hover:bg-white/5"
  }`;

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <div className="border-b border-white/10 bg-navy-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <LayoutDashboard size={18} className="text-blue-300" />
            </div>
            <div>
              <p className="font-display font-bold text-white">VegaCore Admin</p>
              <p className="text-xs text-slate-500">Portfolio management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-slate-400 hover:text-blue-300 transition-colors">
              View site
            </Link>
            <span className="text-sm text-slate-500">{user?.username}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          <aside className="space-y-2">
            <NavLink to="/admin/projects" className={navLinkClass}>
              <FolderKanban size={18} />
              Projects
            </NavLink>
          </aside>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
