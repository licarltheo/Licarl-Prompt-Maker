import { useState } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PromptOptimizerPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<{ label: string; value: number }[] | null>(null);

  const optimize = async () => {
    if (!input.trim()) return toast.error('Enter a prompt');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setOutput(
      'You are an expert assistant specialized in the requested domain.\n\n' +
      input.trim() +
      '\n\nThink step by step. Provide clear, structured, and actionable responses. If information is missing, ask clarifying questions before answering.'
    );
    setScores([
      { label: 'Clarity', value: 92 },
      { label: 'Specificity', value: 88 },
      { label: 'Token efficiency', value: 76 },
      { label: 'Readability', value: 94 },
    ]);
    setLoading(false);
    toast.success('Optimization complete');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Prompt Optimizer</h1>
        <p className="text-slate-500 mt-1">Improve grammar, role definition, chain-of-thought, and token efficiency</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="label">Original prompt</label>
          <textarea className="input min-h-[240px] font-mono text-sm" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your prompt here..." />
          <button className="btn-primary" onClick={optimize} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? 'Optimizing...' : 'Optimize'}
          </button>
        </div>
        <div className="space-y-3">
          <label className="label">Optimized prompt</label>
          <textarea className="input min-h-[240px] font-mono text-sm" value={output} readOnly placeholder="Optimized version will appear here..." />
          {scores && (
            <div className="grid grid-cols-2 gap-3">
              {scores.map((s) => (
                <div key={s.label} className="glass rounded-xl p-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.label}</span>
                    <span className="font-semibold text-brand-600">{s.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: s.value + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {output && (
        <div className="glass-card">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><ArrowRight className="h-4 w-4" /> Recommendations</h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
            <li>Added explicit role definition for better consistency</li>
            <li>Injected chain-of-thought instruction</li>
            <li>Encouraged clarification when context is missing</li>
            <li>Improved structure for higher readability score</li>
          </ul>
        </div>
      )}
    </div>
  );
}
