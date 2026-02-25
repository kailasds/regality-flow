import { useState } from "react";
import { FileText, Clock, CheckCircle2, Activity, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { notifications, distributionData, trendDistributionData } from "@/data/mockData";

const kpis = [
  {
    title: "Total Notifications",
    subtitle: "This Month",
    value: "128",
    trend: "+12% vs last month",
    icon: FileText,
    trendUp: true,
  },
  {
    title: "Pending",
    value: "37",
    subtitle: "Processing: 18 · Review: 11 · Action: 8",
    icon: Clock,
  },
  {
    title: "Closed",
    value: "76",
    trend: "+8%",
    icon: CheckCircle2,
    trendUp: true,
  },
  {
    title: "Compliance Efficiency",
    value: "82%",
    icon: Activity,
    isProgress: true,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [trendRange, setTrendRange] = useState<string>("1m");
  const activeTrendDist = trendDistributionData[trendRange];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Overview of compliance activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-card border border-border rounded-lg p-5 card-glow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.title}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{kpi.value}</p>
                {kpi.trend && (
                  <p className="text-xs text-success flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3" />
                    {kpi.trend}
                  </p>
                )}
                {kpi.subtitle && !kpi.trend && (
                  <p className="text-xs text-muted-foreground mt-2">{kpi.subtitle}</p>
                )}
              </div>
              <div className="h-10 w-10 rounded-lg gradient-purple-subtle flex items-center justify-center">
                {kpi.isProgress ? (
                  <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="3"
                      strokeDasharray={`${82 * 0.88} 88`} strokeLinecap="round" />
                  </svg>
                ) : (
                  <kpi.icon className="h-5 w-5 text-primary" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Donut */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <h3 className="text-sm font-semibold text-foreground mb-4">Current Month Distribution</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                  dataKey="value" strokeWidth={0}>
                  {distributionData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="46%" textAnchor="middle" className="fill-foreground text-lg font-bold">128</text>
                <text x="50%" y="58%" textAnchor="middle" className="fill-muted-foreground text-[10px]">Notifications</text>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {distributionData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-muted-foreground">{d.name}</span>
                  <span className="text-xs font-semibold text-foreground ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend Comparison */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Trend Comparison</h3>
            <Select value={trendRange} onValueChange={setTrendRange}>
              <SelectTrigger className="w-[140px] h-8 text-xs bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="2m">Last 2 Months</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie data={activeTrendDist.data} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                  dataKey="value" strokeWidth={0}>
                  {activeTrendDist.data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="46%" textAnchor="middle" className="fill-foreground text-lg font-bold">{activeTrendDist.total}</text>
                <text x="50%" y="58%" textAnchor="middle" className="fill-muted-foreground text-[10px]">Notifications</text>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {activeTrendDist.data.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-muted-foreground">{d.name}</span>
                  <span className="text-xs font-semibold text-foreground ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-card border border-border rounded-lg card-glow">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Recent Notifications</h3>
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
            {notifications.slice(0, 5).map((n) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
