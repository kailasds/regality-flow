import { useState } from "react";
import { Play, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const changeSummary = {
  total: 14, added: 3, modified: 8, removed: 3, highRisk: 4,
};

const sections = [
  { id: "4.2", label: "Sec 4.2 – Modified", type: "modified" as const },
  { id: "5.1", label: "Sec 5.1 – Modified", type: "modified" as const },
  { id: "6.1", label: "Sec 6.1 – New", type: "added" as const },
  { id: "6.3", label: "Sec 6.3 – New", type: "added" as const },
  { id: "8.1", label: "Sec 8.1 – Modified", type: "modified" as const },
  { id: "9.3", label: "Sec 9.3 – Removed", type: "removed" as const },
];

export default function ComparisonTab() {
  const [compared, setCompared] = useState(false);
  const [compareWith, setCompareWith] = useState("v1");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="bg-card border border-border rounded-lg p-5 card-glow">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1.5 block">Compare Current Version With:</label>
            <Select value={compareWith} onValueChange={setCompareWith}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="v1">Version 1 (Original Upload)</SelectItem>
                <SelectItem value="v2">Version 2 (Edited)</SelectItem>
                <SelectItem value="ext">External Document Upload</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setCompared(true)} className="gradient-purple border-0 text-primary-foreground glow-purple-sm mt-5">
            <Play className="h-3.5 w-3.5 mr-1.5" /> Run Comparison
          </Button>
        </div>
      </div>

      {compared && (
        <>
          {/* Change Summary */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs bg-primary/15 text-primary px-3 py-1.5 rounded-lg font-medium">Changes: {changeSummary.total}</span>
            <span className="text-xs bg-success/15 text-success px-3 py-1.5 rounded-lg font-medium">New: {changeSummary.added}</span>
            <span className="text-xs bg-warning/15 text-warning px-3 py-1.5 rounded-lg font-medium">Modified: {changeSummary.modified}</span>
            <span className="text-xs bg-destructive/15 text-destructive px-3 py-1.5 rounded-lg font-medium">Removed: {changeSummary.removed}</span>
            <span className="text-xs bg-destructive/15 text-destructive px-3 py-1.5 rounded-lg font-medium">High-Risk: {changeSummary.highRisk}</span>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Split View */}
            <div className="col-span-3 grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-5 card-glow">
                <h5 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Previous Version</h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>Section 4.2: Quarterly reports must be submitted within 30 days of the quarter end…</p>
                  <p className="bg-destructive/10 border-l-2 border-destructive px-3 py-2 rounded">
                    Section 5.1: Data format as per Annexure B…
                  </p>
                  <p className="bg-destructive/10 border-l-2 border-destructive px-3 py-2 rounded">
                    Section 9.3: Legacy risk classification framework applies…
                  </p>
                  <p>Section 8.1: Standard capital adequacy requirements as per Basel III…</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 card-glow">
                <h5 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Current Version</h5>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>Section 4.2: Quarterly reports must be submitted within <span className="text-primary font-medium">15 days</span> of the quarter end…</p>
                  <p className="bg-primary/10 border-l-2 border-primary px-3 py-2 rounded">
                    Section 5.1: Data format as per <span className="text-primary font-medium">Revised Annexure C</span>…
                  </p>
                  <p className="bg-success/10 border-l-2 border-success px-3 py-2 rounded">
                    Section 6.3 (New): Enhanced KYC verification frequency for all customer categories…
                  </p>
                  <p>Section 8.1: <span className="text-primary font-medium">Additional 2.5% capital buffer</span> for systemically important institutions…</p>
                </div>
              </div>
            </div>

            {/* Section Navigator */}
            <div className="bg-card border border-border rounded-lg p-4 card-glow">
              <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Change Navigator</h5>
              <div className="space-y-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setExpandedSection(expandedSection === s.id ? null : s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${
                      expandedSection === s.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {expandedSection === s.id ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      s.type === "added" ? "bg-success" : s.type === "removed" ? "bg-destructive" : "bg-primary"
                    }`} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Obligation-Level Changes */}
          <div className="bg-card border border-border rounded-lg p-5 card-glow">
            <h4 className="text-sm font-semibold text-foreground mb-4">Obligation-Level Change Summary</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Risk Level</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground/60 line-through">Medium</span>
                    <span className="text-foreground">→</span>
                    <span className="text-destructive font-medium">High</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Submission Timeline</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground/60 line-through">30 days</span>
                    <span className="text-foreground">→</span>
                    <span className="text-primary font-medium">15 days</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assigned Dept</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground/60 line-through">Legal</span>
                    <span className="text-foreground">→</span>
                    <span className="text-primary font-medium">Legal + Engineering</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Data Format</span>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground/60 line-through">Annexure B</span>
                    <span className="text-foreground">→</span>
                    <span className="text-primary font-medium">Revised Annexure C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
