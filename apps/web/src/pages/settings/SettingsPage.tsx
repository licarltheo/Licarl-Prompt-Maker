import { Link } from 'react-router-dom';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-slate-500 mt-1">Profile, security, notifications, and integrations.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/app/settings/providers" className="glass-card hover:border-brand-500/30 transition">
          <h3 className="font-semibold">AI Providers</h3>
          <p className="text-sm text-slate-500 mt-1">Manage API keys and default models</p>
        </Link>
        <div className="glass-card">
          <h3 className="font-semibold">Security</h3>
          <p className="text-sm text-slate-500 mt-1">2FA, sessions, devices, password</p>
        </div>
        <div className="glass-card">
          <h3 className="font-semibold">Notifications</h3>
          <p className="text-sm text-slate-500 mt-1">Email, push, mentions, workflow events</p>
        </div>
        <div className="glass-card">
          <h3 className="font-semibold">Billing</h3>
          <p className="text-sm text-slate-500 mt-1">Plan, usage, invoices</p>
        </div>
      </div>
    </div>
  );
}
