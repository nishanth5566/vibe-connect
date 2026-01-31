import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonCard from "./PersonCard";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { MapPin, Users } from "lucide-react";

// Mock data for nearby people with distances in km
const allPeople = [
  { id: 1, name: "Alex Chen", distanceKm: 0.3, vibe: "Cafés", x: 75, y: 70, color: "person-purple", isVerified: true },
  { id: 2, name: "Sarah Kim", distanceKm: 2.5, vibe: "Music", x: 65, y: 55, color: "person-cyan", isVerified: true },
  { id: 3, name: "Jordan Lee", distanceKm: 8, vibe: "Gaming", x: 85, y: 45, color: "person-pink", isVerified: false },
  { id: 4, name: "Maya Patel", distanceKm: 15, vibe: "Fitness", x: 80, y: 65, color: "person-cyan", isVerified: true },
  { id: 5, name: "Liam Brooks", distanceKm: 25, vibe: "Reading", x: 30, y: 40, color: "person-purple", isVerified: false },
  { id: 6, name: "Emma Wilson", distanceKm: 45, vibe: "Photos", x: 20, y: 60, color: "person-pink", isVerified: true },
  { id: 7, name: "Noah Garcia", distanceKm: 60, vibe: "Creative", x: 40, y: 75, color: "person-cyan", isVerified: true },
  { id: 8, name: "Ava Martinez", distanceKm: 85, vibe: "Music", x: 55, y: 30, color: "person-purple", isVerified: false },
];

interface MapViewProps {
  onOpenChat: (personId: number) => void;
}

const MapView = ({ onOpenChat }: MapViewProps) => {
  const [radius, setRadius] = useState(10);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);

  // Filter people within the selected radius
  const nearbyPeople = allPeople.filter((person) => person.distanceKm <= radius);
  const currentPerson = nearbyPeople[currentPersonIndex] || nearbyPeople[0];
  const onlineCount = nearbyPeople.length;

  const handleNext = () => {
    if (nearbyPeople.length > 0) {
      setCurrentPersonIndex((prev) => (prev + 1) % nearbyPeople.length);
    }
  };

  const handleChat = () => {
    if (currentPerson) {
      onOpenChat(currentPerson.id);
    }
  };

  const handleRadiusChange = (value: number[]) => {
    setRadius(value[0]);
    setCurrentPersonIndex(0);
  };

  const formatDistance = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)}m away`;
    return `${km.toFixed(1)}km away`;
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-background via-secondary/30 to-accent/10 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
          animate={{
            x: ["-20%", "10%", "-20%"],
            y: ["-10%", "20%", "-10%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "-20%", left: "-20%" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-accent/15 to-primary/15 blur-3xl"
          animate={{
            x: ["20%", "-10%", "20%"],
            y: ["10%", "-20%", "10%"],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ bottom: "-10%", right: "-10%" }}
        />
      </div>

      {/* Header Card with Glassmorphism */}
      <div className="absolute top-6 left-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-lg">People near you</h2>
                <p className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-online animate-pulse" />
                  {onlineCount} online within {radius}km
                </p>
              </div>
            </div>
            <motion.div
              key={onlineCount}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow"
            >
              {onlineCount}
            </motion.div>
          </div>

          {/* Radius Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Search Radius</span>
              <motion.span
                key={radius}
                initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                className="font-bold text-foreground"
              >
                {radius} km
              </motion.span>
            </div>
            <div className="relative">
              <Slider
                value={[radius]}
                onValueChange={handleRadiusChange}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                <span>1km</span>
                <span>50km</span>
                <span>100km</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Map Area with Markers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Decorative map pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <path d="M50 200 Q150 100 200 200 T350 200" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
            <path d="M100 150 Q200 250 300 150" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" />
            <path d="M80 280 Q180 180 320 280" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
            <circle cx="200" cy="200" r="80" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" fill="none" />
            <circle cx="200" cy="200" r="120" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
          </svg>
        </div>

        {/* Center point (user location) */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-primary shadow-glow z-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ scale: [1, 3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Radius circle indicator */}
        <motion.div
          className="absolute rounded-full border-2 border-primary/30 border-dashed"
          initial={{ width: 100, height: 100 }}
          animate={{
            width: 50 + radius * 2.5,
            height: 50 + radius * 2.5,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Person Markers */}
        <AnimatePresence>
          {nearbyPeople.map((person, index) => (
            <motion.button
              key={person.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
              onClick={() => setCurrentPersonIndex(index)}
              className={cn(
                "absolute w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center",
                person.color === "person-purple" && "bg-gradient-to-br from-primary to-primary/80",
                person.color === "person-cyan" && "bg-gradient-to-br from-accent to-accent/80",
                person.color === "person-pink" && "bg-gradient-to-br from-person-pink to-person-pink/80",
                currentPersonIndex === index && "ring-4 ring-primary-foreground shadow-glow scale-125 z-10"
              )}
              style={{
                left: `${person.x}%`,
                top: `${person.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-xs font-bold text-primary-foreground">
                {person.name.charAt(0)}
              </span>
              {/* Pulse ring for selected */}
              {currentPersonIndex === index && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/30"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Person Card */}
      <div className="absolute bottom-24 left-4 right-4 z-10">
        <AnimatePresence mode="wait">
          {currentPerson ? (
            <motion.div
              key={currentPerson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <PersonCard
                name={currentPerson.name}
                distance={formatDistance(currentPerson.distanceKm)}
                vibe={currentPerson.vibe}
                avatarColor="bg-gradient-to-br from-primary to-accent"
                isVerified={currentPerson.isVerified}
                onChat={handleChat}
                onNext={handleNext}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No one within {radius}km</p>
              <p className="text-sm text-muted-foreground/70 mt-1">Try increasing your radius</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapView;
