import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  Bell, 
  BellOff, 
  Trash2, 
  LogOut, 
  Image,
  Info,
  Flag
} from "lucide-react";
import { Group, GroupMember } from "@/hooks/useGroupStore";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GroupOptionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: Group | null;
  onMuteToggle: (muted: boolean) => void;
  onClearChat: () => void;
  onLeaveGroup: () => void;
  onMemberClick: (member: GroupMember) => void;
  onReportGroup: () => void;
}

const GroupOptionsSheet = ({
  open,
  onOpenChange,
  group,
  onMuteToggle,
  onClearChat,
  onLeaveGroup,
  onMemberClick,
  onReportGroup,
}: GroupOptionsSheetProps) => {
  if (!group) return null;

  const Icon = group.isMuted ? BellOff : Bell;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="text-center pb-6">
              <SheetTitle className="sr-only">Group Options</SheetTitle>
              
              {/* Group Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                    group.gradient
                  )}
                >
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Group Info */}
              <h2 className="text-xl font-bold text-foreground">{group.name}</h2>
              <p className="text-sm text-muted-foreground">{group.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {group.members.length} members
              </p>
            </SheetHeader>

            {/* Options */}
            <div className="space-y-2 mt-4">
              {/* Mute Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Mute Notifications</span>
                </div>
                <Switch
                  checked={group.isMuted}
                  onCheckedChange={onMuteToggle}
                />
              </div>

              {/* Media & Links (placeholder) */}
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12"
                disabled
              >
                <Image className="w-5 h-5" />
                Media, Links & Docs
                <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
              </Button>

              {/* Group Info */}
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12"
                disabled
              >
                <Info className="w-5 h-5" />
                Group Info
              </Button>
            </div>

            {/* Members Section */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
                {group.members.length} Members
              </h3>
              <div className="space-y-1">
                {group.members.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => onMemberClick(member)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br",
                        member.avatarColor
                      )}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">
                          {member.name}
                        </span>
                        {member.isAdmin && (
                          <span className="px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded">
                            Admin
                          </span>
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-xs",
                          member.isOnline ? "text-online" : "text-muted-foreground"
                        )}
                      >
                        {member.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onClearChat}
              >
                <Trash2 className="w-5 h-5" />
                Clear Chat
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onReportGroup}
              >
                <Flag className="w-5 h-5" />
                Report Group
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onLeaveGroup}
              >
                <LogOut className="w-5 h-5" />
                Leave Group
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default GroupOptionsSheet;
