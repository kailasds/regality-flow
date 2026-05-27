import { useEffect, useState } from "react";
import { Brain, CheckCircle2, FileText, GitCompare, Loader2, Search, BarChart3 } from "lucide-react";

const steps = [
  { label: "Extracting Metadata", icon: FileText },
  { label: "Identifying Obligations", icon: Search },
  { label: "Running Impact Analysis", icon: Brain },
  { label: "Detecting Changes", icon: GitCompare },
  { label: "Generating Summary", icon: BarChart3 },
];

interface Props {
  stepDuration?: number;
  onComplete?: () => void;
}

export default function AIProcessingAnimation({ stepDuration = 700, onComplete }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) {
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), stepDuration);
    return () => clearTimeout(t);
  }, [current, stepDuration, onComplete]);

  const progress = Math.min(100, (current / steps.length) * 100);

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 rounded-full gradient-purple flex items-center justify-center glow-purple-sm">
          <Brain className="h-5 w-5 text-primary-foreground" />
          <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">AI Processing in progress</p>
          <p className="text-xs text-muted-foreground">Step {Math.min(current + 1, steps.length)} of {steps.length}</p>
        </div>
      </div>

      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-300 ${
                active
                  ? "bg-primary/10 border-primary/30 animate-fade-in"
                  : done
                  ? "bg-success/5 border-success/20"
                  : "bg-secondary/40 border-transparent opacity-60"
              }`}
            >
              <div
                className={`h-7 w-7 rounded-md flex items-center justify-center shrink-0 ${
                  done
                    ? "bg-success/20 text-success"
                    : active
                    ? "gradient-purple text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : active ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <p
                className={`text-sm flex-1 ${
                  active ? "text-foreground font-medium" : done ? "text-muted-foreground" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </p>
              {done && <span className="text-[10px] uppercase tracking-wider text-success font-semibold">Done</span>}
              {active && <span className="text-[10px] uppercase tracking-wider text-primary font-semibold animate-pulse">Running</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}