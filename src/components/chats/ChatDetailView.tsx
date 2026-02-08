import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, MoreVertical, Image, Paperclip, Check, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Conversation, useChatStore } from "@/hooks/useChatStore";
import ChatOptionsSheet from "./ChatOptionsSheet";
import ContactProfileSheet from "./ContactProfileSheet";
import DeleteChatDialog from "./DeleteChatDialog";
import ReportUserDialog from "../explore/ReportUserDialog";
import { useToast } from "@/hooks/use-toast";
interface ChatDetailViewProps {
  conversation: Conversation;
  onBack: () => void;
  onShowOnMap: (contact: { id: number; name: string; x?: number; y?: number }) => void;
}

const ChatDetailView = ({ conversation, onBack, onShowOnMap }: ChatDetailViewProps) => {
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const {
    sendMessage,
    deleteConversation,
    clearChat,
    muteConversation,
    pinConversation,
    archiveConversation,
    blockContact,
    markAsRead,
    getConversation,
  } = useChatStore();

  const currentConversation = getConversation(conversation.id) || conversation;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation.messages]);

  useEffect(() => {
    // Mark messages as read when viewing chat
    markAsRead(conversation.id);
  }, [conversation.id, markAsRead]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(conversation.id, message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    clearChat(conversation.id);
    toast({
      title: "Chat cleared",
      description: "All messages have been deleted",
    });
    setShowOptions(false);
  };

  const handleDeleteChat = () => {
    deleteConversation(conversation.id);
    toast({
      title: "Chat deleted",
      description: `Conversation with ${conversation.contact.name} has been deleted`,
    });
    onBack();
  };

  const handleBlockUser = () => {
    blockContact({ id: conversation.contact.id, name: conversation.contact.name });
    toast({
      title: "User blocked",
      description: `${conversation.contact.name} has been blocked`,
    });
    onBack();
  };

  const handleReportUser = (reason: string) => {
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe",
    });
    setShowReportDialog(false);
    setShowOptions(false);
  };

  const handleShowOnMap = () => {
    onShowOnMap({
      id: conversation.contact.id,
      name: conversation.contact.name,
      x: 50 + Math.random() * 30,
      y: 40 + Math.random() * 30,
    });
    setShowOptions(false);
    setShowProfile(false);
  };

  const handleArchive = () => {
    archiveConversation(conversation.id);
    toast({
      title: "Chat archived",
      description: "You can find it in archived chats",
    });
    onBack();
  };

  const handleMediaUpload = () => {
    toast({
      title: "Coming soon",
      description: "Media sharing will be available soon",
    });
  };


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

        {/* Tappable Profile */}
        <button
          onClick={() => setShowProfile(true)}
          className="flex items-center gap-3 flex-1 text-left"
        >
          <div className="relative">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br",
                conversation.contact.avatarColor
              )}
            >
              {conversation.contact.name.charAt(0)}
            </div>
            {conversation.contact.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-online rounded-full border-2 border-card" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{conversation.contact.name}</h3>
            <p className="text-xs text-muted-foreground">
              {conversation.contact.online
                ? conversation.contact.status || "Online"
                : `Last seen ${conversation.contact.lastSeen || "recently"}`}
            </p>
          </div>
        </button>

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
        {currentConversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : (
          currentConversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex", msg.sent ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[75%] px-4 py-2.5 rounded-2xl",
                  msg.sent
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                )}
              >
                <p className="text-sm">{msg.text}</p>
                <div className={cn(
                  "flex items-center gap-1 mt-1",
                  msg.sent ? "justify-end" : "justify-start"
                )}>
                  <p
                    className={cn(
                      "text-xs",
                      msg.sent ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {msg.time}
                  </p>
                  {msg.sent && (
                    msg.read ? (
                      <CheckCheck className={cn(
                        "w-3.5 h-3.5",
                        "text-primary-foreground/70"
                      )} />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-primary-foreground/70" />
                    )
                  )}
                </div>
              </div>
            </div>
          ))
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

      {/* Options Sheet */}
      <ChatOptionsSheet
        open={showOptions}
        onOpenChange={setShowOptions}
        conversation={currentConversation}
        onMuteToggle={(muted) => {
          muteConversation(conversation.id, muted);
          toast({
            title: muted ? "Notifications muted" : "Notifications unmuted",
          });
        }}
        onPinToggle={(pinned) => {
          pinConversation(conversation.id, pinned);
          toast({
            title: pinned ? "Chat pinned" : "Chat unpinned",
          });
          setShowOptions(false);
        }}
        onClearChat={handleClearChat}
        onDeleteChat={() => {
          setShowOptions(false);
          setShowDeleteDialog(true);
        }}
        onBlockUser={handleBlockUser}
        onReportUser={() => {
          setShowOptions(false);
          setShowReportDialog(true);
        }}
        onShowOnMap={handleShowOnMap}
        onArchive={handleArchive}
      />

      {/* Profile Sheet */}
      <ContactProfileSheet
        open={showProfile}
        onOpenChange={setShowProfile}
        contact={conversation.contact}
        isMuted={currentConversation.isMuted}
        onMessage={() => setShowProfile(false)}
        onShowOnMap={handleShowOnMap}
        onBlock={handleBlockUser}
        onReport={() => {
          setShowProfile(false);
          setShowReportDialog(true);
        }}
        onMuteToggle={() => {
          muteConversation(conversation.id, !currentConversation.isMuted);
          toast({
            title: currentConversation.isMuted ? "Notifications unmuted" : "Notifications muted",
          });
        }}
      />

      {/* Delete Dialog */}
      <DeleteChatDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        contactName={conversation.contact.name}
        onConfirm={handleDeleteChat}
      />

      {/* Report Dialog */}
      <ReportUserDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        userName={conversation.contact.name}
        onReport={handleReportUser}
      />
    </div>
  );
};

export default ChatDetailView;
