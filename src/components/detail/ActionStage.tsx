import { useState } from "react";
import { Upload, CheckCircle2, Send, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Notification } from "@/data/mockData";

const assignedObligations = [
  { clause: "Capital Adequacy Reporting", risk: "High", action: "Update quarterly report template", status: "Pending" },
  { clause: "Risk Classification Update", risk: "Medium", action: "Modify internal risk policy", status: "In Progress" },
  { clause: "Data Format Migration", risk: "Medium", action: "Implement Annexure C format", status: "Pending" },
];

interface Props {
  notification: Notification;
}

export default function ActionStage({ notification }: Props) {
  const [allAddressed, setAllAddressed] = useState(false);

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Left - Execution Panel */}
      <div className="col-span-3 space-y-6">
        {/* Assignment Card */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-muted-foreground">Assigned Department</span>
              <p className="text-sm text-foreground mt-1 font-medium">{notification.assignedTo}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">SLA Remaining</span>
              <p className="text-sm text-warning mt-1 font-medium flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 2 Days
              </p>
            </div>
          </div>
        </div>

        {/* Obligations Table */}
        <div className="bg-card border border-border rounded-lg card-glow overflow-hidden">
          <div className="p-5 pb-3">
            <h4 className="text-sm font-semibold text-foreground">Assigned Obligations</h4>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Clause", "Risk", "Required Action", "Evidence", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignedObligations.map((ob) => (
                <tr key={ob.clause} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3 text-sm text-foreground">{ob.clause}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      ob.risk === "High" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                    }`}>{ob.risk}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{ob.action}</td>
                  <td className="px-5 py-3">
                    <button className="text-xs text-primary hover:underline flex items-center gap-1">
                      <Upload className="h-3 w-3" /> Upload
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      ob.status === "In Progress" ? "bg-primary/15 text-primary" : "bg-warning/15 text-warning"
                    }`}>{ob.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Evidence Upload */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <label className="text-xs text-muted-foreground">Upload Supporting Documents</label>
          <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Upload supporting documents, policy updates, or proof of compliance</p>
            <p className="text-xs text-muted-foreground mt-1">Drop files or click to upload</p>
          </div>
        </div>

        {/* Completion */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox checked={allAddressed} onCheckedChange={(c) => setAllAddressed(!!c)} />
            <span className="text-sm text-muted-foreground">All assigned obligations have been addressed</span>
          </label>
          <Button
            disabled={!allAddressed}
            className="gradient-purple border-0 text-primary-foreground glow-purple-sm disabled:opacity-40"
          >
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Mark as Completed
          </Button>
        </div>
      </div>

      {/* Right - SLA Panel */}
      <div className="space-y-4">
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <h4 className="text-sm font-semibold text-foreground mb-4">SLA & Escalation</h4>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-warning">2</div>
            <p className="text-xs text-muted-foreground mt-1">Days Remaining</p>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-warning text-warning hover:bg-warning/10 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1.5" /> Escalate
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 text-xs">
              <Send className="h-3 w-3 mr-1.5" /> Send Reminder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
