import { useState } from "react";
import { CheckCircle2, ArrowLeft, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Notification } from "@/data/mockData";

const checklist = [
  "High-risk obligations verified",
  "Department assignments confirmed",
  "Risk levels validated",
  "Required actions clearly defined",
  "No missing clauses detected",
];

const highRiskItems = [
  { clause: "Sec 4.2 – Quarterly Disclosure", dept: "Compliance", risk: "High", status: "Pending" },
  { clause: "Sec 6.3 – KYC Verification", dept: "Compliance", risk: "High", status: "Pending" },
  { clause: "Sec 8.1 – Capital Adequacy", dept: "Finance", risk: "High", status: "Pending" },
  { clause: "Sec 12.4 – Encryption Standards", dept: "Engineering", risk: "High", status: "Pending" },
  { clause: "Sec 15.2 – Cross-Border Reporting", dept: "Legal", risk: "High", status: "Pending" },
];

interface Props {
  notification: Notification;
}

export default function ReviewStage({ notification }: Props) {
  const [checked, setChecked] = useState<boolean[]>(new Array(checklist.length).fill(false));
  const allChecked = checked.every(Boolean);

  const toggleCheck = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  return (
    <div className="space-y-6">
      {/* AI Snapshot */}
      <div className="bg-card border border-border rounded-lg p-6 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Interpretation Summary</h3>
        </div>
        <p className="text-sm text-foreground/80">
          This regulation introduces stricter capital adequacy reporting and new risk classification requirements
          affecting Mortgage and Compliance teams.
        </p>
      </div>

      {/* Validation Checklist */}
      <div className="bg-card border border-border rounded-lg p-5 card-glow">
        <h4 className="text-sm font-semibold text-foreground mb-4">Validation Checklist</h4>
        <div className="space-y-3">
          {checklist.map((item, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox checked={checked[i]} onCheckedChange={() => toggleCheck(i)} />
              <span className={`text-sm transition-colors ${checked[i] ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* High Risk Obligations */}
      <div className="bg-card border border-border rounded-lg card-glow overflow-hidden">
        <div className="p-5 pb-3">
          <h4 className="text-sm font-semibold text-foreground">High Risk Obligations</h4>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Clause", "Assigned Dept", "Risk", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {highRiskItems.map((item) => (
              <tr key={item.clause} className="border-b border-border last:border-0 hover:bg-secondary/30 cursor-pointer transition-colors">
                <td className="px-5 py-3 text-sm text-foreground">{item.clause}</td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{item.dept}</td>
                <td className="px-5 py-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-destructive/15 text-destructive">{item.risk}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-warning/15 text-warning">{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="bg-card border border-border rounded-lg p-5 card-glow">
        <label className="text-xs text-muted-foreground">Reviewer Notes</label>
        <textarea
          className="w-full mt-2 bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-none"
          rows={3}
          placeholder="Add review comments…"
        />
      </div>

      {/* Decision */}
      <div className="flex gap-3">
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" /> Send Back to Processing
        </Button>
        <Button
          disabled={!allChecked}
          className="gradient-purple border-0 text-primary-foreground glow-purple-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Approve & Move to Action
        </Button>
      </div>
    </div>
  );
}
