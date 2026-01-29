import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ChevronLeft, User, Calendar, Users, FileText, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "What's your name?", icon: User },
  { id: 2, title: "How old are you?", icon: Calendar },
  { id: 3, title: "What's your gender?", icon: Users },
  { id: 4, title: "Tell us about yourself", icon: FileText },
];

const genderOptions = [
  { value: "male", label: "Male", emoji: "👨" },
  { value: "female", label: "Female", emoji: "👩" },
  { value: "non-binary", label: "Non-binary", emoji: "🧑" },
  { value: "prefer-not", label: "Prefer not to say", emoji: "🤫" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bio: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Smooth scroll to current step
  useEffect(() => {
    if (scrollContainerRef.current) {
      const stepWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: currentStep * stepWidth,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 0:
        if (!formData.name.trim()) {
          newErrors.name = "Please enter your name";
        } else if (formData.name.length > 50) {
          newErrors.name = "Name must be less than 50 characters";
        }
        break;
      case 1:
        const age = parseInt(formData.age);
        if (!formData.age) {
          newErrors.age = "Please enter your age";
        } else if (isNaN(age) || age < 13 || age > 120) {
          newErrors.age = "Please enter a valid age (13-120)";
        }
        break;
      case 2:
        if (!formData.gender) {
          newErrors.gender = "Please select an option";
        }
        break;
      case 3:
        if (!formData.bio.trim()) {
          newErrors.bio = "Please tell us a bit about yourself";
        } else if (formData.bio.length > 200) {
          newErrors.bio = "Bio must be less than 200 characters";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Save profile data and navigate to main app
        const profile = {
          ...formData,
          email: localStorage.getItem("radius_email") || "",
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("radius_profile", JSON.stringify(profile));
        navigate("/app");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-4 max-w-md mx-auto">
          {/* Back button & Step indicator */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors",
                currentStep === 0
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Icons */}
      <div className="flex justify-center gap-4 py-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                isActive && "gradient-primary scale-110 shadow-lg",
                isComplete && "bg-success text-primary-foreground",
                !isActive && !isComplete && "bg-muted text-muted-foreground"
              )}
            >
              {isComplete ? (
                <Check className="w-5 h-5 text-primary-foreground" />
              ) : (
                <Icon className={cn("w-5 h-5", isActive && "text-primary-foreground")} />
              )}
            </div>
          );
        })}
      </div>

      {/* Scrollable Steps Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-hidden scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="flex" style={{ width: `${steps.length * 100}%` }}>
          {/* Step 1: Name */}
          <div
            className="w-full px-6 flex flex-col items-center"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <div className="w-full max-w-md animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                What's your name?
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                This is how others will see you
              </p>

              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value.slice(0, 50) })
                  }
                  className="h-14 rounded-xl bg-card border-border text-lg"
                  autoFocus
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
                <p className="text-xs text-muted-foreground text-right">
                  {formData.name.length}/50
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Age */}
          <div
            className="w-full px-6 flex flex-col items-center"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <div className="w-full max-w-md animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                How old are you?
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                We'll show you people in your age group
              </p>

              <div className="space-y-2">
                <Label htmlFor="age">Your age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value.slice(0, 3) })
                  }
                  className="h-14 rounded-xl bg-card border-border text-lg text-center"
                  min={13}
                  max={120}
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age}</p>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Gender */}
          <div
            className="w-full px-6 flex flex-col items-center"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <div className="w-full max-w-md animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                What's your gender?
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Help us personalize your experience
              </p>

              <div className="grid grid-cols-2 gap-3">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, gender: option.value })}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-2",
                      formData.gender === option.value
                        ? "border-primary bg-secondary"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                    <span
                      className={cn(
                        "font-medium",
                        formData.gender === option.value
                          ? "text-primary"
                          : "text-foreground"
                      )}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="text-sm text-destructive mt-2 text-center">
                  {errors.gender}
                </p>
              )}
            </div>
          </div>

          {/* Step 4: Bio */}
          <div
            className="w-full px-6 flex flex-col items-center"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <div className="w-full max-w-md animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                Tell us about yourself
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                A short bio to help others know you better
              </p>

              <div className="space-y-2">
                <Label htmlFor="bio">Your bio</Label>
                <Textarea
                  id="bio"
                  placeholder="I love coffee, music, and meeting new people..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value.slice(0, 200) })
                  }
                  className="min-h-[120px] rounded-xl bg-card border-border text-base resize-none"
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio}</p>
                )}
                <p className="text-xs text-muted-foreground text-right">
                  {formData.bio.length}/200
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-lg border-t border-border p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleNext}
            className="w-full h-14 rounded-xl text-base font-semibold"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Get Started
                <Check className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;