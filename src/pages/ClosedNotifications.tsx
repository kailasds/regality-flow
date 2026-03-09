import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationContext";
import { toast } from "sonner";

const TABLE_HEADERS = ["No.", "Regulator", "Date Received", "Our Reference", "Subject", "Attachment", "Month", "Actions"];

export default function ClosedNotifications() {
  const { getByStatus } = useNotifications();
  const closed = getByStatus("Closed");

  const handleDownload = (id: string) => {
    toast.success("Downloading report", { description: `Generating PDF report for ${id}` });
  };

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
                <td className="px-4 py-3.5 text-sm font-mono text-primary">{idx + 1}</td>
                <td className="px-4 py-3.5 text-sm text-foreground">{n.regulator}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                <td className="px-4 py-3.5 text-sm font-mono text-muted-foreground">{n.reference}</td>
                <td className="px-4 py-3.5 text-sm text-foreground">{n.subject}</td>
                <td className="px-4 py-3.5">{n.attachment ? <span className="text-xs text-primary">{n.attachment}</span> : <span className="text-xs text-muted-foreground">—</span>}</td>
                <td className="px-4 py-3.5 text-sm text-muted-foreground">{n.month}</td>
                <td className="px-4 py-3.5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2.5 text-xs gap-1 border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => handleDownload(n.id)}
                  >
                    <Download className="h-3 w-3" /> Download Report
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
    </div>
  );
}
