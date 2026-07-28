import { Outlet, Link, NavLink } from 'react-router-dom';
import { useThemeStore } from '../../stores/themeStore';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function LandingLayout() {
  const { theme, toggle } = useThemeStore();
  const [open, setOpen] = useState(false);
  const links = [
    { to: '/pricing', label: 'Pricing' },
    { to: '/docs', label: 'Docs' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">L</div>
            <span className="font-semibold text-lg hidden sm:block">Licarl Prompt Maker</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400">
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="btn-ghost p-2">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/login" className="btn-ghost hidden sm:inline-flex">Sign in</Link>
            <Link to="/register" className="btn-primary">Get started</Link>
            <button className="md:hidden btn-ghost p-2" onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link to="/login" className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>Sign in</Link>
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-sm">L</div>
                <span className="font-semibold">Licarl</span>
              </div>
              <p className="text-sm text-slate-500">Enterprise AI prompt workspace.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/pricing" className="hover:text-brand-600">Pricing</Link></li>
                <li><Link to="/docs" className="hover:text-brand-600">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="mailto:hello@licarl.prompt" className="hover:text-brand-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-brand-600">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-600">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6 text-center text-sm text-slate-500">
            (c) 2026 Licarl Prompt Maker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
