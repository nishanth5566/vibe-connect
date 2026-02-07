import { useState } from "react";
import { Users, LogIn, BellOff, Plus, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGroupStore, GroupMember } from "@/hooks/useGroupStore";
import GroupChatView from "./explore/GroupChatView";
import CreateGroupSheet from "./explore/CreateGroupSheet";
import { useToast } from "@/hooks/use-toast";

interface ExploreViewProps {
  onShowUserOnMap?: (user: GroupMember) => void;
}

const ExploreView = ({ onShowUserOnMap }: ExploreViewProps) => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [userDistanceKm] = useState(() => Math.random() * 3); // Simulated user distance from group creators (0-3km)
  const { groups, joinGroup, getGroup, createGroup, getVisibleGroups } = useGroupStore();
  const { toast } = useToast();

  const selectedGroup = selectedGroupId ? getGroup(selectedGroupId) : null;

  // Filter groups based on visibility radius
  // Default groups are always visible, user-created groups only if within their radius
  const visibleGroups = getVisibleGroups(userDistanceKm);

  const handleJoinGroup = (groupId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    joinGroup(groupId);
    toast({
      title: "Joined group!",
      description: "You can now chat with other members",
    });
  };

  const handleOpenGroup = (groupId: number) => {
    const group = getGroup(groupId);
    if (group?.isJoined) {
      setSelectedGroupId(groupId);
    }
  };

  const handleShowUserOnMap = (user: GroupMember) => {
    if (onShowUserOnMap) {
      onShowUserOnMap(user);
    }
    setSelectedGroupId(null);
  };

  const handleCreateGroup = (groupData: {
    name: string;
    description: string;
    vibe: string;
    radiusKm: number;
    profileImage?: string;
  }) => {
    createGroup(groupData);
    toast({
      title: "Group created!",
      description: `${groupData.name} is now visible to users within ${groupData.radiusKm}km`,
    });
  };

  const formatRadius = (km?: number) => {
    if (!km) return null;
    if (km < 1) return `${Math.round(km * 1000)}m`;
    return `${km}km`;
  };

  // Show group chat if a joined group is selected
  if (selectedGroup && selectedGroup.isJoined) {
    return (
      <GroupChatView
        group={selectedGroup}
        onBack={() => setSelectedGroupId(null)}
        onShowUserOnMap={handleShowUserOnMap}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 px-4 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Explore</h1>
            <p className="text-muted-foreground text-sm">Groups based on your vibes</p>
          </div>
          <Button
            onClick={() => setShowCreateSheet(true)}
            size="sm"
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="p-4 space-y-4">
        {visibleGroups.map((group, index) => (
          <button
            key={group.id}
            onClick={() => group.isJoined && handleOpenGroup(group.id)}
            className={cn(
              "w-full bg-card rounded-2xl p-4 shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in text-left",
              group.isJoined && "cursor-pointer",
              !group.isJoined && "cursor-default"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              {/* Icon/Profile Image */}
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br relative overflow-hidden",
                group.gradient
              )}>
                {group.profileImage ? (
                  <img
                    src={group.profileImage}
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-7 h-7 text-primary-foreground" />
                )}
                {group.isMuted && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                    <BellOff className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-lg truncate">{group.name}</h3>
                <p className="text-muted-foreground text-sm truncate">{group.description}</p>
              </div>

              {/* Join/Open Button */}
              {group.isJoined ? (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">{group.members.length}</span>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={(e) => handleJoinGroup(group.id, e)}
                  className="gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  Join
                </Button>
              )}
            </div>

            {/* Vibe Tag & Radius */}
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-vibe-tag text-vibe-tag-text">
                {group.vibe}
              </span>
              {group.radiusKm && !group.isDefault && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {formatRadius(group.radiusKm)}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {group.members.length} people nearby
              </span>
              {group.isJoined && (
                <span className="ml-auto text-xs text-primary font-medium">
                  Joined ✓
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Create Group Sheet */}
      <CreateGroupSheet
        open={showCreateSheet}
        onOpenChange={setShowCreateSheet}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
};

export default ExploreView;
