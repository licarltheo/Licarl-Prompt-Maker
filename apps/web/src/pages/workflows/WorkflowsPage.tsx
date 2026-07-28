export default function WorkflowsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Workflow Builder</h1>
        <p className="text-slate-500 mt-1">Visual drag-and-drop: prompt, condition, loop, delay, API, chat, and output nodes.</p>
      </div>
      <div className="glass-card min-h-[360px] flex items-center justify-center text-slate-500">
        Canvas for workflow nodes. Execution history and scheduling available via API.
      </div>
    </div>
  );
}
