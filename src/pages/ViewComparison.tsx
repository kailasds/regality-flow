import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";

const comparisonRows = [
  { type: "Case/Style Change", similarity: "1.000", newSection: "Root", newPage: "1", newContent: "REVISED CAPITAL ADEQUACY FRAMEWORK", oldSection: "Root", oldPage: "1", oldContent: "Capital Adequacy Framework" },
  { type: "Case/Style Change", similarity: "1.000", newSection: "REVISED CAPITAL ADEQUACY > About this circular", newPage: "4", newContent: "This circular provides guidance on revised capital adequacy norms for commercial banks. It incorporates updated risk weights for various asset classes and introduces enhanced disclosure requirements for systemically important institutions.", oldSection: "Capital Adequacy > About this circular", oldPage: "3", oldContent: "This circular provides guidance on capital adequacy norms for commercial banks. It incorporates risk weights for various asset classes and disclosure requirements." },
  { type: "Modified", similarity: "0.850", newSection: "Sec 4.2 – Quarterly Disclosure", newPage: "8", newContent: "Quarterly reports must be submitted within 15 calendar days of the quarter end, replacing the previous 30-day requirement.", oldSection: "Sec 4.2 – Quarterly Disclosure", oldPage: "7", oldContent: "Quarterly reports must be submitted within 30 calendar days of the quarter end." },
  { type: "New", similarity: "—", newSection: "Sec 6.3 – Enhanced KYC", newPage: "12", newContent: "KYC re-verification shall be conducted annually for high-risk customers and biennially for all other customer categories.", oldSection: "—", oldPage: "—", oldContent: "—" },
  { type: "Modified", similarity: "0.920", newSection: "Sec 8.1 – Capital Adequacy", newPage: "16", newContent: "Institutions classified as systemically important shall maintain an additional capital buffer of 2.5% above the minimum requirement.", oldSection: "Sec 8.1 – Capital Adequacy", oldPage: "14", oldContent: "Standard capital adequacy requirements as per Basel III apply to all scheduled commercial banks." },
  { type: "Removed", similarity: "—", newSection: "—", newPage: "—", newContent: "—", oldSection: "Sec 9.3 – Legacy Risk Classification", oldPage: "18", oldContent: "Legacy risk classification framework applies to all pre-existing lending portfolios until migration is complete." },
];

export default function ViewComparison() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notification = notifications.find((n) => n.id === id) || notifications[0];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{notification.id} — {notification.subject}</h2>
            <p className="text-xs text-muted-foreground">{notification.regulator}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
          ← Back
        </Button>
      </div>

      {/* Excel Viewer Header */}
      <div className="bg-card border border-border rounded-lg card-glow overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Excel Viewer</p>
              <p className="text-sm font-semibold text-foreground">{notification.subject}.xlsx</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Similarity</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">New Section<br/>(Hierarchy)</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">New<br/>Page</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">New Content</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Old Section<br/>(Hierarchy)</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Old<br/>Page</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Old Content</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-secondary/10" : ""}`}>
                  <td className="px-4 py-3 text-foreground whitespace-nowrap align-top">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      row.type === "New" ? "bg-success/15 text-success" :
                      row.type === "Removed" ? "bg-destructive/15 text-destructive" :
                      "bg-primary/15 text-primary"
                    }`}>{row.type}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono align-top">{row.similarity}</td>
                  <td className="px-4 py-3 text-foreground align-top max-w-[150px]">{row.newSection}</td>
                  <td className="px-4 py-3 text-muted-foreground align-top">{row.newPage}</td>
                  <td className="px-4 py-3 text-foreground/80 align-top max-w-[300px]">{row.newContent}</td>
                  <td className="px-4 py-3 text-foreground align-top max-w-[150px]">{row.oldSection}</td>
                  <td className="px-4 py-3 text-muted-foreground align-top">{row.oldPage}</td>
                  <td className="px-4 py-3 text-foreground/80 align-top max-w-[300px]">{row.oldContent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
