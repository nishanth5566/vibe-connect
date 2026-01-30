import { cn } from "@/lib/utils";

const genderOptions = [
  { value: "male", label: "Male", emoji: "👨" },
  { value: "female", label: "Female", emoji: "👩" },
  { value: "non-binary", label: "Non-binary", emoji: "🧑" },
  { value: "prefer-not", label: "Prefer not to say", emoji: "🤫" },
];

interface GenderStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const GenderStep = ({ value, onChange, error }: GenderStepProps) => {
  return (
    <div className="w-full max-w-md animate-fade-in px-2">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
          About you
        </span>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          What's your gender?
        </h2>
        <p className="text-muted-foreground">
          Help us personalize your experience
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {genderOptions.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "group p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3",
              "hover:scale-[1.02] active:scale-[0.98]",
              value === option.value
                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                : "border-border/50 bg-card hover:border-primary/30 hover:bg-secondary/50"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className={cn(
              "text-4xl transition-transform duration-300",
              value === option.value ? "scale-110" : "group-hover:scale-105"
            )}>
              {option.emoji}
            </span>
            <span
              className={cn(
                "font-semibold transition-colors",
                value === option.value ? "text-primary" : "text-foreground"
              )}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-3 text-center animate-shake">
          {error}
        </p>
      )}
    </div>
  );
};

export default GenderStep;
