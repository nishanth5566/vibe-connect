import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

export interface GroupMember {
  id: number;
  name: string;
  isAdmin: boolean;
  avatarColor: string;
  isOnline: boolean;
  x?: number;
  y?: number;
}

export interface GroupMessage {
  id: string;
  senderId: number;
  senderName: string;
  text: string;
  time: string;
  type: "text" | "image" | "file";
  mediaUrl?: string;
}

export interface Group {
  id: number;
  name: string;
  vibe: string;
  members: GroupMember[];
  messages: GroupMessage[];
  isMuted: boolean;
  isJoined: boolean;
  createdAt: string;
  description: string;
  gradient: string;
  radiusKm?: number; // undefined = default/global group visible to everyone
  isDefault?: boolean; // true = system-created group, visible to all
  creatorId?: number; // who created the group
}

export interface BlockedUser {
  id: number;
  name: string;
  blockedAt: string;
}

interface GroupStoreState {
  groups: Group[];
  blockedUsers: BlockedUser[];
  reportedUsers: { id: number; reason: string; reportedAt: string }[];
}

const STORAGE_KEY = "radius_group_store";

const defaultGroups: Group[] = [
  {
    id: 1,
    name: "Café Lovers",
    vibe: "Cafés",
    description: "Find people who love exploring new cafés",
    gradient: "from-amber-500 to-orange-500",
    isMuted: false,
    isJoined: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
    members: [
      { id: 101, name: "Alex Chen", isAdmin: true, avatarColor: "from-amber-400 to-orange-500", isOnline: true, x: 75, y: 70 },
      { id: 102, name: "Emma Wilson", isAdmin: false, avatarColor: "from-purple-400 to-pink-500", isOnline: true, x: 65, y: 55 },
      { id: 103, name: "Liam Brooks", isAdmin: false, avatarColor: "from-green-400 to-emerald-500", isOnline: false, x: 85, y: 45 },
    ],
    messages: [
      { id: "m1", senderId: 101, senderName: "Alex Chen", text: "Hey everyone! Found a great new café downtown", time: "10:30 AM", type: "text" },
      { id: "m2", senderId: 102, senderName: "Emma Wilson", text: "Where is it? I'd love to check it out! ☕", time: "10:32 AM", type: "text" },
      { id: "m3", senderId: 101, senderName: "Alex Chen", text: "It's on Main Street, called 'The Cozy Bean'", time: "10:35 AM", type: "text" },
    ],
  },
  {
    id: 2,
    name: "Music Enthusiasts",
    vibe: "Music",
    description: "Connect with fellow music lovers",
    gradient: "from-purple-500 to-pink-500",
    isMuted: false,
    isJoined: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
    members: [
      { id: 201, name: "Sarah Kim", isAdmin: true, avatarColor: "from-purple-400 to-pink-500", isOnline: true, x: 40, y: 60 },
      { id: 202, name: "Jordan Lee", isAdmin: false, avatarColor: "from-blue-400 to-cyan-500", isOnline: false, x: 55, y: 35 },
    ],
    messages: [
      { id: "m1", senderId: 201, senderName: "Sarah Kim", text: "Anyone going to the concert this weekend? 🎵", time: "2:00 PM", type: "text" },
    ],
  },
  {
    id: 3,
    name: "Gaming Squad",
    vibe: "Gaming",
    description: "Team up with gamers near you",
    gradient: "from-green-500 to-emerald-500",
    isMuted: false,
    isJoined: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
    members: [
      { id: 301, name: "Jordan Lee", isAdmin: true, avatarColor: "from-green-400 to-emerald-500", isOnline: true, x: 30, y: 50 },
      { id: 302, name: "Noah Garcia", isAdmin: false, avatarColor: "from-amber-400 to-orange-500", isOnline: true, x: 70, y: 40 },
    ],
    messages: [
      { id: "m1", senderId: 301, senderName: "Jordan Lee", text: "GG everyone! Great session tonight", time: "9:00 PM", type: "text" },
    ],
  },
  {
    id: 4,
    name: "Fitness Crew",
    vibe: "Fitness",
    description: "Workout partners in your area",
    gradient: "from-blue-500 to-cyan-500",
    isMuted: false,
    isJoined: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
    members: [
      { id: 401, name: "Maya Patel", isAdmin: true, avatarColor: "from-blue-400 to-cyan-500", isOnline: false, x: 80, y: 65 },
    ],
    messages: [],
  },
  {
    id: 5,
    name: "Book Club",
    vibe: "Reading",
    description: "Share and discuss your favorite reads",
    gradient: "from-rose-500 to-red-500",
    isMuted: false,
    isJoined: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
    members: [
      { id: 501, name: "Liam Brooks", isAdmin: true, avatarColor: "from-rose-400 to-red-500", isOnline: true, x: 25, y: 75 },
    ],
    messages: [],
  },
  {
    id: 6,
    name: "Photography",
    vibe: "Photos",
    description: "Capture moments together",
    gradient: "from-indigo-500 to-violet-500",
    isMuted: false,
    isJoined: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
    members: [
      { id: 601, name: "Emma Wilson", isAdmin: true, avatarColor: "from-indigo-400 to-violet-500", isOnline: true, x: 60, y: 80 },
    ],
    messages: [],
  },
  {
    id: 7,
    name: "Art & Design",
    vibe: "Creative",
    description: "Creative minds unite",
    gradient: "from-fuchsia-500 to-purple-500",
    isMuted: false,
    isJoined: false,
    isDefault: true,
    createdAt: new Date().toISOString(),
    members: [
      { id: 701, name: "Ava Martinez", isAdmin: true, avatarColor: "from-fuchsia-400 to-purple-500", isOnline: false, x: 45, y: 25 },
    ],
    messages: [],
  },
];

