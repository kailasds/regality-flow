import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, MessageSquare, Bell, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNotifications, NotificationItem } from "@/contexts/NotificationContext";
import { toast } from "sonner";

const TABLE_HEADERS_PROCESSING = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month", "Actions"];
const TABLE_HEADERS_WITH_ACTIONS = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month", "Actions"];

export default function PendingNotifications() {
  const navigate = useNavigate();
  const { getByStatus } = useNotifications();
  const [activeTab, setActiveTab] = useState("under-review");

  const forProcessing = getByStatus("For Processing");
  const underReview = getByStatus("Under Review");
  const forAction = getByStatus("For Action");

  const handleRegenerate = (n: NotificationItem) => {
    toast.info("Regenerating AI analysis", { description: `Re-processing ${n.id} — ${n.subject}` });
  };

  const handleFeedback = (n: NotificationItem) => {
    toast.info("Feedback submitted", { description: `Feedback recorded for ${n.id}` });
  };

  const handleReminder = (n: NotificationItem) => {
    toast.success("Reminder sent", { description: `Reminder sent for ${n.id}` });
  };

  const handleHistory = (n: NotificationItem) => {
    toast.info("Status History", { description: `Viewing history for ${n.id}` });
  };

  const handleRowClick = (n: NotificationItem) => {
    navigate(`/notifications/${n.id}`);
  };

  const renderActionButtons = (n: NotificationItem) => (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-border" onClick={(e) => { e.stopPropagation(); handleFeedback(n); }}>
        <MessageSquare className="h-3 w-3" /> Feedback
      </Button>
      <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-border" onClick={(e) => { e.stopPropagation(); handleReminder(n); }}>
        <Bell className="h-3 w-3" /> Remind
      </Button>
      <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 border-border" onClick={(e) => { e.stopPropagation(); handleHistory(n); }}>
        <History className="h-3 w-3" /> History
      </Button>
    </div>
  );

  const renderTableRows = (items: NotificationItem[], onRowClick: (n: NotificationItem) => void, actions: (n: NotificationItem) => React.ReactNode, colSpan: number) => (
    <tbody>
      {items.map((n, idx) => (
        <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => onRowClick(n)}>
          <td className="px-4 py-3.5 text-sm font-mono text-primary">{idx + 1}</td>
          <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
          <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
          <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
          <td className="px-4 py-3.5 text-sm text-foreground">{n.subject}</td>
          <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
          <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
          <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>{actions(n)}</td>
        </tr>
      ))}
      {items.length === 0 && (
        <tr><td colSpan={colSpan} className="px-5 py-8 text-center text-muted-foreground text-sm">No notifications in this category</td></tr>
      )}
    </tbody>
  );

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

        {/* For Processing - only Regenerate button */}
        <TabsContent value="for-processing">
          <div className="bg-card border border-border rounded-lg card-glow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {TABLE_HEADERS_PROCESSING.map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              {renderTableRows(forProcessing, handleRowClick, (n) => (
                <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10" onClick={(e) => { e.stopPropagation(); handleRegenerate(n); }}>
                  <RefreshCw className="h-3 w-3" /> Regenerate
                </Button>
              ), 8)}
            </table>
          </div>
        </TabsContent>

        {/* Under Review - row navigates to detail, has feedback/remind/history */}
        <TabsContent value="under-review">
          <div className="bg-card border border-border rounded-lg card-glow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {TABLE_HEADERS_WITH_ACTIONS.map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              {renderTableRows(underReview, handleRowClick, renderActionButtons, 8)}
            </table>
          </div>
        </TabsContent>

        {/* For Action - row navigates to analysis page, has feedback/remind/history */}
        <TabsContent value="for-action">
          <div className="bg-card border border-border rounded-lg card-glow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {TABLE_HEADERS_WITH_ACTIONS.map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              {renderTableRows(forAction, (n) => navigate(`/notifications/${n.id}/analysis`), renderActionButtons, 8)}
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
