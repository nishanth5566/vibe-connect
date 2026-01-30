import { cn } from "@/lib/utils";
import { vibeOptions } from "@/data/vibes";
import { Check } from "lucide-react";

interface VibesStepProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

const VibesStep = ({ value, onChange, error }: VibesStepProps) => {
  const toggleVibe = (vibeId: string) => {
    if (value.includes(vibeId)) {
      onChange(value.filter((v) => v !== vibeId));
    } else if (value.length < 5) {
      onChange([...value, vibeId]);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in px-2">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          Final step ✨
        </span>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          What's your vibe?
        </h2>
        <p className="text-muted-foreground">
          Select up to 5 interests to find your tribe
        </p>
        <div className="flex justify-center gap-1 mt-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                value.length >= i ? "bg-primary scale-100" : "bg-muted scale-75"
              )}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 max-h-[320px] overflow-y-auto py-2 scrollbar-thin">
        {vibeOptions.map((vibe, index) => {
          const isSelected = value.includes(vibe.id);
          const isDisabled = !isSelected && value.length >= 5;

          return (
            <button
              key={vibe.id}
              onClick={() => toggleVibe(vibe.id)}
              disabled={isDisabled}
              className={cn(
                "group relative p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-1.5",
                "hover:scale-[1.03] active:scale-[0.97]",
                isSelected
                  ? "border-primary bg-primary/10 shadow-md shadow-primary/15"
                  : isDisabled
                  ? "border-border/30 bg-muted/30 opacity-50 cursor-not-allowed"
                  : "border-border/50 bg-card hover:border-primary/40 hover:bg-secondary/50"
              )}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-sm">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              <span className={cn(
                "text-2xl transition-transform duration-300",
                isSelected ? "scale-110" : "group-hover:scale-105"
              )}>
                {vibe.emoji}
              </span>
              <span className={cn(
                "text-[10px] font-medium transition-colors text-center leading-tight",
                isSelected ? "text-primary" : "text-muted-foreground"
              )}>
                {vibe.label}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-destructive mt-3 text-center animate-shake">
          {error}
        </p>
      )}
      
      <p className="text-xs text-muted-foreground text-center mt-3">
        {value.length === 0 
          ? "Pick at least 1 vibe to continue"
          : `${5 - value.length} more ${5 - value.length === 1 ? 'pick' : 'picks'} available`
        }
      </p>
    </div>
  );
};

export default VibesStep;
