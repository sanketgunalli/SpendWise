import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/not-found";

function Router() {
  // TODO: Replace with real authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  if (!isAuthenticated) {
    if (showLogin) {
      return (
        <Login
          onLogin={() => setIsAuthenticated(true)}
          onSwitchToSignup={() => setShowLogin(false)}
        />
      );
    } else {
      return (
        <Signup
          onSignup={() => setIsAuthenticated(true)}
          onSwitchToLogin={() => setShowLogin(true)}
        />
      );
    }
  }

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
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
