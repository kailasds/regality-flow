import { useState } from "react";
import { FileText, Clock, CheckCircle2, Plus, Upload, ChevronDown, ArrowRight, Search, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

function BreakdownChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-secondary/60 border border-border/50">
      <div className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-sm font-bold text-foreground tabular-nums ml-auto">{value}</span>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { notifications, addNotification } = useNotifications();
  const [prevMonth, setPrevMonth] = useState("February");
  const [tableFilter, setTableFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tableSearch, setTableSearch] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const currentData = monthData[currentMonth];
  const prevData = monthData[prevMonth];

  const filteredNotifications = tableFilter
    ? notifications
        .filter((n) => n.month?.startsWith(tableFilter))
        .filter((n) => tableSearch === "" || n.subject.toLowerCase().includes(tableSearch.toLowerCase()) || n.id.toLowerCase().includes(tableSearch.toLowerCase()))
    : [];

  const closureRate = (data: typeof currentData) => Math.round((data.closed / data.total) * 100);

  const handleNewNotification = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setModalOpen(false);
      addNotification({
        subject: "Revised Capital Adequacy Framework",
        regulator: "RBI",
        department: "Compliance",
        attachment: "Capital_Framework.pdf",
      });
      navigate("/pending");
    }, 3000);
  };

  const toggleFilter = (month: string) => {
    setTableFilter((prev) => (prev === month ? null : month));
    setTableSearch("");
  };

  const renderCard = (
    title: string,
    subtitle: string,
    data: typeof currentData,
    month: string,
    isCurrentMonth: boolean
  ) => {
    const isActive = tableFilter === month;
    const rate = closureRate(data);

    return (
      <div className={`relative bg-card border rounded-2xl overflow-hidden transition-all duration-300 glass-card ${
        isActive
          ? "border-primary/50 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]"
          : "border-border hover:border-border/80 hover:shadow-[0_8px_30px_-10px_hsl(0_0%_0%/0.3)]"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative px-6 pt-5 pb-4 border-b border-border/50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            {!isCurrentMonth && (
              <Select value={prevMonth} onValueChange={(v) => { setPrevMonth(v); if (tableFilter && tableFilter !== currentMonth) setTableFilter(null); }}>
                <SelectTrigger className="w-[130px] h-8 text-xs bg-secondary/80 border-border/50 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {months.filter((m) => m !== currentMonth).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              rate >= 60 ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
            }`}>
              {rate}% closed
            </div>
          </div>
        </div>

        {/* KPI Section */}
        <div className="relative px-6 pt-6 pb-4">
          <button
            onClick={() => toggleFilter(month)}
            className={`w-full text-left group rounded-xl p-5 transition-all duration-200 border ${
              isActive
                ? "bg-primary/10 border-primary/30 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)]"
                : "bg-secondary/40 border-transparent hover:bg-secondary/70 hover:border-border/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-5xl font-bold text-foreground tabular-nums tracking-tight">{data.total}</p>
                <p className="text-sm text-muted-foreground mt-1.5 font-medium">Total Notifications</p>
              </div>
              <div className={`flex items-center gap-1.5 transition-all duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              }`}>
                <span className="text-xs font-medium">{isActive ? "Showing list" : "View list"}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} />
              </div>
            </div>
          </button>
        </div>

        {/* Status Summary */}
        <div className="relative px-6 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-success/[0.08] border border-success/15">
              <div className="h-10 w-10 rounded-xl bg-success/15 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground tabular-nums">{data.closed}</p>
                <p className="text-xs text-muted-foreground font-medium">Closed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/[0.08] border border-primary/15">
              <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground tabular-nums">{data.processing}</p>
                <p className="text-xs text-muted-foreground font-medium">Processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Breakdown */}
        <div className="relative px-6 pb-5">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2.5">Processing Breakdown</p>
          <div className="grid grid-cols-3 gap-2">
            <BreakdownChip label="Processed" value={data.processed} color="bg-primary" />
            <BreakdownChip label="Review" value={data.review} color="bg-accent" />
            <BreakdownChip label="Action" value={data.action} color="bg-warning" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-muted animate-spin border-t-primary" />
                    <Brain className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-semibold text-foreground animate-pulse">AI Processing in progress…</p>
                    <p className="text-xs text-muted-foreground">Extracting metadata, analyzing obligations & generating summary</p>
                  </div>
                  <div className="w-full max-w-xs">
                    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-primary animate-[processing_3s_ease-in-out_forwards]" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-foreground font-medium">Drag & drop your file here</p>
                    <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
                  </div>
                  <Button onClick={handleNewNotification} className="w-full rounded-xl">
                    Start AI Processing
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Monthly Report Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {renderCard("March Report", "Current month overview", currentData, currentMonth, true)}
        {renderCard("Previous Month", "Historical comparison", prevData, prevMonth, false)}
      </div>

      {/* Notification Table */}
      <div className={`overflow-hidden transition-all duration-300 ease-out ${
        tableFilter ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        {tableFilter && (
          <div className="bg-card border border-border rounded-2xl">
            <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between gap-4">
              <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">
                {tableFilter} Notifications
              </h3>
              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search by ID or subject..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    className="pl-9 h-8 text-xs bg-secondary border-border/50"
                  />
                </div>
                <button onClick={() => setTableFilter(null)} className="text-xs text-primary hover:underline whitespace-nowrap">
                  Clear filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    {["ID", "Regulator", "Subject", "Status", "Department", "Date", "Analyst"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredNotifications.map((n) => (
                    <tr key={n.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors" onClick={() => navigate(`/notifications/${n.id}`)}>
                      <td className="px-6 py-3.5 text-sm font-mono text-primary">{n.id}</td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground">{n.regulator}</td>
                      <td className="px-6 py-3.5 text-sm text-foreground">{n.subject}</td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          n.subStatus === "Closed" ? "bg-success/15 text-success"
                          : n.subStatus === "For Action" ? "bg-warning/15 text-warning"
                          : "bg-primary/15 text-primary"
                        }`}>{n.subStatus}</span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground">{n.department}</td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground">{n.dateReceived}</td>
                      <td className="px-6 py-3.5 text-sm text-muted-foreground">{n.assignedTo}</td>
                    </tr>
                  ))}
                  {filteredNotifications.length === 0 && (
                    <tr><td colSpan={7} className="px-6 py-10 text-center text-muted-foreground text-sm">No notifications found for {tableFilter}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
