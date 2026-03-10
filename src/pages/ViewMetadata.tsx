import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";
import { toast } from "sonner";

const metadataRows = [
  { item: "Notification Received from", value: "Regulator Name : Reserve Bank of India (RBI)\nDept : Department of Regulation\nSignatory Name :\nSignatory Designation :" },
  { item: "Issue date and Reference no", value: "Issue date : 23 June 2025\nReference no : 1" },
  { item: "Subject of Notification", value: "Financial Sector (Prudential Standards)\nRevised Capital Adequacy Framework – Basel III Guidelines" },
  { item: "Internal Reference number", value: "RBI/DOR/CAP/12345/23062025" },
  { item: "Original / Amendment Notification", value: "AMD" },
  { item: "Summary of Notification", value: "This circular aims to revise the capital adequacy framework for commercial banks, incorporating updated risk weights and introducing enhanced disclosure requirements for systemically important institutions." },
  { item: "Responsible Dept.(s) for Compliance", value: "RISK COMPLIANCE" },
  { item: "Compliance Action", value: "- Follow the revised guidelines strictly - RISK\n- Update capital adequacy reporting templates - COMPLIANCE" },
  { item: "Is compliance in the form of Report?", value: "No" },
  { item: "Report Template - Yes/ No", value: "None" },
  { item: "Compliance Date (if any) from Regulator", value: "Dept :\nDate :" },
  { item: "Actual Compliance Date", value: "None" },
  { item: "Compliance Action Taken", value: "Respective depts. to follow the guidelines strictly" },
  { item: "Remarks", value: "None" },
];

export default function ViewMetadata() {
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
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-2" onClick={() => toast.success("Downloading report", { description: `Generating PDF for ${notification.id}` })}>
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
        </div>
      </div>

      {/* Metadata Table */}
      <div className="bg-card border border-border rounded-lg card-glow overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">📋</span>
            <span className="text-sm font-semibold text-foreground">Metadata (Excel Snapshot)</span>
          </div>
          <Button size="sm" variant="outline" className="h-7 px-3 text-xs gap-1 border-border">
            <Pencil className="h-3 w-3" /> Edit
          </Button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider w-1/3">Item</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
            </tr>
          </thead>
          <tbody>
            {metadataRows.map((row, i) => (
              <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                <td className="px-5 py-3.5 text-sm font-medium text-foreground align-top">{row.item}</td>
                <td className="px-5 py-3.5 text-sm text-foreground/80 whitespace-pre-line">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
