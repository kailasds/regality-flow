import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            <span className="text-primary">Reg</span>Intel
          </h1>
          <p className="text-sm text-muted-foreground mt-1">AI Compliance Platform</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 card-glow">
          <h2 className="text-xl font-semibold text-foreground text-center">Welcome Back</h2>
          <p className="text-sm text-muted-foreground text-center mt-1 mb-6">Sign in to RegIntel</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl bg-secondary border-border focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl bg-secondary border-border focus:ring-primary/50 focus:border-primary"
                required
              />
            </div>
            <Button type="submit" className="w-full rounded-xl h-11 text-sm font-semibold">
              Sign In
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
