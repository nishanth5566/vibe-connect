import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check, User, Calendar, Users, FileText, Sparkles } from "lucide-react";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import StepIndicators from "@/components/onboarding/StepIndicators";
import NameStep from "@/components/onboarding/NameStep";
import AgeStep from "@/components/onboarding/AgeStep";
import GenderStep from "@/components/onboarding/GenderStep";
import BioStep from "@/components/onboarding/BioStep";
import VibesStep from "@/components/onboarding/VibesStep";

const steps = [
  { id: 1, title: "What's your name?", icon: User },
  { id: 2, title: "How old are you?", icon: Calendar },
  { id: 3, title: "What's your gender?", icon: Users },
  { id: 4, title: "Tell us about yourself", icon: FileText },
  { id: 5, title: "What's your vibe?", icon: Sparkles },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bio: "",
    vibes: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Smooth scroll to current step
  useEffect(() => {
    if (scrollContainerRef.current) {
      setIsTransitioning(true);
      const stepWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: currentStep * stepWidth,
        behavior: "smooth",
      });
      setTimeout(() => setIsTransitioning(false), 400);
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
        } else if (isNaN(age) || age < 18 || age > 120) {
          newErrors.age = "You must be 18 or older";
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
      case 4:
        if (formData.vibes.length === 0) {
          newErrors.vibes = "Please select at least 1 vibe";
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

  const getButtonText = () => {
    if (currentStep === steps.length - 1) {
      return (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Let's Go!
        </>
      );
    }
    return (
      <>
        Continue
        <ChevronRight className="w-5 h-5 ml-2" />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
      {/* Progress Header */}
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={steps.length}
        onBack={handleBack}
      />

      {/* Step Icons */}
      <StepIndicators steps={steps} currentStep={currentStep} />

      {/* Scrollable Steps Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-hidden scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        <div className="flex" style={{ width: `${steps.length * 100}%` }}>
          {/* Step 1: Name */}
          <div
            className="w-full px-6 flex flex-col items-center justify-start pt-4"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <NameStep
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              error={errors.name}
            />
          </div>

          {/* Step 2: Age */}
          <div
            className="w-full px-6 flex flex-col items-center justify-start pt-4"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <AgeStep
              value={formData.age}
              onChange={(value) => setFormData({ ...formData, age: value })}
              error={errors.age}
            />
          </div>

          {/* Step 3: Gender */}
          <div
            className="w-full px-6 flex flex-col items-center justify-start pt-4"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <GenderStep
              value={formData.gender}
              onChange={(value) => setFormData({ ...formData, gender: value })}
              error={errors.gender}
            />
          </div>

          {/* Step 4: Bio */}
          <div
            className="w-full px-6 flex flex-col items-center justify-start pt-4"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <BioStep
              value={formData.bio}
              onChange={(value) => setFormData({ ...formData, bio: value })}
              error={errors.bio}
            />
          </div>

          {/* Step 5: Vibes */}
          <div
            className="w-full px-6 flex flex-col items-center justify-start pt-4"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <VibesStep
              value={formData.vibes}
              onChange={(value) => setFormData({ ...formData, vibes: value })}
              error={errors.vibes}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-full h-14 rounded-2xl text-base font-semibold gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            {getButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
