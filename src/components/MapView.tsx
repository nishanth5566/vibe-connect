import { useState } from "react";
import PersonCard from "./PersonCard";
import { cn } from "@/lib/utils";

// Mock data for nearby people
const nearbyPeople = [
  { id: 1, name: "Alex Chen", distance: "0.3 km away", vibe: "Cafés", x: 75, y: 70, color: "person-purple" },
  { id: 2, name: "Sarah Kim", distance: "0.5 km away", vibe: "Music", x: 65, y: 55, color: "person-cyan" },
  { id: 3, name: "Jordan Lee", distance: "0.8 km away", vibe: "Gaming", x: 85, y: 45, color: "person-pink" },
  { id: 4, name: "Maya Patel", distance: "1.2 km away", vibe: "Fitness", x: 80, y: 65, color: "person-cyan" },
];

interface MapViewProps {
  onOpenChat: (personId: number) => void;
}

const MapView = ({ onOpenChat }: MapViewProps) => {
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const currentPerson = nearbyPeople[currentPersonIndex];
  const onlineCount = nearbyPeople.length;

  const handleNext = () => {
    setCurrentPersonIndex((prev) => (prev + 1) % nearbyPeople.length);
  };

  const handleChat = () => {
    onOpenChat(currentPerson.id);
  };

  return (
    <div className="relative h-full w-full bg-map overflow-hidden">
      {/* Header Card */}
      <div className="absolute top-6 left-4 right-4 z-10">
        <div className="bg-card rounded-2xl shadow-card p-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground text-lg">People near you</h2>
            <p className="text-muted-foreground text-sm">{onlineCount} online now</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            {onlineCount}
          </div>
        </div>
      </div>

      {/* Map Area with Markers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Decorative map pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <path d="M50 200 Q150 100 200 200 T350 200" stroke="hsl(var(--border))" strokeWidth="2" fill="none"/>
            <path d="M100 150 Q200 250 300 150" stroke="hsl(var(--border))" strokeWidth="1" fill="none"/>
            <path d="M80 280 Q180 180 320 280" stroke="hsl(var(--border))" strokeWidth="1" fill="none"/>
          </svg>
        </div>

        {/* Person Markers */}
        {nearbyPeople.map((person, index) => (
          <button
            key={person.id}
            onClick={() => setCurrentPersonIndex(index)}
            className={cn(
              "absolute w-8 h-8 rounded-full transition-all duration-300 person-marker",
              person.color === "person-purple" && "bg-person-purple",
              person.color === "person-cyan" && "bg-person-cyan",
              person.color === "person-pink" && "bg-person-pink",
              currentPersonIndex === index && "scale-125 ring-4 ring-white"
            )}
            style={{
              left: `${person.x}%`,
              top: `${person.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Bottom Person Card */}
      <div className="absolute bottom-24 left-4 right-4 z-10">
        <PersonCard
          name={currentPerson.name}
          distance={currentPerson.distance}
          vibe={currentPerson.vibe}
          avatarColor="bg-gradient-to-br from-amber-400 to-orange-500"
          onChat={handleChat}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default MapView;