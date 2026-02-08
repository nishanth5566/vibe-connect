import { useState } from "react";
import { cn } from "@/lib/utils";
import { vibeOptions } from "@/data/vibes";
import { Check, Sparkles, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VibesStepProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

const VibesStep = ({ value, onChange, error }: VibesStepProps) => {
  const [customVibe, setCustomVibe] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Get all predefined vibe IDs
  const predefinedVibeIds = vibeOptions.map((v) => v.id);

  // Custom vibes are those in value that aren't predefined
  const customVibes = value.filter((v) => !predefinedVibeIds.includes(v));

  const toggleVibe = (vibeId: string) => {
    if (value.includes(vibeId)) {
      onChange(value.filter((v) => v !== vibeId));
    } else {
      onChange([...value, vibeId]);
    }
  };

  const addCustomVibe = () => {
    const trimmed = customVibe.trim();
    if (trimmed && !value.includes(trimmed.toLowerCase())) {
      onChange([...value, trimmed]);
      setCustomVibe("");
      setShowCustomInput(false);
    }
  };

  const handleCustomKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomVibe();
    }
  };

  const removeCustomVibe = (vibe: string) => {
    onChange(value.filter((v) => v !== vibe));
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
          Select interests or add your own
        </p>
        
        {/* Selected count */}
        <div className="mt-4">
          <span className="text-sm font-medium text-primary">
            {value.length} selected
          </span>
        </div>
      </motion.div>

      {/* Custom vibes display */}
      <AnimatePresence>
        {customVibes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 flex flex-wrap gap-2"
          >
            {customVibes.map((vibe) => (
              <motion.div
                key={vibe}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
              >
                <span className="text-sm font-medium text-primary">{vibe}</span>
                <button
                  onClick={() => removeCustomVibe(vibe)}
                  className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors"
                >
                  <X className="w-3 h-3 text-primary" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom vibe input */}
      <AnimatePresence>
        {showCustomInput ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 flex gap-2"
          >
            <Input
              value={customVibe}
              onChange={(e) => setCustomVibe(e.target.value)}
              onKeyPress={handleCustomKeyPress}
              placeholder="Type your interest..."
              className="flex-1 rounded-full"
              autoFocus
            />
            <Button
              size="sm"
              onClick={addCustomVibe}
              disabled={!customVibe.trim()}
              className="rounded-full px-4"
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setShowCustomInput(false);
                setCustomVibe("");
              }}
              className="rounded-full px-3"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowCustomInput(true)}
            className="w-full mb-3 p-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center justify-center gap-2 text-primary font-medium"
          >
            <Plus className="w-5 h-5" />
            Add custom interest
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto py-2 scrollbar-thin"
      >
        {vibeOptions.map((vibe, index) => {
          const isSelected = value.includes(vibe.id);

          return (
            <motion.button
              key={vibe.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index, duration: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleVibe(vibe.id)}
              className={cn(
                "group relative p-3 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-1.5",
                isSelected
                  ? "border-primary bg-gradient-to-br from-primary/15 to-accent/10 shadow-lg shadow-primary/20"
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
            : `${value.length} ${value.length === 1 ? 'interest' : 'interests'} selected`
          }
        </p>
      </motion.div>
    </div>
  );
};

export default VibesStep;
