import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNotifications, NotificationItem } from "@/contexts/NotificationContext";
import { useState } from "react";

const TABLE_HEADERS = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month", "Actions"];

export default function ClosedNotifications() {
  const navigate = useNavigate();
  const { getByStatus } = useNotifications();
  const [historyTarget, setHistoryTarget] = useState<NotificationItem | null>(null);

  const closed = getByStatus("Closed");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Closed Notifications</h2>
        <p className="text-sm text-muted-foreground mt-1">Completed notifications</p>
      </div>

      <div className="bg-card border border-border rounded-lg card-glow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {TABLE_HEADERS.map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {closed.map((n, idx) => (
              <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3.5 text-sm font-mono text-primary cursor-pointer hover:underline" onClick={() => navigate(`/notifications/${n.id}`)}>{idx + 1}</td>
                <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
                <td className="px-4 py-3.5 text-sm text-foreground cursor-pointer hover:text-primary" onClick={() => navigate(`/notifications/${n.id}`)}>{n.subject}</td>
                <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
                <td className="px-4 py-3.5">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground" onClick={() => setHistoryTarget(n)}>
                    <History className="h-3 w-3" /> History
                  </Button>
                </td>
              </tr>
            ))}
            {closed.length === 0 && (
              <tr><td colSpan={8} className="px-5 py-8 text-center text-muted-foreground text-sm">No closed notifications</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!historyTarget} onOpenChange={() => setHistoryTarget(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Status History</DialogTitle>
            <DialogDescription>{historyTarget?.id} — {historyTarget?.subject}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            {[{ date: "2026-02-28", action: "Closed" }, { date: "2026-02-25", action: "Approved in Processed" }, { date: "2026-02-20", action: "AI Processing completed" }].map((e, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div><p className="text-sm text-foreground">{e.action}</p><p className="text-xs text-muted-foreground">{e.date}</p></div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
