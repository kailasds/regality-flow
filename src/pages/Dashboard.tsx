import { useState } from "react";
import { FileText, Clock, CheckCircle2, Activity, Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { notifications } from "@/data/mockData";

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

export default function Dashboard() {
  const navigate = useNavigate();
  const [prevMonth, setPrevMonth] = useState("February");
  const [tableFilter, setTableFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const currentData = monthData[currentMonth];
  const prevData = monthData[prevMonth];

  const filteredNotifications = tableFilter
    ? notifications.filter((n) => n.month === tableFilter)
    : notifications.slice(0, 5);

  const handleNewNotification = () => {
    setModalOpen(false);
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
            <Button className="gap-2 rounded-[10px]">
              <Plus className="h-4 w-4" />
              New Notification
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
              <Button onClick={handleNewNotification} className="w-full rounded-[10px]">
                Start AI Processing
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Monthly Report Panels */}
      <div className="grid grid-cols-2 gap-4">
        {/* Current Month */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <h3 className="text-sm font-semibold text-foreground mb-4">{currentMonth} Report</h3>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
              onClick={() => setTableFilter(tableFilter === currentMonth ? null : currentMonth)}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg gradient-purple-subtle flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Total Notifications</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{currentData.total}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-success/15 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Closed</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{currentData.closed}</span>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Processing</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{currentData.processing}</span>
              </div>
              <div className="ml-12 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Processed</span>
                  <span className="text-sm font-semibold text-foreground">{currentData.processed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Review</span>
                  <span className="text-sm font-semibold text-foreground">{currentData.review}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Action</span>
                  <span className="text-sm font-semibold text-foreground">{currentData.action}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Month */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Previous Month</h3>
            <Select value={prevMonth} onValueChange={setPrevMonth}>
              <SelectTrigger className="w-[140px] h-8 text-xs bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {months.filter((m) => m !== currentMonth).map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <div
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
              onClick={() => setTableFilter(tableFilter === prevMonth ? null : prevMonth)}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg gradient-purple-subtle flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Total Notifications</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{prevData.total}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-success/15 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Closed</span>
              </div>
              <span className="text-2xl font-bold text-foreground">{prevData.closed}</span>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Processing</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{prevData.processing}</span>
              </div>
              <div className="ml-12 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Processed</span>
                  <span className="text-sm font-semibold text-foreground">{prevData.processed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Review</span>
                  <span className="text-sm font-semibold text-foreground">{prevData.review}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Action</span>
                  <span className="text-sm font-semibold text-foreground">{prevData.action}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-card border border-border rounded-lg card-glow">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {tableFilter ? `${tableFilter} Notifications` : "Recent Notifications"}
          </h3>
          {tableFilter && (
            <button onClick={() => setTableFilter(null)} className="text-xs text-primary hover:underline">
              Clear filter
            </button>
          )}
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["ID", "Subject", "Status", "Assigned", "Last Updated"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((n) => (
              <tr
                key={n.id}
                className="border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/notifications/${n.id}`)}
              >
                <td className="px-5 py-3.5 text-sm font-mono text-primary">{n.id}</td>
                <td className="px-5 py-3.5 text-sm text-foreground">{n.subject}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      n.stage === "Closed" ? "bg-success/15 text-success" : "bg-primary/15 text-primary"
                    }`}>
                      {n.stage}
                    </span>
                    {n.subStatus !== n.stage && (
                      <span className="text-xs text-muted-foreground">{n.subStatus}</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{n.assignedTo}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{n.lastUpdated}</td>
              </tr>
            ))}
            {filteredNotifications.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground text-sm">No notifications found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
