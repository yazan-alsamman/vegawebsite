import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logoWhite from "../assets/logo-white-clear.png";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy-900/80 border-t border-blue-400/15 backdrop-blur-xl">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <img src={logoWhite} alt="VegaCore" className="h-12 mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed">
              Transforming businesses into digital reality. Based in Damascus, Syria — serving clients worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@vegacore.co"
                  className="flex items-center gap-2 text-slate-400 text-sm hover:text-blue-400 transition-colors"
                >
                  <Mail size={16} />
                  contact@vegacore.co
                </a>
              </li>
              <li>
                <a
                  href="tel:+963939421195"
                  className="flex items-center gap-2 text-slate-400 text-sm hover:text-blue-400 transition-colors"
                >
                  <Phone size={16} />
                  +963 939 421 195
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin size={16} />
                Syria, Damascus
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/vegacore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-800 border border-blue-600/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com/vegacore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-800 border border-blue-600/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://linkedin.com/company/vegacore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-800 border border-blue-600/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://wa.me/963939421195"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-800 border border-blue-600/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-green-600 hover:border-green-600 transition-all"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-600/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {year} VegaCore. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Crafted with precision in Damascus, Syria
          </p>
        </div>
      </div>
    </footer>
  );
}
