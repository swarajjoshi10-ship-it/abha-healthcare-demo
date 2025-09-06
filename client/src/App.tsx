import { Switch, Route, useLocation, Router as WouterRouter } from "wouter";
import { useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SessionManager, SessionData } from "@/lib/session";
import Home from "@/pages/home";
import Login from "@/pages/login";
import OTPVerification from "@/pages/otp-verification";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  const [, setLocation] = useLocation();
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    const currentSession = SessionManager.getSession();
    setSession(currentSession);
    
    // Listen for storage changes to update session state
    const handleStorageChange = () => {
      const updatedSession = SessionManager.getSession();
      setSession(updatedSession);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check for session changes periodically
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    SessionManager.clearSession();
    setSession(null);
    setLocation("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header session={session} onLogout={handleLogout} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/otp" component={OTPVerification} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
