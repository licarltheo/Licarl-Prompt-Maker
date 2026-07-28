import { Link } from 'react-router-dom';
import { FileText, MessageSquare, Sparkles, TestTube, Plus, TrendingUp, Zap, Clock } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const stats = [
  { label: 'Prompts', value: '24', icon: FileText, change: '+3 this week' },
  { label: 'Chats', value: '156', icon: MessageSquare, change: '+12 today' },
  { label: 'Tokens used', value: '1.2M', icon: Zap, change: 'this month' },
  { label: 'Avg latency', value: '840ms', icon: Clock, change: '-12% vs last week' },
];

const quickActions = [
  { to: '/app/prompts/new', label: 'New prompt', icon: Plus },
  { to: '/app/tester', label: 'Test prompt', icon: TestTube },
  { to: '/app/optimizer', label: 'Optimize', icon: Sparkles },
  { to: '/app/chat', label: 'New chat', icon: MessageSquare },
];

const recent = [
  { title: 'System prompt for customer support', type: 'Prompt', time: '2h ago' },
  { title: 'Chain-of-thought reasoning template', type: 'Prompt', time: '5h ago' },
  { title: 'Claude vs GPT-4 product description', type: 'Test', time: '1d ago' },
  { title: 'Marketing agent workflow', type: 'Workflow', time: '2d ago' },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {firstName}
        </h1>
        <p className="text-slate-500 mt-1">
          Here is what is happening with your prompts.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500">
                {s.label}
              </span>
              <s.icon className="h-5 w-5 text-brand-500" />
            </div>
            <p className="text-2xl font-bold">
              {s.value}
            </p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {s.change}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="glass-card flex items-center gap-3 hover:border-brand-500/40 transition py-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600">
                <a.icon className="h-5 w-5" />
              </div>
              <span className="font-medium text-sm">
                {a.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
          <ul className="space-y-3">
            {recent.map((r, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">
                    {r.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {r.type}
                  </p>
                </div>
                <span className="text-xs text-slate-400">
                  {r.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-card">
          <h2 className="text-lg font-semibold mb-4">Usage this month</h2>
          <div className="space-y-4">
            {[
              { provider: 'OpenAI', tokens: '420K', pct: 35 },
              { provider: 'Anthropic', tokens: '380K', pct: 32 },
              { provider: 'xAI / Grok', tokens: '210K', pct: 18 },
              { provider: 'Others', tokens: '190K', pct: 15 },
            ].map((p) => (
              <div key={p.provider}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{p.provider}</span>
                  <span className="text-slate-500">
                    {p.tokens}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: p.pct + '%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
