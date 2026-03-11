import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";
import StatusHistoryDrawer from "@/components/detail/StatusHistoryDrawer";
import ProcessingStage from "@/components/detail/ProcessingStage";
import ActionStage from "@/components/detail/ActionStage";
import ClosedStage from "@/components/detail/ClosedStage";

const stages = ["Processing", "Review", "Action", "Closed"] as const;

function getStageIndex(subStatus: string) {
  if (subStatus === "Processing") return 0;
  if (subStatus === "Under Review") return 1;
  if (subStatus === "For Action") return 2;
  return 3;
}

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
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{notification.id} — {notification.subject}</h2>
            <p className="text-sm text-muted-foreground">{notification.regulator} · {notification.department}</p>
          </div>
        </div>
        <StatusHistoryDrawer />
      </div>

      {/* Stage Content - Under Review now shows ProcessingStage (completed) */}
      {(currentStage === 0 || currentStage === 1) && <ProcessingStage isNew={isNew} />}
      {currentStage === 2 && <ActionStage notification={notification} />}
      {currentStage === 3 && <ClosedStage />}
    </div>
  );
}
