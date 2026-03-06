import { useNavigate } from "react-router-dom";
import { notifications } from "@/data/mockData";

export default function ClosedNotifications() {
  const navigate = useNavigate();
  const filtered = notifications.filter((n) => n.subStatus === "Closed");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Closed Notifications</h2>
        <p className="text-sm text-muted-foreground mt-1">Completed notifications</p>
      </div>

      <div className="bg-card border border-border rounded-lg card-glow">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["ID", "Subject", "Status", "Assigned", "Last Updated"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => (
              <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/notifications/${n.id}`)}>
                <td className="px-5 py-3.5 text-sm font-mono text-primary">{n.id}</td>
                <td className="px-5 py-3.5 text-sm text-foreground">{n.subject}</td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-success/15 text-success">Closed</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{n.assignedTo}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{n.lastUpdated}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground text-sm">No closed notifications</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
