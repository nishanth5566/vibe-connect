import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import MainApp from "./pages/MainApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Initialize theme on app load
const initializeTheme = () => {
  const storedTheme = localStorage.getItem("radius_theme") || "dark";
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(storedTheme);
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const hasProfile = localStorage.getItem("radius_profile");
  if (!hasProfile) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Auth route - redirects to app if already logged in
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const hasProfile = localStorage.getItem("radius_profile");
  if (hasProfile) {
    return <Navigate to="/app" replace />;
  }
  return <>{children}</>;
};

const App = () => {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <MainApp />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;