import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-700 via-brand-800 to-surface-950 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-brand-400 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-purple-500 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur text-2xl font-bold">L</div>
            <span className="text-2xl font-semibold">Licarl Prompt Maker</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">Build better prompts. Ship better AI.</h1>
          <p className="text-lg text-brand-100">
            Enterprise workspace for creating, testing, optimizing, and collaborating on AI prompts across every major provider.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 bg-white dark:bg-surface-950">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">L</div>
            <span className="font-semibold text-lg">Licarl</span>
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
