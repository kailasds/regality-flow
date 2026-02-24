import { useState } from "react";
import { Search, Flag, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type RiskLevel = "High" | "Medium" | "Low";

interface Obligation {
  id: string;
  section: string;
  title: string;
  summary: string;
  risk: RiskLevel;
  department: string;
  status: "Pending" | "Reviewed";
  confidence: number;
  fullText: string;
}

const obligations: Obligation[] = [
  { id: "OB-001", section: "Sec 4.2", title: "Quarterly Disclosure Timeline", summary: "Submission deadline reduced from 30 to 15 days for quarterly reports.", risk: "High", department: "Compliance", status: "Pending", confidence: 94, fullText: "All regulated entities shall submit quarterly disclosure reports within 15 calendar days of the quarter end, replacing the previous 30-day requirement." },
  { id: "OB-002", section: "Sec 5.1", title: "Data Format Revision", summary: "Data format changed from Annexure B to Revised Annexure C.", risk: "Medium", department: "Engineering", status: "Reviewed", confidence: 91, fullText: "All data submissions must conform to Revised Annexure C format specification, effective immediately upon publication date." },
  { id: "OB-003", section: "Sec 6.3", title: "Enhanced KYC Verification", summary: "New frequency requirements for KYC re-verification of existing customers.", risk: "High", department: "Compliance", status: "Pending", confidence: 88, fullText: "KYC re-verification shall be conducted annually for high-risk customers and biennially for all other customer categories." },
  { id: "OB-004", section: "Sec 8.1", title: "Capital Adequacy Reporting", summary: "Additional capital buffer requirements for systemic risk.", risk: "High", department: "Finance", status: "Pending", confidence: 86, fullText: "Institutions classified as systemically important shall maintain an additional capital buffer of 2.5% above the minimum requirement." },
  { id: "OB-005", section: "Sec 12.1", title: "Risk Classification Update", summary: "Updated risk classification taxonomy for lending portfolio.", risk: "Medium", department: "Legal", status: "Reviewed", confidence: 92, fullText: "Risk classification of lending portfolio assets shall follow the updated taxonomy as specified in Schedule IV of this circular." },
];

const filters = ["All", "High Risk", "Pending Review", "Reviewed"] as const;

export default function MetadataTab() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = obligations.filter((o) => {
    if (activeFilter === "High Risk" && o.risk !== "High") return false;
    if (activeFilter === "Pending Review" && o.status !== "Pending") return false;
    if (activeFilter === "Reviewed" && o.status !== "Reviewed") return false;
    if (search && !o.title.toLowerCase().includes(search.toLowerCase()) && !o.section.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-2 gap-6 h-[600px]">
      {/* Left - Document Preview */}
      <div className="bg-card border border-border rounded-lg p-5 card-glow flex flex-col">
        <h4 className="text-sm font-semibold text-foreground mb-3">Document Preview</h4>
        <div className="flex-1 bg-secondary/50 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="text-center text-muted-foreground">
            <div className="h-20 w-16 mx-auto mb-3 bg-secondary rounded-lg flex items-center justify-center border border-border">
              <span className="text-xs font-mono">PDF</span>
            </div>
            <p className="text-sm">RBI_Circular_2026_KYC.pdf</p>
            <p className="text-xs mt-1 text-primary">AI-highlighted source mapping</p>
          </div>
          {expandedId && (
            <div className="absolute bottom-3 left-3 right-3 bg-primary/10 border border-primary/30 rounded-lg p-3">
              <p className="text-xs text-primary font-medium">Highlighting: {obligations.find(o => o.id === expandedId)?.section}</p>
              <p className="text-xs text-muted-foreground mt-1">{obligations.find(o => o.id === expandedId)?.fullText}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right - Obligation Explorer */}
      <div className="flex flex-col gap-4 overflow-hidden">
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeFilter === f
                  ? "gradient-purple text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            className="w-full bg-secondary border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
            placeholder="Search obligations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Obligation Cards */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.map((ob) => (
            <div
              key={ob.id}
              className={`bg-card border rounded-lg p-4 cursor-pointer transition-all ${
                expandedId === ob.id ? "border-primary/50 glow-purple-sm" : "border-border hover:border-primary/30"
              }`}
              onClick={() => setExpandedId(expandedId === ob.id ? null : ob.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    ob.risk === "High" ? "bg-destructive/15 text-destructive" :
                    ob.risk === "Medium" ? "bg-warning/15 text-warning" :
                    "bg-success/15 text-success"
                  }`}>{ob.risk}</span>
                  <span className="text-xs font-mono text-primary">{ob.section}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  ob.status === "Reviewed" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                }`}>{ob.status}</span>
              </div>
              <h5 className="text-sm font-medium text-foreground mt-2">{ob.title}</h5>
              <p className="text-xs text-muted-foreground mt-1">{ob.summary}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{ob.department}</span>
                <span className="text-xs text-primary">AI: {ob.confidence}%</span>
              </div>

              {/* Expanded */}
              {expandedId === ob.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Full Extracted Text</label>
                    <p className="text-sm text-foreground/80 mt-1 bg-secondary/50 rounded-lg p-3">{ob.fullText}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Department</label>
                      <select className="w-full mt-1 bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-foreground">
                        <option>{ob.department}</option>
                        <option>Engineering</option>
                        <option>Legal</option>
                        <option>Finance</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Confidence</label>
                      <p className="mt-1 text-sm text-primary font-medium">{ob.confidence}%</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="gradient-purple border-0 text-primary-foreground text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Mark as Reviewed
                    </Button>
                    <Button size="sm" variant="outline" className="border-warning text-warning hover:bg-warning/10 text-xs">
                      <Flag className="h-3 w-3 mr-1" /> Flag for Escalation
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
