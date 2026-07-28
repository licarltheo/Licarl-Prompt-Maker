import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TestTube, GitBranch, Users, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Sparkles, title: 'Prompt Optimizer', desc: 'Grammar, role, CoT, token and readability optimization with AI recommendations.' },
  { icon: TestTube, title: 'Multi-Provider Tester', desc: 'Run one prompt across ChatGPT, Claude, Gemini, Grok, DeepSeek and more simultaneously.' },
  { icon: GitBranch, title: 'Workflow Builder', desc: 'Visual drag-and-drop pipelines with conditions, loops, API nodes and scheduling.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Organizations, roles, shared folders, comments, mentions and full audit logs.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'AES-256 key encryption, JWT, 2FA, CSRF, rate limiting and RLS.' },
  { icon: Zap, title: 'Streaming Chat', desc: 'Real-time streaming with markdown, code highlighting, file uploads and history.' },
];

const providers = ['OpenAI', 'Anthropic', 'Google', 'xAI', 'DeepSeek', 'Mistral', 'Groq', 'OpenRouter', 'Together', 'Cohere', 'Azure', 'Ollama'];

export default function LandingPage() {
  return (
    <div>
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-brand-500/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950/50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300 mb-6">
              <Sparkles className="h-4 w-4" /> Enterprise AI Prompt Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
              Create, test and ship better{' '}
              <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">AI prompts</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The complete workspace for prompt engineers and teams. Support every major provider with your own API keys.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary text-base px-8 py-3.5">
                Start free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/docs" className="btn-secondary text-base px-8 py-3.5">
                View documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-sm font-medium text-slate-500 mb-6">Works with every major AI provider</p>
          <div className="flex flex-wrap justify-center gap-3">
            {providers.map((p) => (
              <span key={p} className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-900 px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">{p}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Everything you need to master prompts</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">From individual craftsmanship to enterprise collaboration.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card hover:border-brand-500/30 transition">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 mb-4">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="glass-card bg-gradient-to-br from-brand-600 to-purple-700 text-white border-0">
            <h2 className="text-3xl font-bold mb-4">Ready to level up your prompts?</h2>
            <p className="text-brand-100 mb-8">Join teams building the next generation of AI products.</p>
            <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 px-8 py-3.5 font-semibold hover:bg-brand-50 transition">
              Get started free <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
