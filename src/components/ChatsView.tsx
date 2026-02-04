import { useState } from "react";
import { Search, Pin, BellOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/hooks/useChatStore";
import ChatDetailView from "./chats/ChatDetailView";

interface ChatsViewProps {
  openChatId?: number | null;
  onShowUserOnMap?: (user: { id: number; name: string; x?: number; y?: number }) => void;
}

const ChatsView = ({ openChatId, onShowUserOnMap }: ChatsViewProps) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(openChatId || null);
  const [searchQuery, setSearchQuery] = useState("");
  const { conversations, getConversation } = useChatStore();

  const selectedConversation = selectedChatId ? getConversation(selectedChatId) : null;

  const filteredConversations = conversations.filter((c) =>
    c.contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowOnMap = (user: { id: number; name: string; x?: number; y?: number }) => {
    if (onShowUserOnMap) {
      onShowUserOnMap(user);
    }
    setSelectedChatId(null);
  };

  // Show chat detail if a conversation is selected
  if (selectedConversation) {
    return (
      <ChatDetailView
        conversation={selectedConversation}
        onBack={() => setSelectedChatId(null)}
        onShowOnMap={handleShowOnMap}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 px-4 py-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Chats</h1>
        <p className="text-muted-foreground text-sm mb-3">Your connections</p>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 rounded-full bg-muted border-0"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="p-4 space-y-2">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No conversations yet
          </div>
        ) : (
          filteredConversations.map((chat, index) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors animate-fade-in text-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <div className="relative">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br",
                    chat.contact.avatarColor
                  )}
                >
                  {chat.contact.name.charAt(0)}
                </div>
                {chat.contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-online rounded-full border-2 border-card" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{chat.contact.name}</h3>
                    {chat.isPinned && (
                      <Pin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    )}
                    {chat.isMuted && (
                      <BellOff className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{chat.lastMessageTime}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage || "No messages yet"}</p>
              </div>

              {/* Unread Badge */}
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold flex-shrink-0">
                  {chat.unread}
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatsView;
