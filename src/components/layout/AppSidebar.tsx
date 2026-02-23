import { LayoutDashboard, Bell, BarChart3, Settings, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 min-h-screen border-r border-border bg-sidebar flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          <span className="text-gradient-purple">Reg</span>Intel
        </h1>
        <p className="text-xs text-muted-foreground mt-1">AI Compliance Platform</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url || 
            (item.url !== "/" && location.pathname.startsWith(item.url));
          return (
            <NavLink
              key={item.title}
              to={item.url}
              end={item.url === "/"}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? ""
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              activeClassName="bg-primary/15 text-primary glow-purple-sm"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
