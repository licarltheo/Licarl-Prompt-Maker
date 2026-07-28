import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatTokens, formatCost } from '../../lib/utils';

const PROVIDERS = [
  { id: 'openai', name: 'ChatGPT', model: 'gpt-4o' },
  { id: 'anthropic', name: 'Claude', model: 'claude-3-5-sonnet' },
  { id: 'google', name: 'Gemini', model: 'gemini-1.5-pro' },
  { id: 'xai', name: 'Grok', model: 'grok-2' },
  { id: 'deepseek', name: 'DeepSeek', model: 'deepseek-chat' },
  { id: 'mistral', name: 'Mistral', model: 'mistral-large' },
];

interface Result {
  provider: string;
  name: string;
  response: string;
  latency: number;
  tokens: number;
  cost: number;
  status: 'ok' | 'error';
}

export default function PromptTesterPage() {
  const [prompt, setPrompt] = useState('Explain quantum entanglement in simple terms.');
  const [selected, setSelected] = useState<string[]>(['openai', 'anthropic', 'xai']);
  const [results, setResults] = useState<Result[]>([]);
  const [running, setRunning] = useState(false);

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const run = async () => {
    if (!selected.length) return toast.error('Select at least one provider');
    setRunning(true);
    setResults([]);
    const mocks: Result[] = selected.map((id) => {
      const p = PROVIDERS.find((x) => x.id === id)!;
      return {
        provider: id,
        name: p.name,
        response: 'This is a simulated response from ' + p.name + ' (' + p.model + ') for the prompt.\n\nQuantum entanglement is a phenomenon where two particles become linked so that the state of one instantly influences the other, regardless of distance.',
        latency: 400 + Math.random() * 1200,
        tokens: 80 + Math.floor(Math.random() * 120),
        cost: 0.001 + Math.random() * 0.02,
        status: 'ok' as const,
      };
    });
    await new Promise((r) => setTimeout(r, 1500));
    setResults(mocks);
    setRunning(false);
    toast.success('Tested on ' + mocks.length + ' providers');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Prompt Tester</h1>
        <p className="text-slate-500 mt-1">Test one prompt across multiple AI providers simultaneously</p>
      </div>
      <div className="glass-card space-y-4">
        <label className="label">Prompt</label>
        <textarea className="input min-h-[120px] font-mono text-sm" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <div>
          <label className="label">Providers</label>
          <div className="flex flex-wrap gap-2">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={'rounded-full px-4 py-1.5 text-sm font-medium border transition ' + (selected.includes(p.id) ? 'bg-brand-600 text-white border-brand-600' : 'border-slate-200 dark:border-slate-700 hover:border-brand-400')}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <button className="btn-primary" onClick={run} disabled={running}>
          {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {running ? 'Running...' : 'Run test'}
        </button>
      </div>
      {results.length > 0 && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {results.map((r) => (
            <div key={r.provider} className="glass-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{r.name}</h3>
                <span className="text-xs rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5">OK</span>
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span>{Math.round(r.latency)}ms</span>
                <span>{formatTokens(r.tokens)} tok</span>
                <span>{formatCost(r.cost)}</span>
              </div>
              <div className="text-sm whitespace-pre-wrap bg-slate-50 dark:bg-surface-800 rounded-xl p-3 max-h-48 overflow-y-auto">
                {r.response}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
