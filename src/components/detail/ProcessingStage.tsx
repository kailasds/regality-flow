import { useState, useEffect } from "react";
import { CheckCircle2, Loader2, Brain, FileText, Search, GitCompare, BarChart3, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetadataTab from "@/components/detail/MetadataTab";
import AnalysisTab from "@/components/detail/AnalysisTab";
import ComparisonTab from "@/components/detail/ComparisonTab";

const pipelineSteps = [
  { id: 1, label: "Extracting Metadata", icon: FileText, log: "Parsing document structure…" },
  { id: 2, label: "Identifying Obligations", icon: Search, log: "Detected 112 obligations…" },
  { id: 3, label: "Running Impact Analysis", icon: Brain, log: "Classifying risk levels…" },
  { id: 4, label: "Detecting Changes", icon: GitCompare, log: "Cross-checking previous version…" },
  { id: 5, label: "Generating Summary", icon: BarChart3, log: "Summary generated successfully." },
];

interface Props {
  isNew?: boolean;
}

export default function ProcessingStage({ isNew = false }: Props) {
  const [currentStep, setCurrentStep] = useState(isNew ? 0 : 5);
  const [processing, setProcessing] = useState(isNew);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (!processing) return;
    if (currentStep >= pipelineSteps.length) {
      setProcessing(false);
      return;
    }
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 1500);
    return () => clearTimeout(timer);
  }, [currentStep, processing]);

  const allComplete = currentStep >= pipelineSteps.length;

  if (activeTab) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => setActiveTab(null)}>
          ← Back to Processing Overview
        </Button>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary border border-border rounded-lg w-full justify-start px-1">
            <TabsTrigger value="metadata" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Metadata</TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Analysis</TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="metadata" className="mt-6"><MetadataTab /></TabsContent>
          <TabsContent value="analysis" className="mt-6"><AnalysisTab /></TabsContent>
          <TabsContent value="comparison" className="mt-6"><ComparisonTab /></TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Pipeline */}
      <div className="bg-card border border-border rounded-lg p-6 card-glow">
        <div className="flex items-center gap-2 mb-5">
          <Brain className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">AI Processing Pipeline</h3>
          {processing && <span className="ml-auto text-xs text-primary animate-pulse">Processing…</span>}
          {allComplete && <span className="ml-auto text-xs text-success">Complete</span>}
        </div>

        <div className="space-y-3">
          {pipelineSteps.map((step, i) => {
            const isComplete = i < currentStep;
            const isActive = i === currentStep && processing;

            return (
              <div key={step.id} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                isActive ? "bg-primary/10 border border-primary/20" :
                isComplete ? "bg-secondary/50" : "opacity-50"
              }`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  isComplete ? "bg-success text-success-foreground" :
                  isActive ? "gradient-purple text-primary-foreground glow-purple-sm" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {isComplete ? <CheckCircle2 className="h-4 w-4" /> :
                   isActive ? <Loader2 className="h-4 w-4 animate-spin" /> :
                   <step.icon className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${isComplete || isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                  {(isComplete || isActive) && (
                    <p className="text-xs text-muted-foreground mt-0.5">{step.log}</p>
                  )}
                </div>
                {isActive && (
                  <div className="w-24">
                    <Progress value={65} className="h-1.5" />
                  </div>
                )}
                {isComplete && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading skeletons while processing */}
      {processing && (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-5 card-glow">
              <Skeleton className="h-3 w-20 mb-3" />
              <Skeleton className="h-7 w-12 mb-2" />
              <Skeleton className="h-2 w-24" />
            </div>
          ))}
        </div>
      )}

      {/* Processing Complete Output */}
      {allComplete && (
        <>
          <div className="bg-card border border-border rounded-lg p-6 card-glow">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h2 className="text-lg font-bold text-foreground">AI Processing Complete</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              This regulation introduces stricter capital adequacy reporting affecting Mortgage and Compliance departments.
            </p>
          </div>

          {/* Workspace Access */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "View Metadata", desc: "Review extracted obligations & fields", tab: "metadata" },
              { label: "View Analysis", desc: "AI reasoning & risk breakdown", tab: "analysis" },
              { label: "View Comparison", desc: "Version diff & change detection", tab: "comparison" },
            ].map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className="bg-card border border-border rounded-lg p-5 card-glow text-left hover:border-primary/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">{item.label}</h4>
                  <Eye className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
