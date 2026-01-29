import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import MapView from "@/components/MapView";
import ExploreView from "@/components/ExploreView";
import ChatsView from "@/components/ChatsView";
import ProfileView from "@/components/ProfileView";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"map" | "explore" | "chats" | "profile">("map");
  const [openChatId, setOpenChatId] = useState<number | null>(null);

  const handleOpenChat = (personId: number) => {
    setOpenChatId(personId);
    setActiveTab("chats");
  };

  const handleTabChange = (tab: "map" | "explore" | "chats" | "profile") => {
    setActiveTab(tab);
    if (tab !== "chats") {
      setOpenChatId(null);
    }
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-background overflow-hidden relative">
      {/* Main Content */}
      <main className="h-full">
        {activeTab === "map" && <MapView onOpenChat={handleOpenChat} />}
        {activeTab === "explore" && <ExploreView />}
        {activeTab === "chats" && <ChatsView openChatId={openChatId} />}
        {activeTab === "profile" && <ProfileView />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;