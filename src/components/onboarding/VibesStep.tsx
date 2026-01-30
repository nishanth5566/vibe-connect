import { cn } from "@/lib/utils";
import { vibeOptions } from "@/data/vibes";
import { Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VibesStepProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

const VibesStep = ({ value, onChange, error }: VibesStepProps) => {
  const MAX_VIBES = 10;

  const toggleVibe = (vibeId: string) => {
    if (value.includes(vibeId)) {
      onChange(value.filter((v) => v !== vibeId));
    } else if (value.length < MAX_VIBES) {
      onChange([...value, vibeId]);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in px-2">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-xs font-semibold mb-4"
        >
          Express yourself ✨
        </motion.span>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          What's your vibe?
        </h2>
        <p className="text-muted-foreground">
          Select up to {MAX_VIBES} interests to find your tribe
        </p>
        
        {/* Progress indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: MAX_VIBES }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.03 }}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                value.length > i 
                  ? "bg-gradient-to-r from-primary to-accent scale-100 shadow-sm shadow-primary/30" 
                  : "bg-muted scale-75"
              )}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-4 gap-2 max-h-[340px] overflow-y-auto py-2 scrollbar-thin"
      >
        {vibeOptions.map((vibe, index) => {
          const isSelected = value.includes(vibe.id);
          const isDisabled = !isSelected && value.length >= MAX_VIBES;
          const selectionIndex = value.indexOf(vibe.id);

          return (
            <motion.button
              key={vibe.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index, duration: 0.2 }}
              whileHover={!isDisabled ? { scale: 1.05, y: -2 } : undefined}
              whileTap={!isDisabled ? { scale: 0.95 } : undefined}
              onClick={() => toggleVibe(vibe.id)}
              disabled={isDisabled}
              className={cn(
                "group relative p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-1.5",
                isSelected
                  ? "border-primary bg-gradient-to-br from-primary/15 to-accent/10 shadow-lg shadow-primary/20"
                  : isDisabled
                  ? "border-border/30 bg-muted/30 opacity-40 cursor-not-allowed"
                  : "border-border/50 bg-card hover:border-primary/50 hover:bg-secondary/50 hover:shadow-md"
              )}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-md"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Selection order badge */}
              <AnimatePresence>
                {isSelected && selectionIndex >= 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center shadow-md"
                  >
                    {selectionIndex + 1}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.span 
                animate={isSelected ? { scale: 1.15 } : { scale: 1 }}
                className="text-2xl transition-transform duration-300"
              >
                {vibe.emoji}
              </motion.span>
              <span className={cn(
                "text-[10px] font-medium transition-colors text-center leading-tight",
                isSelected ? "text-primary font-semibold" : "text-muted-foreground"
              )}>
                {vibe.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-destructive mt-3 text-center animate-shake"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-center"
      >
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-primary" />
          {value.length === 0 
            ? "Pick at least 1 vibe to continue"
            : value.length >= MAX_VIBES
            ? "Maximum vibes selected!"
            : `${MAX_VIBES - value.length} more ${MAX_VIBES - value.length === 1 ? 'pick' : 'picks'} available`
          }
        </p>
      </motion.div>
    </div>
  );
};

export default VibesStep;
