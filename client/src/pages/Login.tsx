import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";

interface LoginProps {
  onLogin?: () => void;
  onSwitchToSignup?: () => void;
}

export default function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    onLogin?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2">
            <Wallet className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold">Expense Tracker</h1>
          </div>
          <p className="text-muted-foreground">Track your expenses, manage your budget</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-login">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="text-primary hover:underline font-medium"
                data-testid="link-signup"
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
