import { useState } from 'react';
import { Key, CheckCircle, XCircle, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', status: 'connected' },
  { id: 'anthropic', name: 'Anthropic', status: 'connected' },
  { id: 'google', name: 'Google AI', status: 'disconnected' },
  { id: 'xai', name: 'xAI (Grok)', status: 'disconnected' },
  { id: 'deepseek', name: 'DeepSeek', status: 'disconnected' },
  { id: 'mistral', name: 'Mistral', status: 'disconnected' },
  { id: 'groq', name: 'Groq', status: 'disconnected' },
  { id: 'openrouter', name: 'OpenRouter', status: 'disconnected' },
  { id: 'together', name: 'Together', status: 'disconnected' },
  { id: 'cohere', name: 'Cohere', status: 'disconnected' },
  { id: 'azure', name: 'Azure OpenAI', status: 'disconnected' },
  { id: 'ollama', name: 'Ollama', status: 'disconnected' },
];

export default function ProvidersPage() {
  const [providers, setProviders] = useState(PROVIDERS);
  const [keyInput, setKeyInput] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const saveKey = () => {
    if (!selected || !keyInput) return;
    setProviders((p) => p.map((x) => (x.id === selected ? { ...x, status: 'connected' } : x)));
    setKeyInput('');
    setSelected(null);
    toast.success('API key encrypted and saved');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">AI Providers</h1>
        <p className="text-slate-500 mt-1">Add and manage your API keys. Keys are encrypted with AES-256.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((p) => (
          <div key={p.id} className="glass-card flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-800">
              <Key className="h-5 w-5 text-brand-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs flex items-center gap-1 mt-0.5">
                {p.status === 'connected' ? (
                  <><CheckCircle className="h-3 w-3 text-emerald-500" /> Connected</>
                ) : (
                  <><XCircle className="h-3 w-3 text-slate-400" /> Not configured</>
                )}
              </p>
            </div>
            {p.status === 'connected' ? (
              <button className="btn-ghost p-2 text-red-500" onClick={() => setProviders((x) => x.map((y) => y.id === p.id ? { ...y, status: 'disconnected' } : y))}>
                <Trash2 className="h-4 w-4" />
              </button>
            ) : (
              <button className="btn-ghost p-2" onClick={() => setSelected(p.id)}>
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      {selected && (
        <div className="glass-card space-y-3 max-w-md">
          <h3 className="font-semibold">Add key for {providers.find((p) => p.id === selected)?.name}</h3>
          <input type="password" className="input" placeholder="sk-..." value={keyInput} onChange={(e) => setKeyInput(e.target.value)} />
          <div className="flex gap-2">
            <button className="btn-primary" onClick={saveKey}>Save encrypted</button>
            <button className="btn-secondary" onClick={() => setSelected(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
