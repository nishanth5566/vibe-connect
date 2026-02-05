import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import MapView from "@/components/MapView";
import ExploreView from "@/components/ExploreView";
import ChatsView from "@/components/ChatsView";
import ProfileView from "@/components/ProfileView";
import { GroupMember } from "@/hooks/useGroupStore";

export interface UserProfile {
  name: string;
  age: string;
  gender: string;
  bio: string;
  vibes: string[];
  photo: string;
  email: string;
  createdAt: string;
}

const MainApp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"map" | "explore" | "chats" | "profile">("map");
  const [openChatId, setOpenChatId] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [highlightedUser, setHighlightedUser] = useState<GroupMember | null>(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const profileData = localStorage.getItem("radius_profile");
    if (!profileData) {
      navigate("/");
      return;
    }
    setUserProfile(JSON.parse(profileData));
  }, [navigate]);

  const handleOpenChat = (personId: number) => {
    setOpenChatId(personId);
    setActiveTab("chats");
  };

  const handleTabChange = (tab: "map" | "explore" | "chats" | "profile") => {
    setActiveTab(tab);
    if (tab !== "chats") {
      setOpenChatId(null);
    }
    if (tab !== "map") {
      setHighlightedUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("radius_profile");
    localStorage.removeItem("radius_email");
    navigate("/");
  };

   const handleUpdateProfile = (updates: Partial<UserProfile>) => {
     if (!userProfile) return;
     const updated = { ...userProfile, ...updates };
     setUserProfile(updated);
     localStorage.setItem("radius_profile", JSON.stringify(updated));
   };
 
  const handleShowUserOnMap = (user: { id: number; name: string; x?: number; y?: number }) => {
    setHighlightedUser(user as GroupMember);
    setActiveTab("map");
  };

  if (!userProfile) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-background overflow-hidden relative">
      {/* Main Content */}
      <main className="h-full">
        {activeTab === "map" && (
          <MapView onOpenChat={handleOpenChat} highlightedUser={highlightedUser} />
        )}
        {activeTab === "explore" && (
          <ExploreView onShowUserOnMap={handleShowUserOnMap} />
        )}
        {activeTab === "chats" && (
          <ChatsView openChatId={openChatId} onShowUserOnMap={handleShowUserOnMap} />
        )}
        {activeTab === "profile" && (
           <ProfileView 
             userProfile={userProfile} 
             onLogout={handleLogout} 
             onUpdateProfile={handleUpdateProfile}
           />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default MainApp;