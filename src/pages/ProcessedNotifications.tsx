import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNotifications, NotificationItem } from "@/contexts/NotificationContext";
import MetadataTab from "@/components/detail/MetadataTab";

const TABLE_HEADERS = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month"];

export default function ProcessedNotifications() {
  const { getByStatus } = useNotifications();
  const [metadataTarget, setMetadataTarget] = useState<NotificationItem | null>(null);

  const processed = getByStatus("Processed");

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
              <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => setMetadataTarget(n)}>
                <td className="px-4 py-3.5 text-sm font-mono text-primary">{idx + 1}</td>
                <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
                <td className="px-4 py-3.5 text-sm text-foreground">{n.subject}</td>
                <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
              </tr>
            ))}
            {processed.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-muted-foreground text-sm">No processed notifications</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Metadata Dialog */}
      <Dialog open={!!metadataTarget} onOpenChange={() => setMetadataTarget(null)}>
        <DialogContent className="bg-card border-border max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Metadata — {metadataTarget?.subject}</DialogTitle>
            <DialogDescription>{metadataTarget?.id} · {metadataTarget?.regulator}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <MetadataTab />
            <div className="flex justify-end">
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-2">
                <Download className="h-3.5 w-3.5" /> Download Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
