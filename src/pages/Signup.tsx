import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const departments = ["Compliance", "Risk", "Legal", "Technology", "Operations"];

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email, password, department);
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
          <h2 className="text-xl font-semibold text-foreground text-center">Create Account</h2>
          <p className="text-sm text-muted-foreground text-center mt-1 mb-6">Join RegIntel</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
                className="rounded-xl bg-secondary border-border" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl bg-secondary border-border" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl bg-secondary border-border" required />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="rounded-xl bg-secondary border-border">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full rounded-xl h-11 text-sm font-semibold">
              Create Account
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
