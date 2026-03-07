import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, History, ThumbsUp, ThumbsDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNotifications, NotificationItem } from "@/contexts/NotificationContext";
import { toast } from "sonner";

const historyLog = [
  { date: "2026-03-04 10:30", action: "AI Processing completed" },
  { date: "2026-03-04 10:32", action: "Moved to Under Review" },
  { date: "2026-03-04 11:00", action: "Reminder sent to Compliance Head" },
];

const TABLE_HEADERS = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month", "Actions"];

function NotificationTable({
  items,
  onReminder,
  onFeedback,
  onHistory,
  onRowClick,
}: {
  items: NotificationItem[];
  onReminder: (n: NotificationItem) => void;
  onFeedback: (n: NotificationItem) => void;
  onHistory: (n: NotificationItem) => void;
  onRowClick: (n: NotificationItem) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-lg card-glow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {TABLE_HEADERS.map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((n, idx) => (
            <tr
              key={n.id}
              className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
            >
              <td
                className="px-4 py-3.5 text-sm font-mono text-primary cursor-pointer hover:underline"
                onClick={() => onRowClick(n)}
              >
                {idx + 1}
              </td>
              <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
              <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
              <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
              <td
                className="px-4 py-3.5 text-sm text-foreground cursor-pointer hover:text-primary"
                onClick={() => onRowClick(n)}
              >
                {n.subject}
              </td>
              <td className="px-4 py-3.5">
                {n.attachment ? (
                  <span className="text-xs text-primary hover:underline cursor-pointer">{n.attachment}</span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2.5 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
                    onClick={(e) => { e.stopPropagation(); onReminder(n); }}
                  >
                    <Bell className="h-3 w-3" /> Reminder
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2.5 text-xs gap-1 border-success/30 text-success hover:bg-success/10"
                    onClick={(e) => { e.stopPropagation(); onFeedback(n); }}
                  >
                    <MessageSquare className="h-3 w-3" /> Feedback
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
                    onClick={(e) => { e.stopPropagation(); onHistory(n); }}
                  >
                    <History className="h-3 w-3" /> History
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={8} className="px-5 py-8 text-center text-muted-foreground text-sm">
                No notifications in this category
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function PendingNotifications() {
  const navigate = useNavigate();
  const { getByStatus, moveNotification } = useNotifications();
  const [feedbackTarget, setFeedbackTarget] = useState<NotificationItem | null>(null);
  const [historyTarget, setHistoryTarget] = useState<NotificationItem | null>(null);
  const [activeTab, setActiveTab] = useState("under-review");

  const forProcessing = getByStatus("For Processing");
  const underReview = getByStatus("Under Review");
  const forAction = getByStatus("For Action");

  const handleReminder = (n: NotificationItem) => {
    toast.info("Reminder sent", {
      description: `Reminder sent to higher authority for ${n.id} — ${n.subject}`,
    });
  };

  const handlePositiveFeedback = (n: NotificationItem) => {
    if (n.subStatus === "Under Review") {
      moveNotification(n.id, "For Action");
    } else if (n.subStatus === "For Action") {
      moveNotification(n.id, "Processed");
    } else if (n.subStatus === "For Processing") {
      moveNotification(n.id, "Under Review");
    }
    setFeedbackTarget(null);
  };

  const handleNegativeFeedback = (n: NotificationItem) => {
    if (n.subStatus === "Under Review" || n.subStatus === "For Action") {
      moveNotification(n.id, "For Processing");
    }
    setFeedbackTarget(null);
  };

  const handleRowClick = (n: NotificationItem) => {
    navigate(`/notifications/${n.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Pending Notifications</h2>
        <p className="text-sm text-muted-foreground mt-1">Notifications awaiting processing or review</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary/50 border border-border">
          <TabsTrigger value="for-processing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Pending-For Processing ({forProcessing.length})
          </TabsTrigger>
          <TabsTrigger value="under-review" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Pending-Under Review ({underReview.length})
          </TabsTrigger>
          <TabsTrigger value="for-action" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Pending-For Action ({forAction.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="for-processing">
          <NotificationTable
            items={forProcessing}
            onReminder={handleReminder}
            onFeedback={setFeedbackTarget}
            onHistory={setHistoryTarget}
            onRowClick={handleRowClick}
          />
        </TabsContent>

        <TabsContent value="under-review">
          <NotificationTable
            items={underReview}
            onReminder={handleReminder}
            onFeedback={setFeedbackTarget}
            onHistory={setHistoryTarget}
            onRowClick={handleRowClick}
          />
        </TabsContent>

        <TabsContent value="for-action">
          <NotificationTable
            items={forAction}
            onReminder={handleReminder}
            onFeedback={setFeedbackTarget}
            onHistory={setHistoryTarget}
            onRowClick={handleRowClick}
          />
        </TabsContent>
      </Tabs>

      {/* Feedback Dialog */}
      <Dialog open={!!feedbackTarget} onOpenChange={() => setFeedbackTarget(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>
              {feedbackTarget?.id} — {feedbackTarget?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <p className="text-sm text-muted-foreground">
              {feedbackTarget?.subStatus === "Under Review"
                ? "Positive feedback will move this to For Action. Negative will send it back to For Processing for rerun."
                : feedbackTarget?.subStatus === "For Action"
                ? "Positive feedback will move this to Processed. Negative will send it back to For Processing for rerun."
                : "Positive feedback will move this to Under Review."}
            </p>
            <div className="flex gap-3">
              <Button
                className="flex-1 gap-2 bg-success/15 text-success hover:bg-success/25 border border-success/30"
                variant="outline"
                onClick={() => feedbackTarget && handlePositiveFeedback(feedbackTarget)}
              >
                <ThumbsUp className="h-4 w-4" /> Approve
              </Button>
              <Button
                className="flex-1 gap-2 bg-destructive/15 text-destructive hover:bg-destructive/25 border border-destructive/30"
                variant="outline"
                onClick={() => feedbackTarget && handleNegativeFeedback(feedbackTarget)}
              >
                <ThumbsDown className="h-4 w-4" /> Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={!!historyTarget} onOpenChange={() => setHistoryTarget(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Status History</DialogTitle>
            <DialogDescription>
              {historyTarget?.id} — {historyTarget?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            {historyLog.map((entry, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">{entry.action}</p>
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
