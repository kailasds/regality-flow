import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNotifications, NotificationItem } from "@/contexts/NotificationContext";
import { toast } from "sonner";
import AnalysisTab from "@/components/detail/AnalysisTab";

const TABLE_HEADERS_PROCESSING = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month", "Actions"];
const TABLE_HEADERS_REVIEW = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month"];
const TABLE_HEADERS_ACTION = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month"];

export default function PendingNotifications() {
  const navigate = useNavigate();
  const { getByStatus } = useNotifications();
  const [activeTab, setActiveTab] = useState("under-review");
  const [analysisTarget, setAnalysisTarget] = useState<NotificationItem | null>(null);

  const forProcessing = getByStatus("For Processing");
  const underReview = getByStatus("Under Review");
  const forAction = getByStatus("For Action");

  const handleRegenerate = (n: NotificationItem) => {
    toast.info("Regenerating AI analysis", {
      description: `Re-processing ${n.id} — ${n.subject}`,
    });
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
              <tbody>
                {forProcessing.map((n, idx) => (
                  <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3.5 text-sm font-mono text-primary cursor-pointer hover:underline" onClick={() => handleRowClick(n)}>{idx + 1}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                    <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground cursor-pointer hover:text-primary" onClick={() => handleRowClick(n)}>{n.subject}</td>
                    <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
                    <td className="px-4 py-3.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2.5 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
                        onClick={(e) => { e.stopPropagation(); handleRegenerate(n); }}
                      >
                        <RefreshCw className="h-3 w-3" /> Regenerate
                      </Button>
                    </td>
                  </tr>
                ))}
                {forProcessing.length === 0 && (
                  <tr><td colSpan={8} className="px-5 py-8 text-center text-muted-foreground text-sm">No notifications in this category</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Under Review - click navigates to detail */}
        <TabsContent value="under-review">
          <div className="bg-card border border-border rounded-lg card-glow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {TABLE_HEADERS_REVIEW.map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {underReview.map((n, idx) => (
                  <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => handleRowClick(n)}>
                    <td className="px-4 py-3.5 text-sm font-mono text-primary">{idx + 1}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                    <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground">{n.subject}</td>
                    <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
                  </tr>
                ))}
                {underReview.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-muted-foreground text-sm">No notifications in this category</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* For Action - click shows analysis dialog */}
        <TabsContent value="for-action">
          <div className="bg-card border border-border rounded-lg card-glow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {TABLE_HEADERS_ACTION.map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {forAction.map((n, idx) => (
                  <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => setAnalysisTarget(n)}>
                    <td className="px-4 py-3.5 text-sm font-mono text-primary">{idx + 1}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                    <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground">{n.subject}</td>
                    <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
                  </tr>
                ))}
                {forAction.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-muted-foreground text-sm">No notifications in this category</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Analysis Dialog for For Action */}
      <Dialog open={!!analysisTarget} onOpenChange={() => setAnalysisTarget(null)}>
        <DialogContent className="bg-card border-border max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Analysis — {analysisTarget?.subject}</DialogTitle>
            <DialogDescription>{analysisTarget?.id} · {analysisTarget?.regulator}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <AnalysisTab />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
