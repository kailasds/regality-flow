import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PendingNotifications from "./pages/PendingNotifications";
import ProcessedNotifications from "./pages/ProcessedNotifications";
import ClosedNotifications from "./pages/ClosedNotifications";
import NotificationDetail from "./pages/NotificationDetail";
import ViewAnalysis from "./pages/ViewAnalysis";
import ViewMetadata from "./pages/ViewMetadata";
import ViewComparison from "./pages/ViewComparison";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
    <Route element={<ProtectedRoute><NotificationProvider><AppLayout /></NotificationProvider></ProtectedRoute>}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/pending" element={<PendingNotifications />} />
      <Route path="/processed" element={<ProcessedNotifications />} />
      <Route path="/closed" element={<ClosedNotifications />} />
      <Route path="/notifications/:id" element={<NotificationDetail />} />
      <Route path="/notifications/:id/analysis" element={<ViewAnalysis />} />
      <Route path="/notifications/:id/metadata" element={<ViewMetadata />} />
      <Route path="/notifications/:id/comparison" element={<ViewComparison />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
