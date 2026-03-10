import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Search, ChevronDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";

const obligations = [
  {
    id: 1,
    section: "1 – Governance",
    text: "Board must approve risk appetite statement annually.",
    interpretation: "The Board is responsible for approving the risk appetite statement on a yearly basis.",
    compliance: "Approve risk appetite statement",
    department: "Board / Risk Management",
    dueDate: "Annually",
  },
  {
    id: 2,
    section: "1 – Governance",
    text: "Policies must be reviewed at least every 12 months.",
    interpretation: "All relevant governance policies need to undergo a formal review cycle at minimum once per year.",
    compliance: "Review and update governance policies",
    department: "Compliance",
    dueDate: "Every 12 months",
  },
  {
    id: 3,
    section: "2 – Risk Assessment",
    text: "Quarterly risk assessments must be conducted for all high-risk portfolios.",
    interpretation: "High-risk lending portfolios require formal risk evaluation every quarter.",
    compliance: "Conduct quarterly risk assessments",
    department: "Risk Management",
    dueDate: "Quarterly",
  },
  {
    id: 4,
    section: "3 – Reporting",
    text: "Quarterly disclosure reports must be submitted within 15 days of quarter end.",
    interpretation: "The submission deadline for quarterly disclosures has been tightened from 30 to 15 calendar days.",
    compliance: "Submit quarterly disclosure reports within 15 days",
    department: "Compliance / Finance",
    dueDate: "15 days post quarter",
  },
];

export default function ViewAnalysis() {
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
        <Button className="gradient-purple border-0 text-primary-foreground glow-purple-sm gap-2">
          <FileText className="h-3.5 w-3.5" /> Submit Changes
        </Button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-5 gap-6 h-[calc(100vh-180px)]">
        {/* Left - Document Preview */}
        <div className="col-span-2 bg-card border border-border rounded-lg flex flex-col card-glow">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Document Preview</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
            <button className="text-xs text-muted-foreground hover:text-foreground px-1">−</button>
            <button className="text-xs text-muted-foreground hover:text-foreground px-1">+</button>
            <span className="text-xs text-muted-foreground mx-2">Page 1 of 27</span>
            <Search className="h-3 w-3 text-muted-foreground ml-auto" />
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
              <h3 className="text-base font-semibold text-foreground">Risk management framework</h3>
              <div className="bg-primary/10 border-l-2 border-primary px-3 py-2 rounded text-xs">
                Consistent with Prudential Standard CPS 220 Risk Management, where residential mortgage
                lending forms a material proportion of an ADI's lending portfolio and therefore represents a risk
                that may have a material impact on the ADI, APRA expects that the Board would take reasonable
                steps to satisfy itself as to the level of risk in the ADI's residential mortgage lending portfolio.
              </div>
              <h4 className="text-sm font-semibold text-primary">APRA's expectations of an ADI Board for residential mortgage lending</h4>
              <p>3. Where residential mortgage lending forms a material proportion of an ADI's lending portfolio and
                therefore a risk that may have a material impact on the ADI, APRA expects that the Board would take
                reasonable steps to satisfy itself as to the level of risk.</p>
              <div className="space-y-2 pl-4 text-xs">
                <p>a) specifically addressing residential mortgage lending in the ADI's risk appetite, risk management strategy and business plans;</p>
                <p>b) seeking assurances from senior management that the approved risk appetite is being adhered to;</p>
                <p>c) seeking assurances from senior management that there is a robust management information system in place;</p>
              </div>
              <h4 className="text-sm font-semibold text-primary mt-4">Risk appetite including residential mortgage lending</h4>
              <p>4. The overarching risk appetite statement required under CPS 220 would typically include an
                expression of the level of credit risk an ADI is willing to accept.</p>
            </div>
          </div>
        </div>

        {/* Right - Analysis */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Analysis</h3>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              className="w-full bg-secondary border border-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
              placeholder="Search any text in the cards (Section, Dept, Text, Interpretation, Date, etc.)"
            />
          </div>

          {/* Obligation Cards */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {obligations.map((ob) => (
              <div key={ob.id} className="bg-card border border-border rounded-lg overflow-hidden card-glow">
                {/* Section Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/30 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary">§</span>
                    <span className="text-sm font-medium text-foreground">{ob.section}</span>
                  </div>
                  <span className="text-xs bg-destructive/15 text-destructive px-2.5 py-1 rounded-full font-medium">ACTION POINT</span>
                </div>

                <div className="p-4 space-y-3">
                  {/* Text */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Text</span>
                    </div>
                    <p className="text-sm text-foreground">{ob.text}</p>
                  </div>

                  {/* Interpretation */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs text-muted-foreground">❝</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Interpretation / Simplification</span>
                    </div>
                    <p className="text-sm text-foreground/80 italic">{ob.interpretation}</p>
                  </div>

                  {/* Compliance */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs text-muted-foreground">📋</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Compliance to be done</span>
                    </div>
                    <p className="text-sm text-foreground">{ob.compliance}</p>
                  </div>

                  {/* Dept & Due Date */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">🏢</span>
                      <span className="text-muted-foreground">Responsible Dept.:</span>
                      <span className="text-foreground font-medium">{ob.department}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">📅</span>
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="text-foreground font-medium">{ob.dueDate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <ChevronDown className="h-3 w-3" /> Reasons
                    </button>
                    <Button size="sm" variant="outline" className="h-7 px-3 text-xs gap-1 border-border">
                      <Pencil className="h-3 w-3" /> Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
