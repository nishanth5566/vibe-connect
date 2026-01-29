import { Users, Coffee, Music, Gamepad2, Dumbbell, Book, Camera, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock vibe groups data
const vibeGroups = [
  {
    id: 1,
    name: "Café Lovers",
    vibe: "Cafés",
    members: 24,
    icon: Coffee,
    gradient: "from-amber-500 to-orange-500",
    description: "Find people who love exploring new cafés",
  },
  {
    id: 2,
    name: "Music Enthusiasts",
    vibe: "Music",
    members: 42,
    icon: Music,
    gradient: "from-purple-500 to-pink-500",
    description: "Connect with fellow music lovers",
  },
  {
    id: 3,
    name: "Gaming Squad",
    vibe: "Gaming",
    members: 38,
    icon: Gamepad2,
    gradient: "from-green-500 to-emerald-500",
    description: "Team up with gamers near you",
  },
  {
    id: 4,
    name: "Fitness Crew",
    vibe: "Fitness",
    members: 31,
    icon: Dumbbell,
    gradient: "from-blue-500 to-cyan-500",
    description: "Workout partners in your area",
  },
  {
    id: 5,
    name: "Book Club",
    vibe: "Reading",
    members: 19,
    icon: Book,
    gradient: "from-rose-500 to-red-500",
    description: "Share and discuss your favorite reads",
  },
  {
    id: 6,
    name: "Photography",
    vibe: "Photos",
    members: 27,
    icon: Camera,
    gradient: "from-indigo-500 to-violet-500",
    description: "Capture moments together",
  },
  {
    id: 7,
    name: "Art & Design",
    vibe: "Creative",
    members: 22,
    icon: Palette,
    gradient: "from-fuchsia-500 to-purple-500",
    description: "Creative minds unite",
  },
];

const ExploreView = () => {
  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 px-4 py-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Explore</h1>
        <p className="text-muted-foreground text-sm">Groups based on your vibes</p>
      </div>

      {/* Groups Grid */}
      <div className="p-4 space-y-4">
        {vibeGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <button
              key={group.id}
              className="w-full bg-card rounded-2xl p-4 shadow-card hover:shadow-lg transition-all duration-300 animate-fade-in text-left"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br",
                  group.gradient
                )}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{group.name}</h3>
                  <p className="text-muted-foreground text-sm">{group.description}</p>
                </div>

                {/* Member Count */}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">{group.members}</span>
                </div>
              </div>

              {/* Vibe Tag */}
              <div className="mt-3 flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-vibe-tag text-vibe-tag-text">
                  {group.vibe}
                </span>
                <span className="text-xs text-muted-foreground">
                  {group.members} people nearby
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreView;