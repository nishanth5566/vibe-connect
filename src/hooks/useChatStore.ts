import { useCallback, useSyncExternalStore } from "react";

export interface ChatContact {
  id: number;
  name: string;
  avatarColor: string;
  online: boolean;
  lastSeen?: string;
  status?: string;
  bio?: string;
  vibes?: string[];
  location?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sent: boolean;
  time: string;
  read: boolean;
  type: "text" | "image" | "file";
  mediaUrl?: string;
}

export interface Conversation {
  id: number;
  contact: ChatContact;
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  isMuted: boolean;
  isPinned: boolean;
  isArchived: boolean;
}

interface ChatStoreState {
  conversations: Conversation[];
  blockedContacts: { id: number; name: string; blockedAt: string }[];
}

const STORAGE_KEY = "radius_chat_store";

const defaultConversations: Conversation[] = [
  {
    id: 1,
    contact: {
      id: 101,
      name: "Alex Chen",
      avatarColor: "from-amber-400 to-orange-500",
      online: true,
      status: "Finding the best coffee spots ☕",
      bio: "Coffee enthusiast & tech lover. Always exploring new cafés!",
      vibes: ["Cafés", "Tech", "Photography"],
      location: "Downtown",
    },
    messages: [
      { id: "m1", text: "Hey! I saw you're into cafés too 😊", sent: false, time: "10:30 AM", read: true, type: "text" },
      { id: "m2", text: "Yes! I love finding new spots", sent: true, time: "10:32 AM", read: true, type: "text" },
      { id: "m3", text: "Have you tried the new place on Main St?", sent: false, time: "10:33 AM", read: true, type: "text" },
      { id: "m4", text: "Not yet! Is it good?", sent: true, time: "10:35 AM", read: true, type: "text" },
      { id: "m5", text: "Hey! Want to grab coffee later?", sent: false, time: "10:40 AM", read: false, type: "text" },
    ],
    lastMessage: "Hey! Want to grab coffee later?",
    lastMessageTime: "2m ago",
    unread: 2,
    isMuted: false,
    isPinned: true,
    isArchived: false,
  },
  {
    id: 2,
    contact: {
      id: 102,
      name: "Sarah Kim",
      avatarColor: "from-purple-400 to-pink-500",
      online: true,
      status: "Music is life 🎵",
      bio: "Concert lover, indie rock fan. Let's discover new bands together!",
      vibes: ["Music", "Concerts", "Vinyl"],
      location: "Arts District",
    },
    messages: [
      { id: "m1", text: "OMG that concert was so good!", sent: false, time: "8:00 PM", read: true, type: "text" },
      { id: "m2", text: "I know right! The encore was amazing", sent: true, time: "8:02 PM", read: true, type: "text" },
      { id: "m3", text: "That concert was amazing! 🎵", sent: false, time: "8:15 PM", read: true, type: "text" },
    ],
    lastMessage: "That concert was amazing! 🎵",
    lastMessageTime: "15m ago",
    unread: 0,
    isMuted: false,
    isPinned: false,
    isArchived: false,
  },
  {
    id: 3,
    contact: {
      id: 103,
      name: "Jordan Lee",
      avatarColor: "from-green-400 to-emerald-500",
      online: false,
      lastSeen: "30 minutes ago",
      status: "Gaming & chilling 🎮",
      bio: "Pro gamer wannabe. Always down for co-op!",
      vibes: ["Gaming", "Esports", "Streaming"],
      location: "Midtown",
    },
    messages: [
      { id: "m1", text: "That was an intense match!", sent: true, time: "9:00 PM", read: true, type: "text" },
      { id: "m2", text: "GG! Let's play again tomorrow", sent: false, time: "9:05 PM", read: true, type: "text" },
    ],
    lastMessage: "GG! Let's play again tomorrow",
    lastMessageTime: "1h ago",
    unread: 0,
    isMuted: false,
    isPinned: false,
    isArchived: false,
  },
  {
    id: 4,
    contact: {
      id: 104,
      name: "Maya Patel",
      avatarColor: "from-blue-400 to-cyan-500",
      online: false,
      lastSeen: "2 hours ago",
      status: "Fitness journey 💪",
      bio: "Gym rat & yoga instructor. Health is wealth!",
      vibes: ["Fitness", "Yoga", "Nutrition"],
      location: "Uptown",
    },
    messages: [
      { id: "m1", text: "Great workout today!", sent: true, time: "6:00 PM", read: true, type: "text" },
      { id: "m2", text: "See you at the gym at 7!", sent: false, time: "6:30 PM", read: false, type: "text" },
    ],
    lastMessage: "See you at the gym at 7!",
    lastMessageTime: "3h ago",
    unread: 1,
    isMuted: false,
    isPinned: false,
    isArchived: false,
  },
];

