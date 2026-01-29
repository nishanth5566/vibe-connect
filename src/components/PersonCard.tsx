import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PersonCardProps {
  name: string;
  distance: string;
  vibe: string;
  avatarUrl?: string;
  avatarColor?: string;
  onChat: () => void;
  onNext: () => void;
}

const PersonCard = ({
  name,
  distance,
  vibe,
  avatarUrl,
  avatarColor = "bg-gradient-to-br from-amber-400 to-orange-500",
  onChat,
  onNext,
}: PersonCardProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-card p-4 animate-slide-up">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-white overflow-hidden",
            !avatarUrl && avatarColor
          )}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg">{name}</h3>
          <p className="text-muted-foreground text-sm">{distance}</p>
          <span className="inline-block mt-1 px-3 py-0.5 text-xs font-medium rounded-full bg-vibe-tag text-vibe-tag-text">
            {vibe}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onChat}
            className="w-12 h-12 rounded-full border-2 border-border bg-card flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <Button
            onClick={onNext}
            className="rounded-full px-6 h-12 font-semibold bg-primary hover:bg-primary/90"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;