import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Save, Copy, Archive, Sparkles, Play, History, Variable } from 'lucide-react';
import toast from 'react-hot-toast';
import { useThemeStore } from '../../stores/themeStore';

export default function PromptBuilderPage() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const theme = useThemeStore((s) => s.theme);
  const [title, setTitle] = useState(isNew ? '' : 'Customer Support System Prompt');
  const [content, setContent] = useState(
    'You are a helpful customer support agent for {{company_name}}.\n\nGuidelines:\n- Be polite and professional\n- Escalate complex issues\n- Never share internal data'
  );
  const [tags, setTags] = useState('support, system');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success(isNew ? 'Prompt created' : 'Prompt saved');
    setSaving(false);
    if (isNew) navigate('/app/prompts/1');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <input
          className="text-xl font-bold bg-transparent border-none outline-none flex-1 placeholder:text-slate-400"
          placeholder="Untitled prompt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-2 flex-wrap">
          <button className="btn-ghost text-sm"><History className="h-4 w-4" /> History</button>
          <button className="btn-ghost text-sm"><Variable className="h-4 w-4" /> Variables</button>
          <button className="btn-secondary text-sm" onClick={() => { navigator.clipboard.writeText(content); toast.success('Copied'); }}>
            <Copy className="h-4 w-4" />
          </button>
          <button className="btn-secondary text-sm"><Archive className="h-4 w-4" /></button>
          <button className="btn-secondary text-sm" onClick={() => navigate('/app/optimizer')}>
            <Sparkles className="h-4 w-4" /> Optimize
          </button>
          <button className="btn-secondary text-sm" onClick={() => navigate('/app/tester')}>
            <Play className="h-4 w-4" /> Test
          </button>
          <button className="btn-primary text-sm" onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <label className="text-sm text-slate-500">Tags:</label>
        <input className="input text-sm py-1.5 max-w-xs" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1, tag2" />
      </div>
      <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 min-h-[400px]">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          value={content}
          onChange={(v) => setContent(v || '')}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            lineNumbers: 'on',
            wordWrap: 'on',
            padding: { top: 16 },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div className="text-xs text-slate-400 flex items-center gap-4">
        <span>{content.length} characters</span>
        <span>~{Math.ceil(content.length / 4)} tokens (est.)</span>
        <span className="ml-auto">Autosave enabled</span>
      </div>
    </div>
  );
}
