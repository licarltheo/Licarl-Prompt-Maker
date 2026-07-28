import { Link } from 'react-router-dom';
import { Plus, Search, Star, Folder, Tag } from 'lucide-react';
import { useState } from 'react';

const mockPrompts = [
  { id: '1', title: 'Customer Support System Prompt', tags: ['support', 'system'], favorite: true, updated: '2h ago' },
  { id: '2', title: 'Chain-of-Thought Reasoning', tags: ['reasoning', 'template'], favorite: false, updated: '1d ago' },
  { id: '3', title: 'Product Description Generator', tags: ['marketing'], favorite: true, updated: '3d ago' },
  { id: '4', title: 'Code Review Assistant', tags: ['code', 'review'], favorite: false, updated: '5d ago' },
  { id: '5', title: 'Meeting Summarizer', tags: ['productivity'], favorite: false, updated: '1w ago' },
];

export default function PromptListPage() {
  const [search, setSearch] = useState('');
  const filtered = mockPrompts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Prompts</h1>
          <p className="text-slate-500 mt-1">Manage and organize your prompt library</p>
        </div>
        <Link to="/app/prompts/new" className="btn-primary">
          <Plus className="h-4 w-4" /> New prompt
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input className="input pl-10" placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button className="btn-secondary"><Folder className="h-4 w-4" /> Folders</button>
        <button className="btn-secondary"><Tag className="h-4 w-4" /> Tags</button>
      </div>

      <div className="grid gap-3">
        {filtered.map((p) => (
          <Link key={p.id} to={`/app/prompts/${p.id}`} className="glass-card flex items-center gap-4 hover:border-brand-500/30 transition py-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium truncate">{p.title}</h3>
                {p.favorite && <Star className="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" />}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-500">{t}</span>
                ))}
              </div>
            </div>
            <span className="text-xs text-slate-400 shrink-0">{p.updated}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
