import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Eye, Calendar, FileText, Clock, CheckCircle2, Activity, TrendingUp, Plus, Upload, X, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { notifications } from "@/data/mockData";

const kpis = [
  { title: "Total Notifications", value: "128", trend: "+12%", icon: FileText },
  { title: "Pending", value: "37", subtitle: "Processing: 18 · Review: 11 · Action: 8", icon: Clock },
  { title: "Closed", value: "76", trend: "+8%", icon: CheckCircle2 },
  { title: "Efficiency", value: "82%", icon: Activity, isProgress: true },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newForm, setNewForm] = useState({ regulator: "", department: "", versionType: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const filtered = notifications.filter((n) => {
    const matchSearch = n.subject.toLowerCase().includes(search.toLowerCase()) ||
      n.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" ||
      (statusFilter === "processing" && n.subStatus === "Processing") ||
      (statusFilter === "review" && n.subStatus === "Under Review") ||
      (statusFilter === "action" && n.subStatus === "For Action") ||
      (statusFilter === "closed" && n.stage === "Closed");
    const matchDept = deptFilter === "all" || n.department === deptFilter;
    return matchSearch && matchStatus && matchDept;
  });

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowNewModal(false);
      navigate("/notifications/N-1056?new=true");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage regulatory notifications and workflows</p>
        </div>
        <Button onClick={() => setShowNewModal(true)} className="gradient-purple border-0 text-primary-foreground glow-purple-sm">
          <Plus className="h-4 w-4 mr-1.5" /> New Notification
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-card border border-border rounded-lg p-4 card-glow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                {kpi.trend && (
                  <p className="text-[10px] text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-2.5 w-2.5" /> {kpi.trend}
                  </p>
                )}
                {kpi.subtitle && !kpi.trend && (
                  <p className="text-[10px] text-muted-foreground mt-1">{kpi.subtitle}</p>
                )}
              </div>
              <div className="h-8 w-8 rounded-lg gradient-purple-subtle flex items-center justify-center">
                {kpi.isProgress ? (
                  <svg className="h-6 w-6 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                      strokeDasharray={`${82 * 0.88} 88`} strokeLinecap="round" />
                  </svg>
                ) : (
                  <kpi.icon className="h-4 w-4 text-primary" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ID or subject..." className="pl-9 bg-card border-border h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 bg-card border-border h-9">
            <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="processing">Pending – Processing</SelectItem>
            <SelectItem value="review">Pending – Review</SelectItem>
            <SelectItem value="action">Pending – Action</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={deptFilter} onValueChange={setDeptFilter}>
          <SelectTrigger className="w-48 bg-card border-border h-9">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="Compliance">Compliance</SelectItem>
            <SelectItem value="Risk">Risk</SelectItem>
            <SelectItem value="Mortgage">Mortgage</SelectItem>
            <SelectItem value="Legal">Legal</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Digital Banking">Digital Banking</SelectItem>
          </SelectContent>
        </Select>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48 bg-card border-border h-9">
            <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg card-glow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["ID", "Regulator", "Subject", "Stage", "Sub Status", "Assigned To", "Updated", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => (
              <tr key={n.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="px-5 py-3.5 text-sm font-mono text-primary">{n.id}</td>
                <td className="px-5 py-3.5 text-sm text-foreground">{n.regulator}</td>
                <td className="px-5 py-3.5 text-sm text-foreground max-w-[200px] truncate">{n.subject}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    n.stage === "Closed" ? "bg-success/15 text-success" : "bg-primary/15 text-primary"
                  }`}>
                    {n.stage}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{n.subStatus}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{n.assignedTo}</td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{n.lastUpdated}</td>
                <td className="px-5 py-3.5">
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => navigate(`/notifications/${n.id}`)}>
                    <Eye className="h-3.5 w-3.5 mr-1" /> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Notification Modal */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">Upload Regulatory Notification</DialogTitle>
            <DialogDescription className="text-muted-foreground">Upload a new document for AI processing</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Regulator</label>
              <Select value={newForm.regulator} onValueChange={(v) => setNewForm(p => ({ ...p, regulator: v }))}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select regulator" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="RBI">RBI</SelectItem>
                  <SelectItem value="SEBI">SEBI</SelectItem>
                  <SelectItem value="IRDAI">IRDAI</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Department</label>
              <Select value={newForm.department} onValueChange={(v) => setNewForm(p => ({ ...p, department: v }))}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Risk">Risk</SelectItem>
                  <SelectItem value="Mortgage">Mortgage</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Upload Document</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground mt-2">Drop file or click to upload</p>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Version Type</label>
              <Select value={newForm.versionType} onValueChange={(v) => setNewForm(p => ({ ...p, versionType: v }))}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select version type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="new">New Regulation</SelectItem>
                  <SelectItem value="amendment">Amendment</SelectItem>
                  <SelectItem value="revised">Revised Version</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
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
              <Button onClick={handleStartProcessing} className="w-full gradient-purple border-0 text-primary-foreground glow-purple-sm mt-2">
                Start AI Processing
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
