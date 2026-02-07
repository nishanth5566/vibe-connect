import { useState, useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Camera, Plus, X } from "lucide-react";

interface CreateGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGroup: (group: {
    name: string;
    description: string;
    vibe: string;
    radiusKm: number;
    profileImage?: string;
  }) => void;
}

const vibeOptions = [
  { id: "cafes", label: "Cafés", gradient: "from-amber-500 to-orange-500" },
  { id: "music", label: "Music", gradient: "from-purple-500 to-pink-500" },
  { id: "gaming", label: "Gaming", gradient: "from-green-500 to-emerald-500" },
  { id: "fitness", label: "Fitness", gradient: "from-blue-500 to-cyan-500" },
  { id: "reading", label: "Reading", gradient: "from-rose-500 to-red-500" },
  { id: "photos", label: "Photos", gradient: "from-indigo-500 to-violet-500" },
  { id: "creative", label: "Creative", gradient: "from-fuchsia-500 to-purple-500" },
  { id: "food", label: "Food", gradient: "from-yellow-500 to-orange-500" },
  { id: "travel", label: "Travel", gradient: "from-cyan-500 to-blue-500" },
  { id: "tech", label: "Tech", gradient: "from-gray-500 to-slate-600" },
];

const CreateGroupSheet = ({
  open,
  onOpenChange,
  onCreateGroup,
}: CreateGroupSheetProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedVibe, setSelectedVibe] = useState("");
  const [customVibe, setCustomVibe] = useState("");
  const [showCustomVibeInput, setShowCustomVibeInput] = useState(false);
  const [radiusKm, setRadiusKm] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomVibe = () => {
    if (customVibe.trim()) {
      setSelectedVibe(customVibe.trim());
      setShowCustomVibeInput(false);
    }
  };

  const formatRadius = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)}m`;
    return `${km}km`;
  };

  const handleCreate = () => {
    if (!name.trim() || !selectedVibe) return;
    
    const vibeLabel = vibeOptions.find(v => v.id === selectedVibe)?.label || selectedVibe;
    
    onCreateGroup({
      name: name.trim(),
      description: description.trim() || `A group for ${vibeLabel} lovers`,
      vibe: vibeLabel,
      radiusKm,
      profileImage: profileImage || undefined,
    });

    // Reset form
    setName("");
    setDescription("");
    setSelectedVibe("");
    setCustomVibe("");
    setShowCustomVibeInput(false);
    setRadiusKm(1);
    setProfileImage(null);
    onOpenChange(false);
  };

  const isValid = name.trim().length > 0 && selectedVibe;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <ScrollArea className="h-full pr-4">
          <SheetHeader className="text-left mb-6">
            <SheetTitle>Create New Group</SheetTitle>
            <p className="text-sm text-muted-foreground">
              Create a group visible to people within your chosen radius
            </p>
          </SheetHeader>

          <div className="space-y-6 pb-8">
            {/* Group Profile Picture */}
            <div className="space-y-2">
              <Label>Group Photo</Label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center border-2 border-dashed transition-colors overflow-hidden",
                    profileImage
                      ? "border-primary"
                      : "border-muted-foreground/30 hover:border-primary/50"
                  )}
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Group"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Tap to add a group photo
                  </p>
                  {profileImage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive h-auto p-0 mt-1"
                      onClick={() => setProfileImage(null)}
                    >
                      <X className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Group Name */}
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name *</Label>
              <Input
                id="group-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Morning Coffee Lovers"
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground text-right">
                {name.length}/50
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="group-description">Description</Label>
              <Textarea
                id="group-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's your group about?"
                rows={3}
                maxLength={150}
              />
              <p className="text-xs text-muted-foreground text-right">
                {description.length}/150
              </p>
            </div>

            {/* Vibe Selection */}
            <div className="space-y-3">
              <Label>Select Vibe *</Label>
              <div className="flex flex-wrap gap-2">
                {vibeOptions.map((vibe) => (
                  <button
                    key={vibe.id}
                    onClick={() => {
                      setSelectedVibe(vibe.id);
                      setShowCustomVibeInput(false);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      selectedVibe === vibe.id
                        ? `bg-gradient-to-r ${vibe.gradient} text-white shadow-md`
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {vibe.label}
                  </button>
                ))}
                {/* Add Custom Vibe Button */}
                <button
                  onClick={() => {
                    setShowCustomVibeInput(true);
                    setSelectedVibe("");
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1",
                    showCustomVibeInput || (!vibeOptions.find(v => v.id === selectedVibe) && selectedVibe)
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <Plus className="w-3 h-3" />
                  Custom
                </button>
              </div>

              {/* Custom Vibe Input */}
              {showCustomVibeInput && (
                <div className="flex gap-2 mt-2">
                  <Input
                    value={customVibe}
                    onChange={(e) => setCustomVibe(e.target.value)}
                    placeholder="Enter custom vibe..."
                    maxLength={20}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomVibe();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddCustomVibe}
                    disabled={!customVibe.trim()}
                  >
                    Add
                  </Button>
                </div>
              )}

              {/* Show selected custom vibe */}
              {selectedVibe && !vibeOptions.find(v => v.id === selectedVibe) && !showCustomVibeInput && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">Custom vibe:</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                    {selectedVibe}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1"
                    onClick={() => {
                      setSelectedVibe("");
                      setShowCustomVibeInput(true);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>

            {/* Visibility Radius */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Visibility Radius</Label>
                <span className="text-sm font-medium text-primary">
                  {formatRadius(radiusKm)}
                </span>
              </div>
              <Slider
                value={[radiusKm]}
                onValueChange={(values) => setRadiusKm(values[0])}
                min={0.1}
                max={5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100m</span>
                <span>5km</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Only users within {formatRadius(radiusKm)} of your location will see this group
              </p>
            </div>

            {/* Create Button */}
            <Button
              onClick={handleCreate}
              disabled={!isValid}
              className="w-full"
              size="lg"
            >
              Create Group
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CreateGroupSheet;
