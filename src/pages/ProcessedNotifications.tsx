import { useNavigate } from "react-router-dom";
import { MessageSquare, Bell, History, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications, NotificationItem } from "@/contexts/NotificationContext";
import { toast } from "sonner";

const TABLE_HEADERS = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month", "Actions"];

export default function ProcessedNotifications() {
  const navigate = useNavigate();
  const { getByStatus, moveNotification } = useNotifications();
  const processed = getByStatus("Processed");

  const handleClose = (n: NotificationItem) => {
    moveNotification(n.id, "Closed");
  };

  const handleHistory = (n: NotificationItem) => {
    toast.info("Status History", { description: `Viewing history for ${n.id}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Processed Notifications</h2>
        <p className="text-sm text-muted-foreground mt-1">Notifications that completed processing and actions</p>
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
            {processed.map((n, idx) => (
              <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => navigate(`/processed/${n.id}`)}>
                <td className="px-4 py-3.5 text-sm font-mono text-primary">{idx + 1}</td>
                <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
                <td className="px-4 py-3.5 text-sm text-foreground">{n.subject}</td>
                <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
                <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => handleClose(n)}>
                      <XCircle className="h-3 w-3" /> Close
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-border" onClick={() => handleHistory(n)}>
                      <History className="h-3 w-3" /> History
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {processed.length === 0 && (
              <tr><td colSpan={8} className="px-5 py-8 text-center text-muted-foreground text-sm">No processed notifications</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
