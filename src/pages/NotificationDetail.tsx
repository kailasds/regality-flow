import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";
import StatusHistoryDrawer from "@/components/detail/StatusHistoryDrawer";
import ProcessingStage from "@/components/detail/ProcessingStage";
import ReviewStage from "@/components/detail/ReviewStage";
import ActionStage from "@/components/detail/ActionStage";
import ClosedStage from "@/components/detail/ClosedStage";

const stages = ["Processing", "Review", "Action", "Closed"] as const;

function getStageIndex(subStatus: string) {
  if (subStatus === "Processing") return 0;
  if (subStatus === "Under Review") return 1;
  if (subStatus === "For Action") return 2;
  return 3;
}

// Demo notification for new uploads
const demoNotification = {
  id: "N-1056",
  regulator: "RBI",
  subject: "Revised Capital Adequacy Framework",
  stage: "Pending" as const,
  subStatus: "Processing" as const,
  assignedTo: "AI Engine",
  lastUpdated: "Just now",
  department: "Compliance",
};

export default function NotificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get("new") === "true";

  const notification = id === "N-1056" ? demoNotification :
    notifications.find((n) => n.id === id) || notifications[0];
  const currentStage = isNew ? 0 : getStageIndex(notification.subStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{notification.id} — {notification.subject}</h2>
            <p className="text-sm text-muted-foreground">{notification.regulator} · {notification.department}</p>
          </div>
        </div>
        <StatusHistoryDrawer />
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

      {/* Stage Content */}
      {currentStage === 0 && <ProcessingStage isNew={isNew} />}
      {currentStage === 1 && <ReviewStage notification={notification} />}
      {currentStage === 2 && <ActionStage notification={notification} />}
      {currentStage === 3 && <ClosedStage />}
    </div>
  );
}