const getInitialState = (): GroupStoreState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    groups: defaultGroups,
    blockedUsers: [],
    reportedUsers: [],
  };
};

// Global store singleton
let globalState: GroupStoreState = getInitialState();
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => globalState;

const setState = (updater: (prev: GroupStoreState) => GroupStoreState) => {
  globalState = updater(globalState);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
  listeners.forEach((listener) => listener());
};

export const useGroupStore = () => {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const joinGroup = useCallback((groupId: number) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === groupId ? { ...g, isJoined: true } : g
      ),
    }));
  }, []);

  const leaveGroup = useCallback((groupId: number) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === groupId ? { ...g, isJoined: false } : g
      ),
    }));
  }, []);

  const muteGroup = useCallback((groupId: number, muted: boolean) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === groupId ? { ...g, isMuted: muted } : g
      ),
    }));
  }, []);

  const clearGroupChat = useCallback((groupId: number) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === groupId ? { ...g, messages: [] } : g
      ),
    }));
  }, []);

  const sendMessage = useCallback((groupId: number, message: Omit<GroupMessage, "id">) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === groupId
          ? { ...g, messages: [...g.messages, { ...message, id: `m${Date.now()}` }] }
          : g
      ),
    }));
  }, []);

  const blockUser = useCallback((user: { id: number; name: string }) => {
    setState((prev) => ({
      ...prev,
      blockedUsers: [
        ...prev.blockedUsers.filter((u) => u.id !== user.id),
        { ...user, blockedAt: new Date().toISOString() },
      ],
    }));
  }, []);

  const unblockUser = useCallback((userId: number) => {
    setState((prev) => ({
      ...prev,
      blockedUsers: prev.blockedUsers.filter((u) => u.id !== userId),
    }));
  }, []);

  const reportUser = useCallback((userId: number, reason: string) => {
    setState((prev) => ({
      ...prev,
      reportedUsers: [
        ...prev.reportedUsers.filter((u) => u.id !== userId),
        { id: userId, reason, reportedAt: new Date().toISOString() },
      ],
    }));
  }, []);

  const isUserBlocked = useCallback((userId: number) => {
    return state.blockedUsers.some((u) => u.id === userId);
  }, [state.blockedUsers]);

  const getGroup = useCallback((groupId: number) => {
    return state.groups.find((g) => g.id === groupId);
  }, [state.groups]);

  const createGroup = useCallback((groupData: {
    name: string;
    description: string;
    vibe: string;
    radiusKm: number;
  }) => {
    const vibeGradients: Record<string, string> = {
      "Cafés": "from-amber-500 to-orange-500",
      "Music": "from-purple-500 to-pink-500",
      "Gaming": "from-green-500 to-emerald-500",
      "Fitness": "from-blue-500 to-cyan-500",
      "Reading": "from-rose-500 to-red-500",
      "Photos": "from-indigo-500 to-violet-500",
      "Creative": "from-fuchsia-500 to-purple-500",
      "Food": "from-yellow-500 to-orange-500",
      "Travel": "from-cyan-500 to-blue-500",
      "Tech": "from-gray-500 to-slate-600",
    };

    const profile = localStorage.getItem("radius_profile");
    const userName = profile ? JSON.parse(profile).name : "You";
    
    const newGroup: Group = {
      id: Date.now(),
      name: groupData.name,
      description: groupData.description,
      vibe: groupData.vibe,
      gradient: vibeGradients[groupData.vibe] || "from-primary to-primary/80",
      isMuted: false,
      isJoined: true, // Creator automatically joins
      isDefault: false,
      radiusKm: groupData.radiusKm,
      creatorId: 0, // Current user
      createdAt: new Date().toISOString(),
      members: [
        {
          id: 0,
          name: userName,
          isAdmin: true,
          avatarColor: "from-primary to-primary/80",
          isOnline: true,
        },
      ],
      messages: [],
    };

    setState((prev) => ({
      ...prev,
      groups: [newGroup, ...prev.groups],
    }));

    return newGroup;
  }, []);

  // Get groups filtered by user's radius setting (for user-created groups)
  // A group with radiusKm of X is only visible to users within X km
  // We simulate user distance as a random value for demo purposes
  const getVisibleGroups = useCallback((userDistanceKm: number) => {
    return state.groups.filter((group) => {
      // Default groups are always visible to everyone
      if (group.isDefault) return true;
      // User-created groups: only visible if user is within the group's radius
      // userDistanceKm represents how far the user is from the group creator
      // For demo: we assume user is at a simulated distance
      if (group.radiusKm !== undefined) {
        // User must be within the group's visibility radius
        return userDistanceKm <= group.radiusKm;
      }
      return true;
    });
  }, [state.groups]);

  // Delete a user-created group (only non-default groups can be deleted)
  const deleteGroup = useCallback((groupId: number) => {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.filter((g) => g.id !== groupId || g.isDefault),
    }));
  }, []);

  return {
    groups: state.groups,
    blockedUsers: state.blockedUsers,
    joinGroup,
    leaveGroup,
    muteGroup,
    clearGroupChat,
    sendMessage,
    blockUser,
    unblockUser,
    reportUser,
    isUserBlocked,
    getGroup,
    createGroup,
    getVisibleGroups,
    deleteGroup,
  };
};
