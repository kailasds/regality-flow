import { Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClosedStage() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 card-glow">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <h3 className="text-lg font-semibold text-foreground">Notification Closed</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="text-xs text-muted-foreground">Closed On</span>
            <p className="text-sm text-foreground mt-1">18 Feb 2026</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Closed By</span>
            <p className="text-sm text-foreground mt-1">Priya Sharma</p>
          </div>
        </div>
        <div className="bg-secondary/50 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-2">Final Summary</p>
          <p className="text-sm text-foreground">
            All requirements addressed. Compliance measures updated in internal policy document v3.2.
            112 obligations reviewed, 12 high-risk items resolved. No further action needed.
          </p>
        </div>
      </div>
      <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
        <Download className="h-3.5 w-3.5 mr-1.5" /> Download PDF Report
      </Button>
    </div>
  );
}
