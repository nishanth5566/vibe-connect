import { useState } from "react";
import { Settings, Edit3, LogOut, MapPin, Briefcase, Heart, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/pages/MainApp";
import { vibeOptions } from "@/data/vibes";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SettingsSheet from "@/components/SettingsSheet";
import VerifiedBadge from "@/components/VerifiedBadge";

interface ProfileViewProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

const ProfileView = ({ userProfile, onLogout }: ProfileViewProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  
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
        {/* Cover Gradient with animated orbs */}
        <div className="h-36 gradient-primary relative overflow-hidden">
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-4 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute bottom-4 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          />
        </div>
        
        {/* Settings Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSettingsOpen(true)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
        
        <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} onLogout={onLogout} />

        {/* Avatar */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="absolute left-1/2 -translate-x-1/2 -bottom-14"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 -m-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-50 blur-md" />
            
            <Avatar className="w-28 h-28 ring-4 ring-background shadow-xl">
              {userProfile.photo ? (
                <AvatarImage src={userProfile.photo} alt={userProfile.name} className="object-cover" />
              ) : null}
              <AvatarFallback className="gradient-primary text-primary-foreground text-3xl font-bold">
                {userProfile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            {/* Verified indicator */}
            <div className="absolute bottom-1 right-1">
              <VerifiedBadge size="md" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Profile Content */}
      <div className="pt-18 px-4" style={{ paddingTop: '4.5rem' }}>
        {/* Name & Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            {userProfile.name}
            <Sparkles className="w-5 h-5 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xs mx-auto">{userProfile.bio}</p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-8 mb-6"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Connections</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Groups</p>
          </div>
        </motion.div>

        {/* Edit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full rounded-full mb-6 h-12" variant="outline">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </motion.div>

        {/* Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-4 shadow-card space-y-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Age</p>
              <p className="font-medium text-foreground">{userProfile.age} years old</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Gender</p>
              <p className="font-medium text-foreground">{getGenderLabel(userProfile.gender)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
              <p className="font-medium text-foreground">{userProfile.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Vibes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl p-4 shadow-card mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">My Vibes</h3>
            <span className="ml-auto text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {vibeLabels.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {vibeLabels.length > 0 ? (
              vibeLabels.map((vibe, i) => (
                <motion.span
                  key={vibe?.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary flex items-center gap-1.5 border border-primary/20"
                >
                  <span className="text-base">{vibe?.emoji}</span>
                  {vibe?.label}
                </motion.span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No vibes selected yet</span>
            )}
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileView;