import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectForm from "./pages/admin/AdminProjectForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/projects" replace />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<AdminProjectForm />} />
            <Route path="projects/:id/edit" element={<AdminProjectForm />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4 text-center">
              <div>
                <h1 className="font-display text-3xl font-bold text-white mb-3">Page not found</h1>
                <p className="text-slate-400 mb-6">The page you requested does not exist.</p>
                <a href="/" className="text-blue-400 hover:text-blue-300">
                  Back to home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
