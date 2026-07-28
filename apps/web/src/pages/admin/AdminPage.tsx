export default function AdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-slate-500 mt-1">Users, providers, marketplace moderation, logs, system monitoring.</p>
      </div>
      <div className="glass-card">Restricted to admin and owner roles.</div>
    </div>
  );
}
