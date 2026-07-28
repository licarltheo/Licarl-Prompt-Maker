export default function ChatPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">AI Chat</h1>
        <p className="text-slate-500 mt-1">Streaming conversations with markdown, code highlighting, and history.</p>
      </div>
      <div className="glass-card min-h-[400px] flex items-center justify-center text-slate-500">
        Connect a provider and start chatting. Streaming, regenerate, stop, and export are supported via the API.
      </div>
    </div>
  );
}
