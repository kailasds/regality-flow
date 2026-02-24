import { timelineEvents } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";

export default function StatusHistoryDrawer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground hover:bg-secondary">
          <History className="h-3.5 w-3.5 mr-1.5" /> Status History
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Status History</DialogTitle>
        </DialogHeader>
        <div className="space-y-0 mt-4">
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
      </DialogContent>
    </Dialog>
  );
}
