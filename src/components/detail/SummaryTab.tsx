import { AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const departments = [
  { name: "Engineering", obligations: 42, exposure: "High" },
  { name: "Legal", obligations: 28, exposure: "Medium" },
  { name: "Customer Success", obligations: 18, exposure: "Medium" },
  { name: "Finance", obligations: 12, exposure: "Low" },
];

const maxObligation = 42;

export default function SummaryTab() {
  return (
    <div className="space-y-6">
      {/* Impact Headline */}
      <div className="bg-card border border-border rounded-lg p-6 card-glow">
        <h2 className="text-xl font-bold text-foreground">High Regulatory Impact Identified</h2>
        <p className="text-sm text-muted-foreground mt-2">
          This notification introduces 12 high-risk obligations across 4 departments.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <span className="px-3 py-1 rounded-full bg-destructive/15 text-destructive text-xs font-semibold uppercase tracking-wide">
            High Risk
          </span>
          <span className="text-sm text-muted-foreground">
            Confidence: <span className="text-primary font-semibold">92%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Department Exposure */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <h4 className="text-sm font-semibold text-foreground mb-4">Department Exposure Map</h4>
          <div className="space-y-4">
            {departments.map((dept, i) => (
              <div key={dept.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-sm ${i === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {dept.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{dept.obligations} obligations</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      dept.exposure === "High" ? "bg-destructive/15 text-destructive" :
                      dept.exposure === "Medium" ? "bg-warning/15 text-warning" :
                      "bg-success/15 text-success"
                    }`}>{dept.exposure}</span>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-purple transition-all"
                    style={{ width: `${(dept.obligations / maxObligation) * 100}%`, opacity: i === 0 ? 1 : 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Priority */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h4 className="text-sm font-semibold text-foreground">Immediate Attention Required</h4>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              12 high-risk clauses need review
            </div>
            <div className="flex items-center gap-3 text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              4 workflow changes required
            </div>
            <div className="flex items-center gap-3 text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Estimated remediation: 5–7 business days
            </div>
          </div>
          <Button className="w-full mt-6 gradient-purple border-0 text-primary-foreground glow-purple-sm">
            Proceed to Review <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
