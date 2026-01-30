import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NameStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const NameStep = ({ value, onChange, error }: NameStepProps) => {
  return (
    <div className="w-full max-w-md animate-fade-in px-2">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
          Let's get started
        </span>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          What's your name?
        </h2>
        <p className="text-muted-foreground">
          This is how others will see you on Radius
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="name" className="text-sm font-medium">
          Your name
        </Label>
        <div className="relative">
          <Input
            id="name"
            placeholder="Enter your name"
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, 50))}
            className="h-14 rounded-2xl bg-card border-border/50 text-lg px-5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            autoFocus
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {value.length}/50
            </span>
          </div>
        </div>
        {error && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-shake">
            <span className="w-1 h-1 rounded-full bg-destructive" />
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default NameStep;
