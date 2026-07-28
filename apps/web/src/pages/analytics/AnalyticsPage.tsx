export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-slate-500 mt-1">Prompt usage, token usage, provider costs, charts, and exports.</p>
      </div>
      <div className="glass-card">Usage and cost charts powered by Recharts when connected to the API.</div>
    </div>
  );
}
