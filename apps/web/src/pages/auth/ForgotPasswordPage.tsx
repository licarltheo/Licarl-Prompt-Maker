import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
      toast.success('Reset link sent if account exists');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Check your email</h2>
        <p className="text-slate-500 mb-6">We sent a password reset link to {email}</p>
        <Link to="/login" className="btn-primary">Back to sign in</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Forgot password</h2>
      <p className="text-slate-500 mb-8">Enter your email and we'll send a reset link</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label">Email</label>
          <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="text-brand-600 hover:underline">Back to sign in</Link>
      </p>
    </div>
  );
}
