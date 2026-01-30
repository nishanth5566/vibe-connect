import { Settings, Edit3, LogOut, MapPin, Briefcase, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/pages/MainApp";
import { vibeOptions } from "@/data/vibes";

interface ProfileViewProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

const ProfileView = ({ userProfile, onLogout }: ProfileViewProps) => {
  // Get vibes from user profile
  const userVibes = userProfile.vibes || [];
  const vibeLabels = userVibes.map(id => vibeOptions.find(v => v.id === id)).filter(Boolean);

  const getGenderLabel = (gender: string) => {
    const labels: Record<string, string> = {
      male: "Male",
      female: "Female",
      "non-binary": "Non-binary",
      "prefer-not": "Prefer not to say",
    };
    return labels[gender] || gender;
  };

  return (
    <div className="h-full overflow-y-auto pb-24 scroll-smooth">
      {/* Header */}
      <div className="relative">
        {/* Cover Gradient */}
        <div className="h-32 gradient-primary" />
        
        {/* Settings Button */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
          <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-3xl font-bold ring-4 ring-background shadow-lg">
            {userProfile.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-16 px-4">
        {/* Name & Bio */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">{userProfile.name}</h1>
          <p className="text-muted-foreground mt-1 max-w-xs mx-auto">{userProfile.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Connections</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Groups</p>
          </div>
        </div>

        {/* Edit Button */}
        <Button className="w-full rounded-full mb-6" variant="outline">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

        {/* Details */}
        <div className="bg-card rounded-2xl p-4 shadow-card space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Calendar className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium text-foreground">{userProfile.age} years old</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-medium text-foreground">{getGenderLabel(userProfile.gender)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{userProfile.email}</p>
            </div>
          </div>
        </div>

        {/* Vibes */}
        <div className="bg-card rounded-2xl p-4 shadow-card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">My Vibes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {vibeLabels.length > 0 ? (
              vibeLabels.map((vibe) => (
                <span
                  key={vibe?.id}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-vibe-tag text-vibe-tag-text flex items-center gap-1"
                >
                  <span>{vibe?.emoji}</span>
                  {vibe?.label}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No vibes selected yet</span>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default ProfileView;