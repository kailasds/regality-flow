import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Eye, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";

export default function Notifications() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("all");

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Notifications</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage regulatory notifications and workflows</p>
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
          <SelectContent>
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
          <SelectContent>
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
          <SelectContent>
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
    </div>
  );
}
