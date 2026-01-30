import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, Calendar, Users, FileText, Sparkles, Camera, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NameStep from "@/components/onboarding/NameStep";
import AgeStep from "@/components/onboarding/AgeStep";
import GenderStep from "@/components/onboarding/GenderStep";
import BioStep from "@/components/onboarding/BioStep";
import VibesStep from "@/components/onboarding/VibesStep";
import PhotoStep from "@/components/onboarding/PhotoStep";

const steps = [
  { id: 1, title: "What's your name?", icon: User },
  { id: 2, title: "How old are you?", icon: Calendar },
  { id: 3, title: "What's your gender?", icon: Users },
  { id: 4, title: "Tell us about yourself", icon: FileText },
  { id: 5, title: "What's your vibe?", icon: Sparkles },
  { id: 6, title: "Add a photo", icon: Camera },
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
    photo: "",
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
      case 5:
        // Photo is optional
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 flex flex-col overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="max-w-md mx-auto">
          {/* Back button and step indicator */}
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentStep > 0
                  ? "bg-secondary text-foreground hover:bg-secondary/80"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Progress bar */}
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
            />
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Step Icons */}
      <div className="relative z-10 py-4 px-4">
        <div className="max-w-md mx-auto flex justify-center gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-110"
                    : isCompleted
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="activeRing"
                    className="absolute inset-0 -m-1 rounded-full border-2 border-primary/50"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scrollable Steps Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-hidden scroll-smooth relative z-10"
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

          {/* Step 6: Photo */}
          <div
            className="w-full px-6 flex flex-col items-center justify-start pt-4"
            style={{ scrollSnapAlign: "start", flex: `0 0 ${100 / steps.length}%` }}
          >
            <PhotoStep
              value={formData.photo}
              onChange={(value) => setFormData({ ...formData, photo: value })}
              error={errors.photo}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 safe-area-bottom relative z-10"
      >
        <div className="max-w-md mx-auto">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleNext}
              disabled={isTransitioning}
              className="w-full h-14 rounded-2xl text-base font-semibold gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
            >
              {getButtonText()}
            </Button>
          </motion.div>
          
          {/* Skip option for photo step */}
          <AnimatePresence>
            {currentStep === steps.length - 1 && !formData.photo && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={handleNext}
                className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip for now
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
