import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  MessageCircle, 
  Ban, 
  Flag,
  BellOff,
  Bell,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatContact } from "@/hooks/useChatStore";

interface ContactProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: ChatContact | null;
  isMuted: boolean;
  onMessage: () => void;
  onShowOnMap: () => void;
  onBlock: () => void;
  onReport: () => void;
  onMuteToggle: () => void;
}

const ContactProfileSheet = ({
  open,
  onOpenChange,
  contact,
  isMuted,
  onMessage,
  onShowOnMap,
  onBlock,
  onReport,
  onMuteToggle,
}: ContactProfileSheetProps) => {
  if (!contact) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl h-[85vh]">
        <div className="flex flex-col h-full">
          {/* Profile Header */}
          <div className="flex flex-col items-center pt-4 pb-6">
            <div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 bg-gradient-to-br",
                contact.avatarColor
              )}
            >
              {contact.name.charAt(0)}
            </div>
            
            <h2 className="text-2xl font-bold text-foreground">{contact.name}</h2>
            
            {/* Online Status */}
            <div className="flex items-center gap-2 mt-1">
              {contact.online ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-online" />
                  <span className="text-sm text-online">Online</span>
                </>
              ) : (
                <>
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Last seen {contact.lastSeen || "recently"}
                  </span>
                </>
              )}
            </div>

            {/* Status */}
            {contact.status && (
              <p className="text-muted-foreground mt-2 text-center px-4">
                {contact.status}
              </p>
            )}
          </div>

          {/* Bio Section */}
          {contact.bio && (
            <div className="px-4 py-3 bg-muted rounded-xl mx-4 mb-4">
              <p className="text-sm text-foreground">{contact.bio}</p>
            </div>
          )}

          {/* Vibes */}
          {contact.vibes && contact.vibes.length > 0 && (
            <div className="px-4 mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Vibes</h3>
              <div className="flex flex-wrap gap-2">
                {contact.vibes.map((vibe) => (
                  <span
                    key={vibe}
                    className="px-3 py-1 text-sm rounded-full bg-vibe-tag text-vibe-tag-text"
                  >
                    {vibe}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          {contact.location && (
            <div className="px-4 mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Location</h3>
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{contact.location}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="px-4 space-y-2 mt-auto pb-6">
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={onMessage} className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Message
              </Button>
              <Button onClick={onShowOnMap} variant="secondary" className="gap-2">
                <MapPin className="w-4 h-4" />
                Show on Map
              </Button>
            </div>

            <Button
              onClick={onMuteToggle}
              variant="outline"
              className="w-full gap-2"
            >
              {isMuted ? (
                <>
                  <Bell className="w-4 h-4" />
                  Unmute
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4" />
                  Mute
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={onBlock}
                variant="outline"
                className="flex-1 gap-2 text-destructive hover:text-destructive"
              >
                <Ban className="w-4 h-4" />
                Block
              </Button>
              <Button
                onClick={onReport}
                variant="outline"
                className="flex-1 gap-2 text-destructive hover:text-destructive"
              >
                <Flag className="w-4 h-4" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContactProfileSheet;
