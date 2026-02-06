import { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ForgotPasswordSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ForgotPasswordSheet = ({ open, onOpenChange }: ForgotPasswordSheetProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset state when closing
      setTimeout(() => {
        setEmail("");
        setError("");
        setIsSubmitted(false);
      }, 300);
    }
    onOpenChange(isOpen);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh]">
        <SheetHeader className="text-left pb-4">
          <SheetTitle className="text-xl">
            {isSubmitted ? "Check Your Email" : "Reset Password"}
          </SheetTitle>
          <SheetDescription>
            {isSubmitted
              ? "We've sent you instructions to reset your password"
              : "Enter your email and we'll send you a reset link"}
          </SheetDescription>
        </SheetHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="pl-10 h-12 rounded-xl bg-muted border-0"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold">
              Send Reset Link
            </Button>

            <p className="text-xs text-muted-foreground text-center pt-2">
              This is a demo. No actual email will be sent.
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <p className="text-foreground font-medium">
                Reset link sent to
              </p>
              <p className="text-primary font-semibold">{email}</p>
            </div>

            <p className="text-sm text-muted-foreground max-w-xs">
              Please check your inbox and spam folder. The link will expire in 24 hours.
            </p>

            <Button
              onClick={() => handleClose(false)}
              className="w-full h-12 rounded-xl text-base font-semibold mt-4"
            >
              Back to Login
            </Button>

            <p className="text-xs text-muted-foreground pt-2">
              This is a demo. No actual email was sent.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ForgotPasswordSheet;
