import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/app/dashboard');
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Sign in</h2>
      <p className="text-slate-500 mb-8">Welcome back to Licarl Prompt Maker</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label">Email</label>
          <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" />
        </div>
        <div>
          <label className="label">Password</label>
          <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-slate-300" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-brand-600 hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700" /></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white dark:bg-surface-950 px-3 text-slate-500">Or continue with</span></div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {['Google', 'GitHub', 'Microsoft'].map((p) => (
            <button key={p} type="button" className="btn-secondary text-xs py-2.5">{p}</button>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account? <Link to="/register" className="text-brand-600 font-medium hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
