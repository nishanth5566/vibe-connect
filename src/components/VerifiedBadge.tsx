import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const VerifiedBadge = ({ size = "md", showLabel = false, className }: VerifiedBadgeProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={cn("flex items-center gap-1", className)}
    >
      <div
        className={cn(
          "rounded-full bg-gradient-to-br from-success to-accent flex items-center justify-center shadow-lg",
          sizeClasses[size]
        )}
      >
        <ShieldCheck className={cn("text-white", iconSizes[size])} />
      </div>
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-medium text-success"
        >
          Verified
        </motion.span>
      )}
    </motion.div>
  );
};

export default VerifiedBadge;
