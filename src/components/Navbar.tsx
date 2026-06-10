import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoWhite from "../assets/logo-white-clear.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card border-b border-blue-400/15 shadow-xl shadow-blue-900/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group shrink-0 z-10">
            <motion.img
              src={logoWhite}
              alt="VegaCore"
              className="h-10 sm:h-11 w-auto transition-transform group-hover:scale-105"
              whileHover={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.4 }}
            />
          </Link>

          {/* Centered page links — always visible on sm+ */}
          <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 lg:gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-2.5 lg:px-4 py-2 text-xs lg:text-sm font-medium whitespace-nowrap transition-colors rounded-lg ${
                  location.pathname === link.to
                    ? "text-blue-300"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1.5 right-1.5 lg:left-2 lg:right-2 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 z-10">
            <Link
              to="/contact"
              className="hidden sm:inline-flex px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs lg:text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:scale-105 whitespace-nowrap"
            >
              Get Started
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="sm:hidden p-2 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden glass-card border-b border-blue-400/15"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === link.to
                      ? "bg-blue-600/15 text-blue-300"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center bg-blue-600 text-white"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
