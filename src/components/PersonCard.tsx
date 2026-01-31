import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import VerifiedBadge from "@/components/VerifiedBadge";
import { motion } from "framer-motion";

interface PersonCardProps {
  name: string;
  distance: string;
  vibe: string;
  avatarUrl?: string;
  avatarColor?: string;
  isVerified?: boolean;
  onChat: () => void;
  onNext: () => void;
}

const PersonCard = ({
  name,
  distance,
  vibe,
  avatarUrl,
  avatarColor = "bg-gradient-to-br from-amber-400 to-orange-500",
  isVerified = false,
  onChat,
  onNext,
}: PersonCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4"
    >
      <div className="flex items-center gap-4">
        {/* Avatar with verified badge */}
        <div className="relative">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white overflow-hidden ring-2 ring-background shadow-lg",
              !avatarUrl && avatarColor
            )}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>
          {isVerified && (
            <div className="absolute -bottom-1 -right-1">
              <VerifiedBadge size="sm" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground text-lg">{name}</h3>
          </div>
          <p className="text-muted-foreground text-sm">{distance}</p>
          <span className="inline-block mt-1 px-3 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20">
            {vibe}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onChat}
            className="w-12 h-12 rounded-full border-2 border-border bg-card/80 backdrop-blur-sm flex items-center justify-center hover:border-primary hover:text-primary transition-colors shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onNext}
              className="rounded-full px-6 h-12 font-semibold gradient-primary border-0 shadow-lg shadow-primary/25"
            >
              Next
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonCard;