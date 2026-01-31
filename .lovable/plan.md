

# Ultra-Premium UI/UX Overhaul + Photo Verification

## Overview

This plan transforms Radius into a world-class mobile experience with cinematic animations, immersive micro-interactions, and AI-powered photo verification to ensure users are real people.

---

## Phase 1: AI Photo Verification System

### How It Works

We'll integrate with the **Lovable AI Gateway** (using your existing `LOVABLE_API_KEY`) to analyze uploaded photos and verify:
- **Face Detection**: Confirms a human face is present
- **Liveness Indicators**: Checks for natural lighting, blur patterns, and photo manipulation signs
- **Quality Score**: Ensures the photo is clear enough for identification

### New Component: `PhotoVerificationStep.tsx`

Replaces the current `PhotoStep` with an immersive verification flow:

```text
+----------------------------------------+
|         📸 Verify Your Photo           |
|                                        |
|    ┌──────────────────────────────┐    |
|    │                              │    |
|    │      [Camera Viewfinder]     │    |
|    │      with face outline       │    |
|    │                              │    |
|    └──────────────────────────────┘    |
|                                        |
|    ⬤ Position your face in the circle |
|    ⬤ Good lighting recommended        |
|    ⬤ Look directly at camera          |
|                                        |
|    [  Take Photo  ] or [  Upload  ]    |
|                                        |
|    ┌─ Verification Status ───────┐     |
|    │ ✓ Face detected             │     |
|    │ ✓ Photo is clear            │     |
|    │ ✓ Verified as real person   │     |
|    └─────────────────────────────┘     |
+----------------------------------------+
```

### Verification Service: `src/services/photoVerification.ts`

```typescript
// Uses Lovable AI Gateway for face analysis
async function verifyPhoto(imageBase64: string): Promise<{
  isValid: boolean;
  faceDetected: boolean;
  confidenceScore: number;
  feedback: string;
}>
```

---

## Phase 2: Premium Login Experience

### Design Transformation

```text
Current                          New Premium Design
┌──────────┐                    ┌────────────────────────┐
│ Simple   │                    │ ✨ Glassmorphism card  │
│ form     │     ─────>         │ 🌊 Animated gradients  │
│          │                    │ 🎭 3D tilt on hover    │
│          │                    │ ⚡ Haptic feedback     │
└──────────┘                    └────────────────────────┘
```

### Enhancements

1. **Animated Background Orbs**: Floating gradient spheres with parallax effect
2. **Glassmorphism Cards**: Frosted glass effect with backdrop blur
3. **Input Focus Effects**: Glowing borders with gradient animation
4. **Button Micro-interactions**: Ripple effects, scale animations, loading states
5. **Social Proof Badge**: "10,000+ users connected" with animated counter

---

## Phase 3: Immersive Onboarding

### Step-by-Step Enhancements

| Step | Current | Premium Enhancement |
|------|---------|---------------------|
| Name | Basic input | Typewriter animation + floating label |
| Age | Plain slider | Animated wheel picker with haptic |
| Gender | Radio buttons | 3D flip cards with icons |
| Bio | Textarea | Auto-expanding with character sparkles |
| Vibes | Grid buttons | Magnetic cards with physics-based drag |
| Photo | File upload | Camera capture with face guide overlay |

### New Animations

```css
/* Magnetic card hover effect */
.vibe-card {
  transform-style: preserve-3d;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Gradient border animation */
@keyframes border-dance {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```

### Progress Indicator Redesign

```text
Current: ●─●─●─●─●─●

New:     
   ╭─────────────────────────────────────╮
   │ ░░░░░▓▓▓▓▓▓▓▓▓▓▓▓████████████████░░│ 
   ╰─────────────────────────────────────╯
         Step 3 of 6 • Tell us about yourself
```

---

## Phase 4: Main App Premium UI

### Map View Transformation

```text
┌─────────────────────────────────────────┐
│  ╭─ Glass Header ───────────────────╮   │
│  │ 🗺️ 4 people nearby              │   │
│  │    ░░░░░░░░ pulse animation     │   │
│  ╰──────────────────────────────────╯   │
│                                         │
│     ┌───┐      ⬤ (pulsing rings)       │
│     │Map│    /                          │
│     │   │  ⬤ (glow effect)              │
│     │   │         \                     │
│     │   │          ⬤                    │
│     └───┘                               │
│                                         │
│  ╭─ Person Card (3D tilt) ──────────╮   │
│  │ [Photo] Sarah K. • 0.3km         │   │
│  │         ☕ Coffee lover           │   │
│  │         [Message] [Pass →]       │   │
│  ╰──────────────────────────────────╯   │
└─────────────────────────────────────────┘
```

