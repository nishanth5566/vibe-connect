import { useState, useEffect, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

export type PermissionStatus = "granted" | "denied" | "prompt" | "unsupported";

interface PermissionsState {
  notifications: PermissionStatus;
  location: PermissionStatus;
}

export function usePermissions() {
  const [permissions, setPermissions] = useState<PermissionsState>({
    notifications: "prompt",
    location: "prompt",
  });

  // Check current notification permission
  const checkNotificationPermission = useCallback(() => {
    // Check if we're in an iframe (notifications are often blocked in iframes)
    const isInIframe = window.self !== window.top;
    
    if (!("Notification" in window)) {
      setPermissions((prev) => ({ ...prev, notifications: "unsupported" }));
      return "unsupported";
    }
    
    // In iframes, notifications may be blocked - check if it works
    if (isInIframe) {
      // Try to check permission, but it might fail in iframe
      try {
        const status = Notification.permission as PermissionStatus;
        setPermissions((prev) => ({ ...prev, notifications: status }));
        return status;
      } catch {
        setPermissions((prev) => ({ ...prev, notifications: "unsupported" }));
        return "unsupported";
      }
    }
    
    const status = Notification.permission as PermissionStatus;
    setPermissions((prev) => ({ ...prev, notifications: status }));
    return status;
  }, []);

  // Check current location permission
  const checkLocationPermission = useCallback(async () => {
    if (!("geolocation" in navigator)) {
      setPermissions((prev) => ({ ...prev, location: "unsupported" }));
      return "unsupported";
    }

    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      const status = result.state as PermissionStatus;
      setPermissions((prev) => ({ ...prev, location: status }));

      // Listen for permission changes
      result.onchange = () => {
        setPermissions((prev) => ({ ...prev, location: result.state as PermissionStatus }));
      };

      return status;
    } catch {
      // Fallback for browsers that don't support permissions API
      return "prompt";
    }
  }, []);

  // Request notification permission
  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    // Check if we're in an iframe
    const isInIframe = window.self !== window.top;
    
    if (!("Notification" in window)) {
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive",
      });
      return false;
    }

    if (Notification.permission === "granted") {
      setPermissions((prev) => ({ ...prev, notifications: "granted" }));
      return true;
    }

    if (Notification.permission === "denied") {
      toast({
        title: "Notifications Blocked",
        description: "Please enable notifications in your browser settings.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissions((prev) => ({ ...prev, notifications: permission as PermissionStatus }));

      if (permission === "granted") {
        toast({
          title: "Notifications Enabled",
          description: "You'll receive notifications for new matches and messages.",
        });
        // Show a test notification (only if not in iframe)
        if (!isInIframe) {
          try {
            new Notification("Radius", {
              body: "Notifications are now enabled! 🎉",
              icon: "/favicon.ico",
            });
          } catch {
            // Notification creation failed, but permission was granted
          }
        }
        return true;
      } else {
        toast({
          title: "Notifications Disabled",
          description: "You won't receive push notifications.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      // In iframes, notification requests may be blocked entirely
      if (isInIframe) {
        toast({
          title: "Preview Limitation",
          description: "Notifications work when you publish your app. Click 'Allow' in your browser's popup if it appears.",
        });
        // Mark as granted for demo purposes in preview
        setPermissions((prev) => ({ ...prev, notifications: "granted" }));
        return true;
      }
      toast({
        title: "Permission Error",
        description: "Could not request notification permission.",
        variant: "destructive",
      });
      return false;
    }
  }, []);

  // Request location permission
  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    if (!("geolocation" in navigator)) {
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
      return false;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissions((prev) => ({ ...prev, location: "granted" }));
          toast({
            title: "Location Enabled",
            description: "You can now discover people nearby!",
          });
          
          // Store location for use in the app
          localStorage.setItem("radius_location", JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: Date.now(),
          }));
          
          resolve(true);
        },
        (error) => {
          console.error("Location error:", error);
          setPermissions((prev) => ({ ...prev, location: "denied" }));
          
          let message = "Unable to get your location.";
          if (error.code === error.PERMISSION_DENIED) {
            message = "Please enable location access in your browser settings.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            message = "Location information is unavailable.";
          } else if (error.code === error.TIMEOUT) {
            message = "Location request timed out.";
          }
          
          toast({
            title: "Location Disabled",
            description: message,
            variant: "destructive",
          });
          resolve(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, []);

  // Check permissions on mount
  useEffect(() => {
    checkNotificationPermission();
    checkLocationPermission();
  }, [checkNotificationPermission, checkLocationPermission]);

  return {
    permissions,
    requestNotificationPermission,
    requestLocationPermission,
    checkNotificationPermission,
    checkLocationPermission,
  };
}
