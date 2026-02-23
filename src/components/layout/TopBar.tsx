import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notifications..."
          className="pl-9 bg-secondary border-border text-sm h-9"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">Admin User</p>
          <p className="text-xs text-muted-foreground">Compliance Dept · Manager</p>
        </div>
        <div className="h-9 w-9 rounded-full gradient-purple flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
}
