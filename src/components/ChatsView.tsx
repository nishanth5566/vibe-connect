import { useState } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock chat data
const conversations = [
  {
    id: 1,
    name: "Alex Chen",
    lastMessage: "Hey! Want to grab coffee later?",
    time: "2m ago",
    unread: 2,
    online: true,
    avatarColor: "from-amber-400 to-orange-500",
  },
  {
    id: 2,
    name: "Sarah Kim",
    lastMessage: "That concert was amazing! 🎵",
    time: "15m ago",
    unread: 0,
    online: true,
    avatarColor: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    name: "Jordan Lee",
    lastMessage: "GG! Let's play again tomorrow",
    time: "1h ago",
    unread: 0,
    online: false,
    avatarColor: "from-green-400 to-emerald-500",
  },
  {
    id: 4,
    name: "Maya Patel",
    lastMessage: "See you at the gym at 7!",
    time: "3h ago",
    unread: 1,
    online: false,
    avatarColor: "from-blue-400 to-cyan-500",
  },
];

// Mock messages for chat detail
const mockMessages = [
  { id: 1, text: "Hey! I saw you're into cafés too 😊", sent: false, time: "10:30 AM" },
  { id: 2, text: "Yes! I love finding new spots", sent: true, time: "10:32 AM" },
  { id: 3, text: "Have you tried the new place on Main St?", sent: false, time: "10:33 AM" },
  { id: 4, text: "Not yet! Is it good?", sent: true, time: "10:35 AM" },
  { id: 5, text: "Hey! Want to grab coffee later?", sent: false, time: "10:40 AM" },
];

interface ChatsViewProps {
  openChatId?: number | null;
}

const ChatsView = ({ openChatId }: ChatsViewProps) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(openChatId || null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedConversation = conversations.find((c) => c.id === selectedChat);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedChat && selectedConversation) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
          <button
            onClick={() => setSelectedChat(null)}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br",
              selectedConversation.avatarColor
            )}
          >
            {selectedConversation.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{selectedConversation.name}</h3>
            <p className="text-xs text-muted-foreground">
              {selectedConversation.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sent ? "justify-end" : "justify-start"
              )}
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
                <p
                  className={cn(
                    "text-xs mt-1",
                    msg.sent ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card mb-20">
          <div className="flex items-center gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-muted border-0"
            />
            <button
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
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
        {filteredConversations.map((chat, index) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors animate-fade-in text-left"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Avatar */}
            <div className="relative">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br",
                  chat.avatarColor
                )}
              >
                {chat.name.charAt(0)}
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-online rounded-full border-2 border-card" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>

            {/* Unread Badge */}
            {chat.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                {chat.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatsView;