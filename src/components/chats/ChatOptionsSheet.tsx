import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  BellOff,
  Bell,
  Trash2,
  Ban,
  Flag,
  Pin,
  PinOff,
  Archive,
  MapPin,
  Eraser,
} from "lucide-react";
import { Conversation } from "@/hooks/useChatStore";

interface ChatOptionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversation: Conversation;
  onMuteToggle: (muted: boolean) => void;
  onPinToggle: (pinned: boolean) => void;
  onClearChat: () => void;
  onDeleteChat: () => void;
  onBlockUser: () => void;
  onReportUser: () => void;
  onShowOnMap: () => void;
  onArchive: () => void;
}

const ChatOptionsSheet = ({
  open,
  onOpenChange,
  conversation,
  onMuteToggle,
  onPinToggle,
  onClearChat,
  onDeleteChat,
  onBlockUser,
  onReportUser,
  onShowOnMap,
  onArchive,
}: ChatOptionsSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader className="pb-4">
          <SheetTitle>Chat Options</SheetTitle>
        </SheetHeader>

        <div className="space-y-2">
          {/* Mute */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              {conversation.isMuted ? (
                <Bell className="w-5 h-5 text-muted-foreground" />
              ) : (
                <BellOff className="w-5 h-5 text-muted-foreground" />
              )}
              <span>Mute notifications</span>
            </div>
            <Switch
              checked={conversation.isMuted}
              onCheckedChange={onMuteToggle}
            />
          </div>

          {/* Pin */}
          <button
            onClick={() => onPinToggle(!conversation.isPinned)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
          >
            {conversation.isPinned ? (
              <PinOff className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Pin className="w-5 h-5 text-muted-foreground" />
            )}
            <span>{conversation.isPinned ? "Unpin chat" : "Pin chat"}</span>
          </button>

          {/* Show on Map */}
          <button
            onClick={onShowOnMap}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
          >
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span>Show on map</span>
          </button>

          {/* Archive */}
          <button
            onClick={onArchive}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
          >
            <Archive className="w-5 h-5 text-muted-foreground" />
            <span>Archive chat</span>
          </button>

          {/* Clear Chat */}
          <button
            onClick={onClearChat}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
          >
            <Eraser className="w-5 h-5 text-muted-foreground" />
            <span>Clear chat history</span>
          </button>

          <div className="h-px bg-border my-2" />

          {/* Block */}
          <button
            onClick={onBlockUser}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left text-destructive"
          >
            <Ban className="w-5 h-5" />
            <span>Block {conversation.contact.name}</span>
          </button>

          {/* Report */}
          <button
            onClick={onReportUser}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left text-destructive"
          >
            <Flag className="w-5 h-5" />
            <span>Report {conversation.contact.name}</span>
          </button>

          {/* Delete */}
          <button
            onClick={onDeleteChat}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left text-destructive"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete chat</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatOptionsSheet;
