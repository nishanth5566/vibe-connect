// 20 vibe options for user selection during onboarding
export const vibeOptions = [
  { id: "yoga", label: "Yoga", emoji: "🧘" },
  { id: "meditation", label: "Meditation", emoji: "🧘‍♂️" },
  { id: "gym", label: "Gym", emoji: "💪" },
  { id: "running", label: "Running", emoji: "🏃" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "art", label: "Art", emoji: "🎨" },
  { id: "photography", label: "Photography", emoji: "📸" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "cooking", label: "Cooking", emoji: "👨‍🍳" },
  { id: "reading", label: "Reading", emoji: "📚" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "hiking", label: "Hiking", emoji: "🥾" },
  { id: "dancing", label: "Dancing", emoji: "💃" },
  { id: "movies", label: "Movies", emoji: "🎬" },
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "pets", label: "Pets", emoji: "🐕" },
  { id: "fitness", label: "Fitness", emoji: "🏋️" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "foodie", label: "Foodie", emoji: "🍜" },
];

export type VibeId = typeof vibeOptions[number]["id"];
