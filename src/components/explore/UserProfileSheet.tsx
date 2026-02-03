import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Ban, Flag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GroupMember } from "@/hooks/useGroupStore";

interface UserProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: GroupMember | null;
  isBlocked: boolean;
  onBlock: () => void;
  onUnblock: () => void;
  onReport: () => void;
  onShowOnMap: () => void;
  onMessage: () => void;
}

const UserProfileSheet = ({
  open,
  onOpenChange,
  user,
  isBlocked,
  onBlock,
  onUnblock,
  onReport,
  onShowOnMap,
  onMessage,
}: UserProfileSheetProps) => {
  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
        <SheetHeader className="text-center pb-4">
          <SheetTitle className="sr-only">User Profile</SheetTitle>
          
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-br shadow-lg",
                user.avatarColor
              )}
            >
              {user.name.charAt(0)}
            </div>
          </div>

          {/* Name and Status */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  user.isOnline ? "bg-online" : "bg-muted-foreground"
                )}
              />
              <span className="text-sm text-muted-foreground">
                {user.isOnline ? "Online" : "Offline"}
              </span>
              {user.isAdmin && (
                <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                  Admin
                </span>
              )}
            </div>
          </div>
        </SheetHeader>

        {/* Actions */}
        <div className="space-y-3 mt-6">
          {/* Message */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={onMessage}
          >
            <MessageCircle className="w-5 h-5" />
            Send Message
          </Button>

          {/* Show on Map */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={onShowOnMap}
          >
            <MapPin className="w-5 h-5" />
            Show on Map
          </Button>

          {/* Block/Unblock */}
          <Button
            variant={isBlocked ? "outline" : "destructive"}
            className="w-full justify-start gap-3 h-12"
            onClick={isBlocked ? onUnblock : onBlock}
          >
            {isBlocked ? (
              <>
                <X className="w-5 h-5" />
                Unblock User
              </>
            ) : (
              <>
                <Ban className="w-5 h-5" />
                Block User
              </>
            )}
          </Button>

          {/* Report */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive"
            onClick={onReport}
          >
            <Flag className="w-5 h-5" />
            Report User
          </Button>
        </div>

        {isBlocked && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            This user is blocked. You won't see their messages.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default UserProfileSheet;
