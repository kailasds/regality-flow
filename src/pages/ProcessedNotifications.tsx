import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, History, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNotifications, NotificationItem } from "@/contexts/NotificationContext";
import { toast } from "sonner";
import { useState } from "react";

const TABLE_HEADERS = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month", "Actions"];

export default function ProcessedNotifications() {
  const navigate = useNavigate();
  const { getByStatus, moveNotification } = useNotifications();
  const [feedbackTarget, setFeedbackTarget] = useState<NotificationItem | null>(null);
  const [historyTarget, setHistoryTarget] = useState<NotificationItem | null>(null);

  const processed = getByStatus("Processed");

  const handleReminder = (n: NotificationItem) => {
    toast.info("Reminder sent", { description: `Reminder sent for ${n.id}` });
  };

  const handlePositive = (n: NotificationItem) => {
    moveNotification(n.id, "Closed");
    setFeedbackTarget(null);
  };

  const handleNegative = (n: NotificationItem) => {
    moveNotification(n.id, "For Processing");
    setFeedbackTarget(null);
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
              <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3.5 text-sm font-mono text-primary cursor-pointer hover:underline" onClick={() => navigate(`/notifications/${n.id}`)}>{idx + 1}</td>
                <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
                <td className="px-4 py-3.5 text-sm text-foreground cursor-pointer hover:text-primary" onClick={() => navigate(`/notifications/${n.id}`)}>{n.subject}</td>
                <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10" onClick={() => handleReminder(n)}>
                      <Bell className="h-3 w-3" /> Reminder
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs gap-1 border-success/30 text-success hover:bg-success/10" onClick={() => setFeedbackTarget(n)}>
                      <MessageSquare className="h-3 w-3" /> Feedback
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground" onClick={() => setHistoryTarget(n)}>
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

      <Dialog open={!!feedbackTarget} onOpenChange={() => setFeedbackTarget(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>{feedbackTarget?.id} — {feedbackTarget?.subject}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <p className="text-sm text-muted-foreground">Positive feedback will move this to Closed. Negative will send it back to For Processing.</p>
            <div className="flex gap-3">
              <Button className="flex-1 gap-2 bg-success/15 text-success hover:bg-success/25 border border-success/30" variant="outline" onClick={() => feedbackTarget && handlePositive(feedbackTarget)}>
                <ThumbsUp className="h-4 w-4" /> Approve
              </Button>
              <Button className="flex-1 gap-2 bg-destructive/15 text-destructive hover:bg-destructive/25 border border-destructive/30" variant="outline" onClick={() => feedbackTarget && handleNegative(feedbackTarget)}>
                <ThumbsDown className="h-4 w-4" /> Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!historyTarget} onOpenChange={() => setHistoryTarget(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Status History</DialogTitle>
            <DialogDescription>{historyTarget?.id} — {historyTarget?.subject}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            {[{ date: "2026-03-04", action: "Moved to Processed" }, { date: "2026-03-03", action: "Action completed" }].map((e, i) => (
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
