import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Eye, FileText, Search, GitCompare, Pencil, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const obligations = [
  { id: 1, section: "1 – Governance", text: "Board must approve risk appetite statement annually.", interpretation: "The Board is responsible for approving the risk appetite statement on a yearly basis.", compliance: "Approve risk appetite statement", department: "Board / Risk Management", dueDate: "Annually" },
  { id: 2, section: "1 – Governance", text: "Policies must be reviewed at least every 12 months.", interpretation: "All relevant governance policies need to undergo a formal review cycle at minimum once per year.", compliance: "Review and update governance policies", department: "Compliance", dueDate: "Every 12 months" },
  { id: 3, section: "2 – Risk Assessment", text: "Quarterly risk assessments must be conducted for all high-risk portfolios.", interpretation: "High-risk lending portfolios require formal risk evaluation every quarter.", compliance: "Conduct quarterly risk assessments", department: "Risk Management", dueDate: "Quarterly" },
  { id: 4, section: "3 – Reporting", text: "Quarterly disclosure reports must be submitted within 15 days of quarter end.", interpretation: "The submission deadline for quarterly disclosures has been tightened from 30 to 15 calendar days.", compliance: "Submit quarterly disclosure reports within 15 days", department: "Compliance / Finance", dueDate: "15 days post quarter" },
];

const comparisonRows = [
  { type: "Case/Style Change", similarity: "1.000", newSection: "Root", newPage: "1", newContent: "REVISED CAPITAL ADEQUACY FRAMEWORK", oldSection: "Root", oldPage: "1", oldContent: "Capital Adequacy Framework" },
  { type: "Case/Style Change", similarity: "1.000", newSection: "REVISED CAPITAL ADEQUACY > About this circular", newPage: "4", newContent: "This circular provides guidance on revised capital adequacy norms for commercial banks.", oldSection: "Capital Adequacy > About this circular", oldPage: "3", oldContent: "This circular provides guidance on capital adequacy norms for commercial banks." },
  { type: "Modified", similarity: "0.850", newSection: "Sec 4.2 – Quarterly Disclosure", newPage: "8", newContent: "Quarterly reports must be submitted within 15 calendar days of the quarter end.", oldSection: "Sec 4.2 – Quarterly Disclosure", oldPage: "7", oldContent: "Quarterly reports must be submitted within 30 calendar days of the quarter end." },
  { type: "New", similarity: "—", newSection: "Sec 6.3 – Enhanced KYC", newPage: "12", newContent: "KYC re-verification shall be conducted annually for high-risk customers.", oldSection: "—", oldPage: "—", oldContent: "—" },
  { type: "Modified", similarity: "0.920", newSection: "Sec 8.1 – Capital Adequacy", newPage: "16", newContent: "Institutions classified as systemically important shall maintain an additional capital buffer of 2.5%.", oldSection: "Sec 8.1 – Capital Adequacy", oldPage: "14", oldContent: "Standard capital adequacy requirements as per Basel III apply to all scheduled commercial banks." },
  { type: "Removed", similarity: "—", newSection: "—", newPage: "—", newContent: "—", oldSection: "Sec 9.3 – Legacy Risk Classification", oldPage: "18", oldContent: "Legacy risk classification framework applies to all pre-existing lending portfolios." },
];

export default function ProcessedNotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notification = notifications.find((n) => n.id === id) || notifications[0];

  const handleDownload = (section: string) => {
    toast.success(`Downloading ${section}`, { description: `Generating PDF for ${notification.id}` });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{notification.id} — {notification.subject}</h2>
          <p className="text-xs text-muted-foreground">{notification.regulator}</p>
        </div>
      </div>

      <Tabs defaultValue="metadata">
        <TabsList className="bg-secondary border border-border rounded-lg w-full justify-start px-1">
          <TabsTrigger value="metadata" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Metadata</TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Analysis</TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Comparison</TabsTrigger>
        </TabsList>

        {/* Metadata Tab */}
        <TabsContent value="metadata" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Metadata (Excel Snapshot)</h3>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-2" onClick={() => handleDownload("Metadata")}>
              <Download className="h-3.5 w-3.5" /> Download
            </Button>
          </div>
          <div className="bg-card border border-border rounded-lg card-glow overflow-hidden">
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
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Analysis</h3>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-2" onClick={() => handleDownload("Analysis")}>
              <Download className="h-3.5 w-3.5" /> Download
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-6" style={{ height: "calc(100vh - 300px)" }}>
            {/* Left - Document Preview */}
            <div className="col-span-2 bg-card border border-border rounded-lg flex flex-col card-glow">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Document Preview</span>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
                  <h3 className="text-base font-semibold text-foreground">Risk management framework</h3>
                  <div className="bg-primary/10 border-l-2 border-primary px-3 py-2 rounded text-xs">
                    Consistent with Prudential Standard CPS 220 Risk Management, where residential mortgage
                    lending forms a material proportion of an ADI's lending portfolio.
                  </div>
                  <h4 className="text-sm font-semibold text-primary">APRA's expectations of an ADI Board</h4>
                  <p>3. Where residential mortgage lending forms a material proportion of an ADI's lending portfolio,
                    APRA expects that the Board would take reasonable steps to satisfy itself as to the level of risk.</p>
                </div>
              </div>
            </div>

            {/* Right - Obligation Cards */}
            <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {obligations.map((ob) => (
                  <div key={ob.id} className="bg-card border border-border rounded-lg overflow-hidden card-glow">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/30 border-b border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-primary">§</span>
                        <span className="text-sm font-medium text-foreground">{ob.section}</span>
                      </div>
                      <span className="text-xs bg-destructive/15 text-destructive px-2.5 py-1 rounded-full font-medium">ACTION POINT</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Text</span>
                        </div>
                        <p className="text-sm text-foreground">{ob.text}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Interpretation</span>
                        <p className="text-sm text-foreground/80 italic">{ob.interpretation}</p>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div><span className="text-muted-foreground">Dept:</span> <span className="text-foreground font-medium">{ob.department}</span></div>
                        <div><span className="text-muted-foreground">Due:</span> <span className="text-foreground font-medium">{ob.dueDate}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Comparison</h3>
            <Button variant="outline" className="border-border text-foreground hover:bg-secondary gap-2" onClick={() => handleDownload("Comparison")}>
              <Download className="h-3.5 w-3.5" /> Download
            </Button>
          </div>
          <div className="bg-card border border-border rounded-lg card-glow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Similarity</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">New Section</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">New Page</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">New Content</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Old Section</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground whitespace-nowrap">Old Page</th>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
