import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, MoreVertical, Image, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Group, GroupMember, GroupMessage, useGroupStore } from "@/hooks/useGroupStore";
import GroupOptionsSheet from "./GroupOptionsSheet";
import UserProfileSheet from "./UserProfileSheet";
import ReportUserDialog from "./ReportUserDialog";
import ReportGroupDialog from "./ReportGroupDialog";
import { useToast } from "@/hooks/use-toast";

interface GroupChatViewProps {
  group: Group;
  onBack: () => void;
  onShowUserOnMap: (user: GroupMember) => void;
}

const GroupChatView = ({ group, onBack, onShowUserOnMap }: GroupChatViewProps) => {
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showReportGroupDialog, setShowReportGroupDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const {
    muteGroup,
    clearGroupChat,
    leaveGroup,
    sendMessage,
    blockUser,
    unblockUser,
    reportUser,
    isUserBlocked,
    getGroup,
  } = useGroupStore();

  const currentGroup = getGroup(group.id) || group;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentGroup.messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const profile = localStorage.getItem("radius_profile");
    const userName = profile ? JSON.parse(profile).name : "You";

    sendMessage(group.id, {
      senderId: 0, // Current user
      senderName: userName,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    });
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMemberClick = (member: GroupMember) => {
    setSelectedMember(member);
    setShowOptions(false);
  };

  const handleBlockUser = () => {
    if (selectedMember) {
      blockUser({ id: selectedMember.id, name: selectedMember.name });
      toast({
        title: "User blocked",
        description: `${selectedMember.name} has been blocked`,
      });
      setSelectedMember(null);
    }
  };

  const handleUnblockUser = () => {
    if (selectedMember) {
      unblockUser(selectedMember.id);
      toast({
        title: "User unblocked",
        description: `${selectedMember.name} has been unblocked`,
      });
      setSelectedMember(null);
    }
  };

  const handleReportUser = (reason: string) => {
    if (selectedMember) {
      reportUser(selectedMember.id, reason);
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe",
      });
      setSelectedMember(null);
    }
  };

  const handleShowOnMap = () => {
    if (selectedMember) {
      onShowUserOnMap(selectedMember);
      setSelectedMember(null);
    }
  };

  const handleClearChat = () => {
    clearGroupChat(group.id);
    toast({
      title: "Chat cleared",
      description: "All messages have been deleted",
    });
    setShowOptions(false);
  };

  const handleLeaveGroup = () => {
    leaveGroup(group.id);
    toast({
      title: "Left group",
      description: `You left ${group.name}`,
    });
    onBack();
  };

  const handleReportGroup = (reason: string) => {
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe",
    });
    setShowReportGroupDialog(false);
    setShowOptions(false);
  };

  const handleMediaUpload = () => {
    toast({
      title: "Coming soon",
      description: "Media sharing will be available soon",
    });
  };

  // Filter out messages from blocked users
  const visibleMessages = currentGroup.messages.filter(
    (msg) => !isUserBlocked(msg.senderId)
  );

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br",
            group.gradient
          )}
        >
          <span className="text-white font-bold text-sm">
            {group.name.charAt(0)}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{group.name}</h3>
          <p className="text-xs text-muted-foreground">
            {group.members.length} members
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowOptions(true)}
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {visibleMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : (
          visibleMessages.map((msg) => {
            const isMe = msg.senderId === 0;
            const member = group.members.find((m) => m.id === msg.senderId);

            return (
              <div
                key={msg.id}
                className={cn("flex", isMe ? "justify-end" : "justify-start")}
              >
                {!isMe && (
                  <button
                    onClick={() => member && handleMemberClick(member)}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold mr-2 flex-shrink-0 bg-gradient-to-br",
                      member?.avatarColor || "from-muted-foreground to-muted"
                    )}
                  >
                    {msg.senderName.charAt(0)}
                  </button>
                )}
                <div
                  className={cn(
                    "max-w-[75%] px-4 py-2.5 rounded-2xl",
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
                  {!isMe && (
                    <p
                      className={cn(
                        "text-xs font-medium mb-1",
                        member?.isAdmin ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {msg.senderName}
                      {member?.isAdmin && " · Admin"}
                    </p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card mb-20">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={handleMediaUpload}
          >
            <Image className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={handleMediaUpload}
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-muted border-0"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Group Options Sheet */}
      <GroupOptionsSheet
        open={showOptions}
        onOpenChange={setShowOptions}
        group={currentGroup}
        onMuteToggle={(muted) => muteGroup(group.id, muted)}
        onClearChat={handleClearChat}
        onLeaveGroup={handleLeaveGroup}
        onMemberClick={handleMemberClick}
        onReportGroup={() => setShowReportGroupDialog(true)}
      />

      {/* User Profile Sheet */}
      <UserProfileSheet
        open={!!selectedMember}
        onOpenChange={(open) => !open && setSelectedMember(null)}
        user={selectedMember}
        isBlocked={selectedMember ? isUserBlocked(selectedMember.id) : false}
        onBlock={handleBlockUser}
        onUnblock={handleUnblockUser}
        onReport={() => setShowReportDialog(true)}
        onShowOnMap={handleShowOnMap}
        onMessage={() => {
          toast({
            title: "Coming soon",
            description: "Direct messages will be available soon",
          });
          setSelectedMember(null);
        }}
      />

      {/* Report User Dialog */}
      <ReportUserDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        userName={selectedMember?.name || ""}
        onReport={handleReportUser}
      />

      {/* Report Group Dialog */}
      <ReportGroupDialog
        open={showReportGroupDialog}
        onOpenChange={setShowReportGroupDialog}
        groupName={group.name}
        onReport={handleReportGroup}
      />
    </div>
  );
};

export default GroupChatView;
