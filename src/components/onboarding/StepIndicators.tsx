import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface StepIndicatorsProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicators = ({ steps, currentStep }: StepIndicatorsProps) => {
  return (
    <div className="flex justify-center gap-3 py-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <div key={step.id} className="relative">
            {/* Connection line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-1/2 left-full w-3 h-0.5 -translate-y-1/2 transition-colors duration-500",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
            
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500",
                isActive && "gradient-primary scale-110 shadow-lg shadow-primary/30 rotate-3",
                isComplete && "bg-primary text-primary-foreground",
                !isActive && !isComplete && "bg-muted/50 text-muted-foreground"
              )}
            >
              {isComplete ? (
                <Check className="w-5 h-5" />
              ) : (
                <Icon className={cn("w-5 h-5 transition-transform duration-300", isActive && "scale-110")} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicators;
