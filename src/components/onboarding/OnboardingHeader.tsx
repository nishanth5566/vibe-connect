import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
}

const OnboardingHeader = ({ currentStep, totalSteps, onBack }: OnboardingHeaderProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="px-4 py-4 max-w-md mx-auto">
        {/* Back button & Step indicator */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            disabled={currentStep === 0}
            className={cn(
              "flex items-center gap-1 text-sm font-medium transition-all duration-300",
              currentStep === 0
                ? "text-muted-foreground/30 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground hover:-translate-x-0.5"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-primary">
              {currentStep + 1}
            </span>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">{totalSteps}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-700 ease-out rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingHeader;
