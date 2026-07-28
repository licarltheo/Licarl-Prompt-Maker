import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { useThemeStore } from './stores/themeStore';
import { useEffect } from 'react';

import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import LandingLayout from './components/layout/LandingLayout';

import LandingPage from './pages/landing/LandingPage';
import PricingPage from './pages/landing/PricingPage';
import DocsPage from './pages/landing/DocsPage';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';

import DashboardPage from './pages/dashboard/DashboardPage';
import PromptBuilderPage from './pages/prompts/PromptBuilderPage';
import PromptListPage from './pages/prompts/PromptListPage';
import PromptOptimizerPage from './pages/prompts/PromptOptimizerPage';
import PromptTesterPage from './pages/prompts/PromptTesterPage';
import ChatPage from './pages/chat/ChatPage';
import AgentsPage from './pages/agents/AgentsPage';
import WorkflowsPage from './pages/workflows/WorkflowsPage';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import KnowledgePage from './pages/knowledge/KnowledgePage';
import FilesPage from './pages/files/FilesPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import SettingsPage from './pages/settings/SettingsPage';
import TeamPage from './pages/team/TeamPage';
import AdminPage from './pages/admin/AdminPage';
import ProvidersPage from './pages/settings/ProvidersPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs/*" element={<DocsPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Route>

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="prompts" element={<PromptListPage />} />
        <Route path="prompts/new" element={<PromptBuilderPage />} />
        <Route path="prompts/:id" element={<PromptBuilderPage />} />
        <Route path="optimizer" element={<PromptOptimizerPage />} />
        <Route path="tester" element={<PromptTesterPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="chat/:id" element={<ChatPage />} />
        <Route path="agents" element={<AgentsPage />} />
        <Route path="workflows" element={<WorkflowsPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="files" element={<FilesPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="settings/providers" element={<ProvidersPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
