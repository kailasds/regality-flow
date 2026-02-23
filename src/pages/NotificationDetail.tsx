import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Lock, Play, Eye, Send, Download, Upload, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications, timelineEvents } from "@/data/mockData";

const stages = ["Processing", "Review", "Action", "Closed"] as const;

function getStageIndex(subStatus: string) {
  if (subStatus === "Processing") return 0;
  if (subStatus === "Under Review") return 1;
  if (subStatus === "For Action") return 2;
  return 3;
}

export default function NotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notification = notifications.find((n) => n.id === id) || notifications[0];
  const currentStage = getStageIndex(notification.subStatus);
  const [metadataView, setMetadataView] = useState(false);
  const [analysisView, setAnalysisView] = useState(false);
  const [comparisonView, setComparisonView] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{notification.id} — {notification.subject}</h2>
          <p className="text-sm text-muted-foreground">{notification.regulator} · {notification.department}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-card border border-border rounded-lg p-5 card-glow">
        <div className="flex items-center justify-between">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < currentStage ? "bg-success text-success-foreground" :
                  i === currentStage ? "gradient-purple text-primary-foreground glow-purple" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {i < currentStage ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium ${
                  i <= currentStage ? "text-foreground" : "text-muted-foreground"
                }`}>{stage}</span>
              </div>
              {i < stages.length - 1 && (
                <div className={`flex-1 h-px mx-4 ${i < currentStage ? "bg-success" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-4">
          {/* Processing Stage */}
          {currentStage === 0 && !metadataView && !analysisView && !comparisonView && (
            <div className="space-y-4">
              {[
                { title: "Metadata Extraction", status: "Completed", time: "10:42 AM", confidence: "94%", action: () => setMetadataView(true), actionLabel: "View Metadata", icon: Eye },
                { title: "Analysis", status: "Pending", action: () => setAnalysisView(true), actionLabel: "Run Analysis", icon: Play },
                { title: "Comparison", status: "Locked", locked: true, icon: Lock },
              ].map((card) => (
                <div key={card.title} className={`bg-card border border-border rounded-lg p-5 card-glow ${card.locked ? "opacity-50" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{card.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs ${card.status === "Completed" ? "text-success" : card.status === "Pending" ? "text-warning" : "text-muted-foreground"}`}>
                          {card.status}
                        </span>
                        {card.time && <span className="text-xs text-muted-foreground">{card.time}</span>}
                        {card.confidence && <span className="text-xs text-primary">Confidence: {card.confidence}</span>}
                      </div>
                    </div>
                    {!card.locked && (
                      <Button size="sm" variant={card.status === "Completed" ? "outline" : "default"} onClick={card.action}
                        className={card.status !== "Completed" ? "gradient-purple border-0 text-primary-foreground glow-purple-sm" : "border-border text-foreground hover:bg-secondary"}>
                        <card.icon className="h-3.5 w-3.5 mr-1.5" /> {card.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Metadata Workspace */}
          {metadataView && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Metadata Workspace</h3>
                <Button variant="ghost" size="sm" onClick={() => setMetadataView(false)} className="text-muted-foreground">← Back to Processing</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-5 card-glow h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="h-16 w-12 mx-auto mb-3 bg-secondary rounded flex items-center justify-center">
                      <span className="text-xs">PDF</span>
                    </div>
                    <p className="text-sm">Original Document Preview</p>
                    <p className="text-xs mt-1">RBI_Circular_2026_KYC.pdf</p>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-5 card-glow space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">Extracted Metadata</h4>
                    <select className="text-xs bg-secondary text-foreground border border-border rounded px-2 py-1">
                      <option>V1 – AI Extracted</option>
                      <option>V2 – Edited by John</option>
                    </select>
                  </div>
                  {notification.metadata && Object.entries({
                    "Document Type": notification.metadata.documentType,
                    "Effective Date": notification.metadata.effectiveDate,
                    "Expiry Date": notification.metadata.expiryDate,
                    "Risk Level": notification.metadata.riskLevel,
                    "Affected Departments": notification.metadata.affectedDepartments.join(", "),
                  }).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs text-muted-foreground">{key}</label>
                      <div className="flex items-center gap-2 mt-1">
                        <input className="flex-1 bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-foreground" defaultValue={value} />
                        <span className="text-xs text-primary whitespace-nowrap">
                          {notification.metadata!.confidences[key.replace(/ /g, "").charAt(0).toLowerCase() + key.replace(/ /g, "").slice(1)] || 90}%
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full gradient-purple border-0 text-primary-foreground mt-2">Save as New Version</Button>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Workspace */}
          {analysisView && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Analysis Workspace</h3>
                <Button variant="ghost" size="sm" onClick={() => setAnalysisView(false)} className="text-muted-foreground">← Back to Processing</Button>
              </div>
              <div className="bg-card border border-border rounded-lg card-glow overflow-hidden">
                <Tabs defaultValue="insights">
                  <TabsList className="bg-secondary border-b border-border rounded-none w-full justify-start px-2">
                    <TabsTrigger value="insights" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Key Insights</TabsTrigger>
                    <TabsTrigger value="risk" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Risk Summary</TabsTrigger>
                    <TabsTrigger value="impact" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Business Impact</TabsTrigger>
                  </TabsList>
                  <div className="p-5">
                    <TabsContent value="insights" className="mt-0">
                      <p className="text-sm text-foreground leading-relaxed">
                        "The amendment introduces stricter reporting requirements for quarterly disclosures. Key changes include enhanced data granularity mandates and revised submission timelines."
                      </p>
                    </TabsContent>
                    <TabsContent value="risk" className="mt-0">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-warning/15 text-warning text-sm font-medium">Medium Risk</span>
                        <span className="text-sm text-muted-foreground">Regulatory non-compliance penalty possible</span>
                      </div>
                    </TabsContent>
                    <TabsContent value="impact" className="mt-0">
                      <p className="text-sm text-foreground leading-relaxed">
                        "Increased operational overhead for compliance reporting. Estimated 20% more resources needed for quarterly submissions."
                      </p>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          )}

          {/* Comparison Workspace */}
          {comparisonView && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Comparison Workspace</h3>
                <Button variant="ghost" size="sm" onClick={() => setComparisonView(false)} className="text-muted-foreground">← Back</Button>
              </div>
              <div className="bg-card border border-border rounded-lg p-5 card-glow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded">Changes Detected: 4</span>
                  <span className="text-xs bg-success/15 text-success px-2 py-1 rounded">New Clauses: 2</span>
                  <span className="text-xs bg-destructive/15 text-destructive px-2 py-1 rounded">Removed: 1</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Previous Version</h5>
                    <div className="space-y-2 text-sm text-foreground/80">
                      <p>Section 4.2: Quarterly reports must be submitted within 30 days...</p>
                      <p className="bg-destructive/10 border-l-2 border-destructive px-2 py-1 rounded">Section 5.1: Data format as per Annexure B...</p>
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <h5 className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Current Version</h5>
                    <div className="space-y-2 text-sm text-foreground/80">
                      <p>Section 4.2: Quarterly reports must be submitted within <span className="text-primary font-medium">15 days</span>...</p>
                      <p className="bg-primary/10 border-l-2 border-primary px-2 py-1 rounded">Section 5.1: Data format as per <span className="text-primary font-medium">Revised Annexure C</span>...</p>
                      <p className="bg-success/10 border-l-2 border-success px-2 py-1 rounded">Section 6.3 (New): Enhanced KYC verification frequency...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Under Review Stage */}
          {currentStage === 1 && (
            <div className="bg-card border border-border rounded-lg p-5 card-glow space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Under Review</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-muted-foreground">Reviewer</span><p className="text-sm text-foreground mt-1">{notification.assignedTo}</p></div>
                <div><span className="text-xs text-muted-foreground">Assigned On</span><p className="text-sm text-foreground mt-1">12 Feb 2026</p></div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Comments</label>
                <textarea className="w-full mt-1 bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-none" rows={3} placeholder="Add a comment..." />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Send className="h-3.5 w-3.5 mr-1.5" /> Send Reminder
                </Button>
                <Button className="gradient-purple border-0 text-primary-foreground glow-purple-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Approve & Move to Action
                </Button>
              </div>
            </div>
          )}

          {/* For Action Stage */}
          {currentStage === 2 && (
            <div className="bg-card border border-border rounded-lg p-5 card-glow space-y-4">
              <h3 className="text-sm font-semibold text-foreground">For Action</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-muted-foreground">Assigned Department</span><p className="text-sm text-foreground mt-1">{notification.assignedTo}</p></div>
                <div><span className="text-xs text-muted-foreground">SLA Remaining</span><p className="text-sm text-warning mt-1 font-medium">2 Days</p></div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Upload Response</label>
                <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                  <p className="text-xs text-muted-foreground mt-2">Drop files or click to upload</p>
                </div>
              </div>
              <textarea className="w-full bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-none" rows={3} placeholder="Add a comment..." />
              <div className="flex gap-3">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <Send className="h-3.5 w-3.5 mr-1.5" /> Send Reminder
                </Button>
                <Button className="gradient-purple border-0 text-primary-foreground glow-purple-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Mark as Closed
                </Button>
              </div>
            </div>
          )}

          {/* Closed Stage */}
          {currentStage === 3 && (
            <div className="bg-card border border-border rounded-lg p-5 card-glow space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Closed</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-muted-foreground">Closed On</span><p className="text-sm text-foreground mt-1">18 Feb 2026</p></div>
                <div><span className="text-xs text-muted-foreground">Closed By</span><p className="text-sm text-foreground mt-1">Priya Sharma</p></div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">Final Summary</p>
                <p className="text-sm text-foreground">All requirements addressed. Compliance measures updated in internal policy document v3.2. No further action needed.</p>
              </div>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Download PDF Report
              </Button>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="col-span-1">
          <div className="bg-card border border-border rounded-lg p-5 card-glow sticky top-6">
            <h4 className="text-sm font-semibold text-foreground mb-4">Status History</h4>
            <div className="space-y-0">
              {timelineEvents.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-3 w-3 rounded-full mt-1 ${event.done ? "bg-success" : "bg-border"}`} />
                    {i < timelineEvents.length - 1 && (
                      <div className={`w-px flex-1 min-h-[24px] ${event.done && timelineEvents[i + 1]?.done ? "bg-success/50" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-sm ${event.done ? "text-foreground" : "text-muted-foreground"}`}>{event.label}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
