import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    desc: 'For individuals exploring prompt engineering',
    features: ['50 prompts', '3 providers', 'Basic tester', 'Community support'],
  },
  {
    name: 'Pro',
    price: '$29',
    desc: 'For professional prompt engineers',
    features: ['Unlimited prompts', 'All providers', 'Optimizer + Tester', 'Workflows', 'Analytics', 'Priority support'],
    popular: true,
  },
  {
    name: 'Team',
    price: '$99',
    desc: 'For teams collaborating on AI',
    features: ['Everything in Pro', 'Up to 20 seats', 'Shared folders', 'Audit logs', 'SSO ready', 'Admin panel'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large organizations',
    features: ['Unlimited seats', 'Dedicated instance', 'SLA', 'Custom integrations', 'On-prem options', 'Dedicated CSM'],
  },
];

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 text-center mb-16">
        <h1 className="text-4xl font-bold">Simple, transparent pricing</h1>
        <p className="mt-4 text-lg text-slate-500">Start free. Upgrade when you need more power.</p>
      </div>
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={'glass-card flex flex-col' + (p.popular ? ' ring-2 ring-brand-500' : '')}
          >
            {p.popular && (
              <span className="text-xs font-semibold text-brand-600 mb-2">Most popular</span>
            )}
            <h3 className="text-xl font-bold">
              {p.name}
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {p.price}
              <span className="text-sm font-normal text-slate-500">
                {p.price !== 'Custom' ? '/mo' : ''}
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-500 flex-1">
              {p.desc}
            </p>
            <ul className="mt-6 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-brand-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to={p.name === 'Enterprise' ? 'mailto:sales@licarl.prompt' : '/register'}
              className={'mt-8 w-full justify-center ' + (p.popular ? 'btn-primary' : 'btn-secondary')}
            >
              {p.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
