import { Brain, TrendingUp, Shield } from "lucide-react";

const riskCards = [
  { label: "Operational Risk", level: "Medium", color: "warning" },
  { label: "Financial Risk", level: "Low", color: "success" },
  { label: "Regulatory Risk", level: "High", color: "destructive" },
  { label: "Reputational Risk", level: "Medium", color: "warning" },
];

const impacts = [
  "Requires API architecture updates for new reporting endpoints",
  "New documentation standards must be adopted within 30 days",
  "Cross-team coordination required between Engineering and Legal",
  "Compliance training needs to be updated for all affected teams",
];

const nextSteps = [
  "Assign high-risk obligations to Legal for immediate review",
  "Schedule engineering review for API architecture changes",
  "Update compliance reporting SOP to reflect new timelines",
];

export default function AnalysisTab() {
  return (
    <div className="space-y-6">
      {/* AI Insight Summary */}
      <div className="bg-card border border-border rounded-lg p-6 card-glow">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Impact Analysis</h3>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          This regulation increases compliance reporting frequency and introduces stricter encryption requirements,
          impacting engineering and legal workflows. The quarterly disclosure timeline has been halved from 30 to 15 days,
          requiring significant process optimization across multiple departments.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Confidence:</span>
          <span className="text-sm font-semibold text-primary">92%</span>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Risk Breakdown</h4>
        <div className="grid grid-cols-4 gap-4">
          {riskCards.map((r) => (
            <div key={r.label} className="bg-card border border-border rounded-lg p-4 card-glow">
              <p className="text-xs text-muted-foreground">{r.label}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full bg-${r.color}`} />
                <span className={`text-sm font-medium text-${r.color}`}>{r.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Business Impact */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-warning" />
            <h4 className="text-sm font-semibold text-foreground">Business Impact</h4>
          </div>
          <div className="space-y-3">
            {impacts.map((impact, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                <p className="text-sm text-foreground/80">{impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div className="bg-card border border-border rounded-lg p-5 card-glow">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Recommended Next Steps</h4>
          </div>
          <div className="space-y-3">
            {nextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground/80">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
