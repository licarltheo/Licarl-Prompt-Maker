import { Link } from 'react-router-dom';

export default function DocsPage() {
  return (
    <div className="py-16 mx-auto max-w-4xl px-4">
      <h1 className="text-4xl font-bold mb-4">Documentation</h1>
      <p className="text-lg text-slate-500 mb-10">Everything you need to get started with Licarl Prompt Maker.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { title: 'Quick Start', desc: 'Install, configure, and run in minutes' },
          { title: 'API Reference', desc: 'REST and WebSocket endpoints' },
          { title: 'Providers', desc: 'Connect OpenAI, Anthropic, Grok and more' },
          { title: 'Workflows', desc: 'Build visual prompt pipelines' },
          { title: 'Teams', desc: 'Organizations, roles and permissions' },
          { title: 'Security', desc: 'Encryption, 2FA, audit logs' },
        ].map((d) => (
          <div key={d.title} className="glass-card hover:border-brand-500/30 transition">
            <h3 className={'font-semibold'}>{d.title}</h3>
            <p className={'text-sm text-slate-500 mt-1'}>{d.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm text-slate-500">
        Full docs are also available in the repository under <code className="text-brand-600">docs/</code>. See <Link to="/" className="text-brand-600 hover:underline">README</Link> for local setup.
      </p>
    </div>
  );
}
