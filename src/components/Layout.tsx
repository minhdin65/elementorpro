import { Link, Outlet } from "react-router-dom";
import { LayoutDashboard, Mail, FileText, Shield, AlertTriangle } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-tight">
            <LayoutDashboard className="w-6 h-6" />
            <span>elementor.skin</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/products" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Products</Link>
            <Link to="/blog" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Blog</Link>
            <Link to="/contact" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <LayoutDashboard className="w-6 h-6" />
              <span>elementor.skin</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your ultimate guide to mastering Elementor. We provide in-depth tutorials, reviews, and tips to help you build better WordPress websites.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-white flex items-center gap-2 transition-colors">
                  <Shield className="w-4 h-4" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white flex items-center gap-2 transition-colors">
                  <FileText className="w-4 h-4" /> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white flex items-center gap-2 transition-colors">
                  <AlertTriangle className="w-4 h-4" /> Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/contact" className="hover:text-white flex items-center gap-2 transition-colors">
                  <Mail className="w-4 h-4" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
          &copy; 2025 elementor.skin. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
