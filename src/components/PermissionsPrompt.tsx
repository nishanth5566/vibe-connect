import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, MapPin, Image, Check, X } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { cn } from "@/lib/utils";

interface PermissionItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "granted" | "denied" | "prompt" | "unsupported";
  onRequest: () => void;
  isLoading?: boolean;
}

const PermissionItem = ({
  icon,
  title,
  description,
  status,
  onRequest,
  isLoading,
}: PermissionItemProps) => {
  const isGranted = status === "granted";
  const isDenied = status === "denied";
  const isUnsupported = status === "unsupported";

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50">
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          isGranted ? "bg-online/20 text-online" : "bg-primary/20 text-primary"
        )}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {isGranted ? (
        <div className="w-10 h-10 rounded-full bg-online/20 flex items-center justify-center">
          <Check className="w-5 h-5 text-online" />
        </div>
      ) : isDenied || isUnsupported ? (
        <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
          <X className="w-5 h-5 text-destructive" />
        </div>
      ) : (
        <Button
          size="sm"
          onClick={onRequest}
          disabled={isLoading}
          className="rounded-full"
        >
          Allow
        </Button>
      )}
    </div>
  );
};

const PermissionsPrompt = () => {
  const [open, setOpen] = useState(false);
  const [mediaStatus, setMediaStatus] = useState<"granted" | "denied" | "prompt">("prompt");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingNotification, setIsLoadingNotification] = useState(false);

  const {
    permissions,
    requestNotificationPermission,
    requestLocationPermission,
  } = usePermissions();

  useEffect(() => {
    // Check if we should show the permissions prompt
    const hasSeenPrompt = localStorage.getItem("radius_permissions_prompted");
    const hasProfile = localStorage.getItem("radius_profile");

    if (hasProfile && !hasSeenPrompt) {
      // Show after a short delay for better UX
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRequestNotification = async () => {
    setIsLoadingNotification(true);
    await requestNotificationPermission();
    setIsLoadingNotification(false);
  };

  const handleRequestLocation = async () => {
    setIsLoadingLocation(true);
    await requestLocationPermission();
    setIsLoadingLocation(false);
  };

  const handleRequestMedia = async () => {
    // For file/photo access, we just need to check if the browser supports it
    // The actual permission is requested when the user selects a file
    try {
      // Check if File System Access API is supported
      if ("showOpenFilePicker" in window) {
        setMediaStatus("granted");
      } else {
        // Fallback - traditional file input always works
        setMediaStatus("granted");
      }
    } catch {
      setMediaStatus("denied");
    }
  };

  const handleContinue = () => {
    localStorage.setItem("radius_permissions_prompted", "true");
    setOpen(false);
  };

  const allGranted =
    permissions.notifications === "granted" &&
    permissions.location === "granted" &&
    mediaStatus === "granted";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Enable Permissions</DialogTitle>
          <DialogDescription>
            Allow these permissions for the best experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <PermissionItem
            icon={<Bell className="w-6 h-6" />}
            title="Notifications"
            description="Get alerts for messages and matches"
            status={permissions.notifications}
            onRequest={handleRequestNotification}
            isLoading={isLoadingNotification}
          />

          <PermissionItem
            icon={<MapPin className="w-6 h-6" />}
            title="Location"
            description="Find people and groups near you"
            status={permissions.location}
            onRequest={handleRequestLocation}
            isLoading={isLoadingLocation}
          />

          <PermissionItem
            icon={<Image className="w-6 h-6" />}
            title="Photos & Files"
            description="Share photos and files in chats"
            status={mediaStatus}
            onRequest={handleRequestMedia}
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={handleContinue}
          >
            Skip for now
          </Button>
          <Button
            className="flex-1 rounded-full"
            onClick={handleContinue}
            disabled={!allGranted && permissions.location !== "granted"}
          >
            {allGranted ? "Continue" : "Allow & Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsPrompt;
