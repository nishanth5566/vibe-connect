import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BioStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const BioStep = ({ value, onChange, error }: BioStepProps) => {
  const charCount = value.length;
  const maxChars = 200;
  const isNearLimit = charCount > maxChars * 0.8;

  return (
    <div className="w-full max-w-md animate-fade-in px-2">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
          Express yourself
        </span>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Tell us about yourself
        </h2>
        <p className="text-muted-foreground">
          A short bio to help others know you better
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="bio" className="text-sm font-medium">
          Your bio
        </Label>
        <div className="relative">
          <Textarea
            id="bio"
            placeholder="I love coffee, music, and meeting new people... ☕🎵"
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, maxChars))}
            className="min-h-[140px] rounded-2xl bg-card border-border/50 text-base resize-none px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="flex items-center justify-between">
          {error ? (
            <p className="text-sm text-destructive flex items-center gap-1 animate-shake">
              <span className="w-1 h-1 rounded-full bg-destructive" />
              {error}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Pro tip: Mention your interests! 💡
            </p>
          )}
          <span className={cn(
            "text-xs px-2 py-1 rounded-full transition-colors",
            isNearLimit ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
          )}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>
    </div>
  );
};

// Need to import cn
import { cn } from "@/lib/utils";

export default BioStep;
