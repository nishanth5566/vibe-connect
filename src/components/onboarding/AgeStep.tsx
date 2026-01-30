import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AgeStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const AgeStep = ({ value, onChange, error }: AgeStepProps) => {
  return (
    <div className="w-full max-w-md animate-fade-in px-2">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
          Almost there
        </span>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          How old are you?
        </h2>
        <p className="text-muted-foreground">
          We'll connect you with people in your age group
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="age" className="text-sm font-medium">
          Your age
        </Label>
        <Input
          id="age"
          type="number"
          placeholder="18"
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 3))}
          className="h-16 rounded-2xl bg-card border-border/50 text-4xl font-bold text-center px-5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          min={18}
          max={120}
        />
        {error && (
          <p className="text-sm text-destructive flex items-center gap-1 justify-center animate-shake">
            <span className="w-1 h-1 rounded-full bg-destructive" />
            {error}
          </p>
        )}
        <p className="text-xs text-muted-foreground text-center">
          You must be 18 or older to use Radius
        </p>
      </div>
    </div>
  );
};

export default AgeStep;