### Person Card Enhancements

1. **3D Tilt Effect**: Card tilts based on touch/mouse position
2. **Verified Badge**: Green checkmark for verified photos
3. **Shared Vibes Glow**: Highlight matching interests with pulsing effect
4. **Swipe Gestures**: Tinder-like card swiping with spring physics

### Bottom Navigation Redesign

```text
Current: [Map] [Explore] [Chat] [Profile]

New:
╭──────────────────────────────────────────────╮
│                    ⬤                         │
│  🗺️        🧭        💬        👤            │
│  Map     Explore   Chats    Profile          │
│   ▼                                          │
│ (floating indicator with spring animation)   │
╰──────────────────────────────────────────────╯
```

---

## Phase 5: Micro-interactions Library

### New CSS Utilities in `index.css`

```css
/* Glow effects */
.glow-primary { box-shadow: 0 0 30px hsl(var(--primary) / 0.4); }
.glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }

/* Glass morphism */
.glass { 
  background: hsl(var(--card) / 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--border) / 0.3);
}

/* Magnetic hover */
.magnetic { 
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Skeleton shimmer */
.skeleton-shimmer {
  background: linear-gradient(90deg, 
    transparent, 
    hsl(var(--primary) / 0.1), 
    transparent);
  animation: shimmer 1.5s infinite;
}
```

---

## Implementation Files

### New Files to Create

| File | Purpose |
|------|---------|
| `src/services/photoVerification.ts` | AI photo analysis service |
| `src/components/onboarding/PhotoVerificationStep.tsx` | Camera capture + verification UI |
| `src/components/ui/GlassCard.tsx` | Reusable glassmorphism component |
| `src/components/ui/MagneticButton.tsx` | Button with 3D tilt effect |
| `src/components/VerifiedBadge.tsx` | Verification indicator |
| `src/hooks/useTiltEffect.ts` | 3D card tilt hook |
| `src/hooks/useHapticFeedback.ts` | Vibration feedback hook |

### Files to Update

| File | Changes |
|------|---------|
| `src/pages/Login.tsx` | Complete redesign with glassmorphism |
| `src/pages/Onboarding.tsx` | Enhanced step transitions |
| `src/components/onboarding/*.tsx` | Premium animations for each step |
| `src/components/MapView.tsx` | Person markers with pulse rings |
| `src/components/PersonCard.tsx` | 3D tilt + verified badge |
| `src/components/BottomNav.tsx` | Floating indicator animation |
| `src/components/ExploreView.tsx` | Staggered card animations |
| `src/components/ChatsView.tsx` | Message bubbles with typing indicator |
| `src/index.css` | New animation utilities |
| `tailwind.config.ts` | Extended animation keyframes |

---

## Technical Details

### Photo Verification API Call

```typescript
const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${LOVABLE_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'google/gemini-2.5-flash-image',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: 'Analyze this photo: 1) Is there exactly one clear human face? 2) Does it appear to be a real photo (not AI-generated or a screenshot)? 3) Rate clarity 1-10. Respond JSON only: {"faceDetected": bool, "isReal": bool, "clarity": number, "feedback": string}' },
        { type: 'image_url', image_url: { url: base64Image } }
      ]
    }],
    modalities: ['text']
  })
});
```

### Verification Flow

```text
User takes photo
      │
      ▼
┌─────────────────┐
│ Upload to AI    │─── Loading animation with progress ring
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Face detected?  │──NO──▶ "Please show your face clearly"
└────────┬────────┘
        YES
         │
         ▼
┌─────────────────┐
│ Photo is real?  │──NO──▶ "Please use a real photo"
└────────┬────────┘
        YES
         │
         ▼
┌─────────────────┐
│ Clarity > 6?    │──NO──▶ "Photo is too blurry"
└────────┬────────┘
        YES
         │
         ▼
   ✓ VERIFIED
   (confetti animation)
```

---

## Summary

This overhaul will deliver:

- **AI-Powered Photo Verification**: Real person detection using Lovable AI Gateway
- **Cinematic Transitions**: Smooth 60fps animations throughout
- **Glassmorphism Design**: Modern frosted glass aesthetic
- **3D Micro-interactions**: Tilt effects, magnetic buttons, spring physics
- **Premium Polish**: Loading states, haptic feedback, success celebrations

The result will be a dating/social app experience that rivals apps like Hinge, Bumble, and Tinder in terms of visual quality and interaction design.