const getInitialState = (): ChatStoreState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    conversations: defaultConversations,
    blockedContacts: [],
  };
};

// Global store singleton
let globalState: ChatStoreState = getInitialState();
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => globalState;

const setState = (updater: (prev: ChatStoreState) => ChatStoreState) => {
  globalState = updater(globalState);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
  listeners.forEach((listener) => listener());
};

export const useChatStore = () => {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const sendMessage = useCallback((conversationId: number, text: string) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: `m${Date.now()}`,
                  text,
                  sent: true,
                  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  read: false,
                  type: "text" as const,
                },
              ],
              lastMessage: text,
              lastMessageTime: "Just now",
            }
          : conv
      ),
    }));
  }, []);

  const deleteConversation = useCallback((conversationId: number) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.filter((conv) => conv.id !== conversationId),
    }));
  }, []);

  const clearChat = useCallback((conversationId: number) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, messages: [], lastMessage: "", unread: 0 }
          : conv
      ),
    }));
  }, []);

  const muteConversation = useCallback((conversationId: number, muted: boolean) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, isMuted: muted } : conv
      ),
    }));
  }, []);

  const pinConversation = useCallback((conversationId: number, pinned: boolean) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, isPinned: pinned } : conv
      ),
    }));
  }, []);

  const archiveConversation = useCallback((conversationId: number) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, isArchived: true } : conv
      ),
    }));
  }, []);

  const blockContact = useCallback((contact: { id: number; name: string }) => {
    setState((prev) => ({
      ...prev,
      blockedContacts: [
        ...prev.blockedContacts.filter((c) => c.id !== contact.id),
        { ...contact, blockedAt: new Date().toISOString() },
      ],
      conversations: prev.conversations.filter(
        (conv) => conv.contact.id !== contact.id
      ),
    }));
  }, []);

  const unblockContact = useCallback((contactId: number) => {
    setState((prev) => ({
      ...prev,
      blockedContacts: prev.blockedContacts.filter((c) => c.id !== contactId),
    }));
  }, []);

  const isContactBlocked = useCallback((contactId: number) => {
    return state.blockedContacts.some((c) => c.id === contactId);
  }, [state.blockedContacts]);

  const markAsRead = useCallback((conversationId: number) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              unread: 0,
              messages: conv.messages.map((m) => ({ ...m, read: true })),
            }
          : conv
      ),
    }));
  }, []);

  const getConversation = useCallback((conversationId: number) => {
    return state.conversations.find((c) => c.id === conversationId);
  }, [state.conversations]);

  // Sort conversations: pinned first, then by time
  const sortedConversations = [...state.conversations]
    .filter((c) => !c.isArchived)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  return {
    conversations: sortedConversations,
    blockedContacts: state.blockedContacts,
    sendMessage,
    deleteConversation,
    clearChat,
    muteConversation,
    pinConversation,
    archiveConversation,
    blockContact,
    unblockContact,
    isContactBlocked,
    markAsRead,
    getConversation,
  };
};
