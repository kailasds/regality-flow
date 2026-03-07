import { useState } from "react";
import { FileText, Clock, CheckCircle2, Plus, Upload, TrendingUp, TrendingDown, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNotifications } from "@/contexts/NotificationContext";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const monthData: Record<string, { total: number; closed: number; processing: number; processed: number; review: number; action: number }> = {
  January: { total: 94, closed: 70, processing: 24, processed: 12, review: 7, action: 5 },
  February: { total: 110, closed: 83, processing: 27, processed: 14, review: 8, action: 5 },
  March: { total: 128, closed: 76, processing: 52, processed: 18, review: 11, action: 8 },
  April: { total: 88, closed: 65, processing: 23, processed: 11, review: 7, action: 5 },
  May: { total: 72, closed: 58, processing: 14, processed: 8, review: 4, action: 2 },
  June: { total: 68, closed: 55, processing: 13, processed: 7, review: 4, action: 2 },
  July: { total: 74, closed: 60, processing: 14, processed: 8, review: 4, action: 2 },
  August: { total: 80, closed: 65, processing: 15, processed: 9, review: 4, action: 2 },
  September: { total: 76, closed: 61, processing: 15, processed: 8, review: 5, action: 2 },
  October: { total: 78, closed: 62, processing: 16, processed: 9, review: 5, action: 2 },
  November: { total: 85, closed: 68, processing: 17, processed: 10, review: 5, action: 2 },
  December: { total: 92, closed: 74, processing: 18, processed: 10, review: 5, action: 3 },
};

const currentMonth = "March";

function MetricRow({ icon, iconBg, label, value, onClick, active }: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: number;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 ${
        onClick ? "cursor-pointer" : ""
      } ${active ? "bg-primary/10 border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.1)]" : "bg-secondary/40 hover:bg-secondary/70 border border-transparent"}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-xl ${iconBg} flex items-center justify-center`}>{icon}</div>
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-foreground tabular-nums">{value}</span>
        {onClick && <ChevronRight className={`h-4 w-4 transition-transform ${active ? "text-primary rotate-90" : "text-muted-foreground"}`} />}
      </div>
    </div>
  );
}

function SubMetric({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2">
        <div className={`h-1.5 w-1.5 rounded-full ${color}`} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-semibold text-foreground tabular-nums">{value}</span>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { notifications, addNotification } = useNotifications();
  const [prevMonth, setPrevMonth] = useState("February");
  const [tableFilter, setTableFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const currentData = monthData[currentMonth];
  const prevData = monthData[prevMonth];

  const filteredNotifications = tableFilter
    ? notifications.filter((n) => n.month?.startsWith(tableFilter))
    : [];

  const closureRate = (data: typeof currentData) => Math.round((data.closed / data.total) * 100);

  const handleNewNotification = () => {
    setModalOpen(false);
    addNotification({
      subject: "Revised Capital Adequacy Framework",
      regulator: "RBI",
      department: "Compliance",
      attachment: "Capital_Framework.pdf",
    });
    navigate("/pending");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">Overview of compliance activity</p>
        </div>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl">
              <Plus className="h-4 w-4" /> New Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Upload New Regulatory Notification</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-foreground font-medium">Drag & drop your file here</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
              </div>
              <Button onClick={handleNewNotification} className="w-full rounded-xl">
                Start AI Processing
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Monthly Report Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Current Month */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden card-glow">
          <div className="px-6 pt-5 pb-4 border-b border-border/50 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">{currentMonth} Report</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Current month overview</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              <span className="text-xs font-medium text-success">{closureRate(currentData)}% closed</span>
            </div>
          </div>
          <div className="p-5 space-y-3">
            <MetricRow
              icon={<FileText className="h-4.5 w-4.5 text-primary" />}
              iconBg="bg-primary/15"
              label="Total Notifications"
              value={currentData.total}
              onClick={() => setTableFilter(tableFilter === currentMonth ? null : currentMonth)}
              active={tableFilter === currentMonth}
            />
            <MetricRow
              icon={<CheckCircle2 className="h-4.5 w-4.5 text-success" />}
              iconBg="bg-success/15"
              label="Closed"
              value={currentData.closed}
            />
            <div className="rounded-xl bg-secondary/40 border border-transparent p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Clock className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Processing</span>
                </div>
                <span className="text-2xl font-bold text-foreground tabular-nums">{currentData.processing}</span>
              </div>
              <div className="ml-[52px] space-y-1 border-l-2 border-border/50 pl-4">
                <SubMetric label="Processed" value={currentData.processed} color="bg-primary" />
                <SubMetric label="Review" value={currentData.review} color="bg-accent" />
                <SubMetric label="Action" value={currentData.action} color="bg-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Previous Month */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden card-glow">
          <div className="px-6 pt-5 pb-4 border-b border-border/50 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-foreground">Previous Month</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Historical comparison</p>
            </div>
            <Select value={prevMonth} onValueChange={(v) => { setPrevMonth(v); if (tableFilter && tableFilter !== currentMonth) setTableFilter(null); }}>
              <SelectTrigger className="w-[140px] h-8 text-xs bg-secondary/80 border-border/50 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {months.filter((m) => m !== currentMonth).map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="p-5 space-y-3">
            <MetricRow
              icon={<FileText className="h-4.5 w-4.5 text-primary" />}
              iconBg="bg-primary/15"
              label="Total Notifications"
              value={prevData.total}
              onClick={() => setTableFilter(tableFilter === prevMonth ? null : prevMonth)}
              active={tableFilter === prevMonth}
            />
            <MetricRow
              icon={<CheckCircle2 className="h-4.5 w-4.5 text-success" />}
              iconBg="bg-success/15"
              label="Closed"
              value={prevData.closed}
            />
            <div className="rounded-xl bg-secondary/40 border border-transparent p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Clock className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Processing</span>
                </div>
                <span className="text-2xl font-bold text-foreground tabular-nums">{prevData.processing}</span>
              </div>
              <div className="ml-[52px] space-y-1 border-l-2 border-border/50 pl-4">
                <SubMetric label="Processed" value={prevData.processed} color="bg-primary" />
                <SubMetric label="Review" value={prevData.review} color="bg-accent" />
                <SubMetric label="Action" value={prevData.action} color="bg-warning" />
              </div>
            </div>
          </div>
          <div className="px-6 pb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 w-fit">
              {prevData.total > currentData.total ? (
                <TrendingUp className="h-3.5 w-3.5 text-success" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-warning" />
              )}
              <span className="text-xs font-medium text-muted-foreground">
                {Math.abs(currentData.total - prevData.total)} {prevData.total > currentData.total ? "more" : "fewer"} than {currentMonth}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Table - only shown when a card is clicked */}
      {tableFilter && (
        <div className="bg-card border border-border rounded-2xl card-glow animate-in fade-in-0 slide-in-from-top-2 duration-300">
          <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {tableFilter} Notifications
            </h3>
            <button onClick={() => setTableFilter(null)} className="text-xs text-primary hover:underline">Clear filter</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["ID", "Subject", "Status", "Assigned", "Last Updated"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((n) => (
                <tr key={n.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => navigate(`/notifications/${n.id}`)}>
                  <td className="px-6 py-3.5 text-sm font-mono text-primary">{n.id}</td>
                  <td className="px-6 py-3.5 text-sm text-foreground">{n.subject}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${n.subStatus === "Closed" ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`}>{n.subStatus}</span>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-muted-foreground">{n.assignedTo}</td>
                  <td className="px-6 py-3.5 text-sm text-muted-foreground">{n.lastUpdated}</td>
                </tr>
              ))}
              {filteredNotifications.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-muted-foreground text-sm">No notifications found for {tableFilter}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
