import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Sparkles, TestTube, MessageSquare,
  Bot, GitBranch, Store, BookOpen, FolderOpen, BarChart3,
  Users, Settings, Shield, LogOut, Moon, Sun, Menu, X, Bell
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { cn } from '../../lib/utils';

const nav = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/prompts', icon: FileText, label: 'Prompts' },
  { to: '/app/optimizer', icon: Sparkles, label: 'Optimizer' },
  { to: '/app/tester', icon: TestTube, label: 'Tester' },
  { to: '/app/chat', icon: MessageSquare, label: 'Chat' },
  { to: '/app/agents', icon: Bot, label: 'Agents' },
  { to: '/app/workflows', icon: GitBranch, label: 'Workflows' },
  { to: '/app/marketplace', icon: Store, label: 'Marketplace' },
  { to: '/app/knowledge', icon: BookOpen, label: 'Knowledge' },
  { to: '/app/files', icon: FolderOpen, label: 'Files' },
  { to: '/app/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/app/team', icon: Users, label: 'Team' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { theme, toggle } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-950">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-900 transition-transform lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold text-lg">L</div>
          <span className="font-semibold text-lg tracking-tight">Licarl</span>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-800'
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
          {(user?.role === 'admin' || user?.role === 'owner') && (
            <NavLink to="/app/admin" className={({ isActive }) => cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition', isActive ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface-800')}>
              <Shield className="h-5 w-5" />
              Admin
            </NavLink>
          )}
        </nav>
        <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-1">
          <button onClick={toggle} className="btn-ghost w-full justify-start">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button onClick={() => { logout(); navigate('/login'); }} className="btn-ghost w-full justify-start text-red-600 dark:text-red-400">
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md px-4 lg:px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <button className="btn-ghost relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-500" />
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.plan} plan</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
