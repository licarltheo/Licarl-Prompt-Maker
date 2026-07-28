import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../lib/api';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [params] = useSearchParams();
  const token = params.get('token') || '';

  useEffect(() => {
    if (!token) { setStatus('error'); return; }
    api.post('/auth/verify-email', { token })
      .then(() => setStatus('ok'))
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <div className="text-center">
      {status === 'loading' && <p className="text-slate-500">Verifying email…</p>}
      {status === 'ok' && (
        <>
          <h2 className="text-2xl font-bold mb-2">Email verified</h2>
          <p className="text-slate-500 mb-6">Your email has been confirmed.</p>
          <Link to="/app/dashboard" className="btn-primary">Go to dashboard</Link>
        </>
      )}
      {status === 'error' && (
        <>
          <h2 className="text-2xl font-bold mb-2">Verification failed</h2>
          <p className="text-slate-500 mb-6">Invalid or expired link.</p>
          <Link to="/login" className="btn-primary">Sign in</Link>
        </>
      )}
    </div>
  );
}
