export default function AgentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">AI Agents</h1>
        <p className="text-slate-500 mt-1">Create agents with system prompts, memory, tools, and marketplace sharing.</p>
      </div>
      <div className="glass-card">Configure temperature, top-p, max tokens, avatars, and knowledge sources for each agent.</div>
    </div>
  );
}
