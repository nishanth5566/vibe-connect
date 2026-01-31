import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Camera, Upload, Sparkles, X, Check, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { verifyPhoto, VerificationResult } from "@/services/photoVerification";
import VerifiedBadge from "@/components/VerifiedBadge";

interface PhotoStepProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PhotoStep = ({ value, onChange, error }: PhotoStepProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verification, setVerification] = useState<VerificationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }
    
    setIsUploading(true);
    setVerification(null);
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setIsUploading(false);
      setIsVerifying(true);
      
      // Run photo verification
      const result = await verifyPhoto(base64);
      setVerification(result);
      setIsVerifying(false);
      
      // Only set the value if verification passed
      if (result.isValid) {
        onChange(base64);
      } else {
        // Still show the preview but with warning
        onChange(base64);
      }
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const removePhoto = () => {
    onChange("");
  };

  return (
    <div className="w-full max-w-md animate-fade-in px-2">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-xs font-semibold mb-4"
        >
          Almost there! 📸
        </motion.span>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Show your best self
        </h2>
        <p className="text-muted-foreground">
          Add a photo so others can recognize you
        </p>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          {value ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group"
            >
              {/* Decorative rings */}
              <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-lg animate-pulse-soft" />
              <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-r from-primary to-accent p-[3px]">
                <div className="w-full h-full rounded-full bg-background" />
              </div>
              
              {/* Photo */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-background shadow-2xl">
                <img
                  src={value}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay on hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 cursor-pointer"
                  onClick={handleClick}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Remove button */}
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={removePhoto}
                className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg"
              >
                <X className="w-4 h-4" />
              </motion.button>
              
              {/* Verification badge */}
              <AnimatePresence mode="wait">
                {isVerifying ? (
                  <motion.div
                    key="verifying"
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 10 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-2 shadow-lg"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Verifying...
                  </motion.div>
                ) : verification?.isValid ? (
                  <motion.div
                    key="verified"
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 10 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-gradient-to-r from-success to-accent text-white text-xs font-medium flex items-center gap-1.5 shadow-lg"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </motion.div>
                ) : verification && !verification.isValid ? (
                  <motion.div
                    key="warning"
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 10 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-destructive/90 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    Try again
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-success text-white text-xs font-medium flex items-center gap-1 shadow-lg"
                  >
                    <Check className="w-3 h-3" />
                    Looking great!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
              className={cn(
                "relative w-48 h-48 rounded-full cursor-pointer transition-all duration-300",
                "border-3 border-dashed flex flex-col items-center justify-center gap-3",
                isDragging
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-border hover:border-primary/60 hover:bg-secondary/50",
                isUploading && "pointer-events-none"
              )}
              style={{ borderWidth: '3px' }}
            >
              {isUploading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-3 border-primary border-t-transparent"
                    style={{ borderWidth: '3px' }}
                  />
                  <span className="text-sm text-muted-foreground">Uploading...</span>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                      isDragging ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {isDragging ? (
                      <Upload className="w-8 h-8" />
                    ) : (
                      <Camera className="w-8 h-8" />
                    )}
                  </motion.div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {isDragging ? "Drop it here!" : "Tap to upload"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      or drag & drop
                    </p>
                  </div>
                </>
              )}
              
              {/* Animated border effect */}
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 -m-2 rounded-full border-2 border-primary/50 animate-pulse"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verification Feedback */}
        <AnimatePresence>
          {verification && !verification.isValid && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive text-sm">{verification.feedback}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Score: {verification.confidenceScore}% - Try a clearer photo
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verification Success */}
        <AnimatePresence>
          {verification?.isValid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-6 p-4 rounded-xl bg-success/10 border border-success/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-success text-sm">Photo Verified!</p>
                  <p className="text-xs text-muted-foreground">
                    Confidence: {verification.confidenceScore}%
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 space-y-2"
        >
          {[
            { icon: "✨", text: "Clear face photo works best" },
            { icon: "🌅", text: "Good lighting makes a difference" },
            { icon: "😊", text: "Show your genuine smile" },
          ].map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span>{tip.icon}</span>
              <span>{tip.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive mt-4 text-center"
        >
          {error}
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1"
      >
        <Sparkles className="w-3 h-3" />
        You can always change this later
      </motion.p>
    </div>
  );
};

export default PhotoStep;
