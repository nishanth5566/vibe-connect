import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Bell, 
  Shield, 
  Eye, 
  MapPin, 
  Moon, 
  Sun,
  Trash2, 
  HelpCircle, 
  FileText,
  ChevronRight,
  Smartphone,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import BlockedUsersSheet from "@/components/settings/BlockedUsersSheet";
import HelpCenterSheet from "@/components/settings/HelpCenterSheet";
import DeleteAccountDialog from "@/components/settings/DeleteAccountDialog";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout?: () => void;
}

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  external?: boolean;
}

const SettingItem = ({ icon, label, description, children, onClick, danger, external }: SettingItemProps) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    className={cn(
      "flex items-center gap-3 p-3 rounded-xl transition-colors",
      onClick && "cursor-pointer hover:bg-secondary/50",
      danger && "text-destructive"
    )}
    onClick={onClick}
  >
    <div className={cn(
      "w-10 h-10 rounded-full flex items-center justify-center",
      danger ? "bg-destructive/10" : "bg-gradient-to-br from-primary/10 to-accent/10"
    )}>
      {icon}
    </div>
    <div className="flex-1">
      <p className={cn("font-medium", danger ? "text-destructive" : "text-foreground")}>{label}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
    {children}
    {onClick && !children && (
      external ? (
        <ExternalLink className="w-4 h-4 text-muted-foreground" />
      ) : (
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      )
    )}
  </motion.div>
);

const SettingsSheet = ({ open, onOpenChange, onLogout }: SettingsSheetProps) => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const [discoveryRadius, setDiscoveryRadius] = useState([2.5]); // 100m to 5km, stored in km

  // Sub-sheets state
  const [blockedUsersOpen, setBlockedUsersOpen] = useState(false);
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("radius_settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotifications(settings.notifications ?? true);
      setMessageAlerts(settings.messageAlerts ?? true);
      setLocationSharing(settings.locationSharing ?? true);
      setShowOnline(settings.showOnline ?? true);
      setPrivacyConsent(settings.privacyConsent ?? true);
      setDiscoveryRadius([settings.discoveryRadius ?? 2.5]);
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("radius_settings", JSON.stringify({
      notifications,
      messageAlerts,
      locationSharing,
      showOnline,
      privacyConsent,
      discoveryRadius: discoveryRadius[0],
    }));
  }, [notifications, messageAlerts, locationSharing, showOnline, privacyConsent, discoveryRadius]);

  const handleOpenTerms = () => {
    window.open("https://radius.app/terms", "_blank");
  };

  const handleOpenPrivacy = () => {
    window.open("https://radius.app/privacy", "_blank");
  };

  const handleDeleteAccount = () => {
    // Clear all local storage
    localStorage.removeItem("radius_profile");
    localStorage.removeItem("radius_email");
    localStorage.removeItem("radius_settings");
    localStorage.removeItem("radius_theme");
    setDeleteDialogOpen(false);
    onOpenChange(false);
    if (onLogout) {
      onLogout();
    }
  };

  const formatRadius = (value: number) => {
    if (value < 1) {
      return `${Math.round(value * 1000)}m`;
    }
    return `${value.toFixed(1)}km`;
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold">Settings</SheetTitle>
              {/* Theme Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-accent" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            </div>
          </SheetHeader>

          <div className="space-y-6">
            {/* Notifications Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Notifications
              </h3>
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <SettingItem
                  icon={<Bell className="w-5 h-5 text-primary" />}
                  label="Push Notifications"
                  description="Get notified about new matches"
                >
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                  />
                </SettingItem>
                <div className="h-px bg-border mx-3" />
                <SettingItem
                  icon={<Smartphone className="w-5 h-5 text-primary" />}
                  label="Message Alerts"
                  description="Sound for new messages"
                >
                  <Switch checked={messageAlerts} onCheckedChange={setMessageAlerts} />
                </SettingItem>
              </div>
            </div>

            {/* Privacy Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Privacy
              </h3>
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <SettingItem
                  icon={<MapPin className="w-5 h-5 text-primary" />}
                  label="Share Location"
                  description="Show your location on the map"
                >
                  <Switch 
                    checked={locationSharing} 
                    onCheckedChange={setLocationSharing}
                  />
                </SettingItem>
                <div className="h-px bg-border mx-3" />
                <SettingItem
                  icon={<Eye className="w-5 h-5 text-primary" />}
                  label="Show Online Status"
                  description="Let others see when you're active"
                >
                  <Switch 
                    checked={showOnline} 
                    onCheckedChange={setShowOnline}
                  />
                </SettingItem>
                <div className="h-px bg-border mx-3" />
                <SettingItem
                  icon={<Shield className="w-5 h-5 text-primary" />}
                  label="Privacy Consent (DPDP)"
                  description="Allow data processing"
                >
                  <Switch 
                    checked={privacyConsent} 
                    onCheckedChange={setPrivacyConsent}
                  />
                </SettingItem>
                <div className="h-px bg-border mx-3" />
                <SettingItem
                  icon={<Shield className="w-5 h-5 text-primary" />}
                  label="Blocked Users"
                  description="Manage your block list"
                  onClick={() => setBlockedUsersOpen(true)}
                />
              </div>
            </div>

            {/* Discovery Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Discovery
              </h3>
              <div className="bg-card rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Discovery Radius</p>
                    <p className="text-xs text-muted-foreground">Find people within {formatRadius(discoveryRadius[0])}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{formatRadius(discoveryRadius[0])}</span>
                </div>
                <Slider
                  value={discoveryRadius}
                  onValueChange={setDiscoveryRadius}
                  min={0.1}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>100m</span>
                  <span>5km</span>
                </div>
              </div>
            </div>

            {/* Appearance Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Appearance
              </h3>
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <SettingItem
                  icon={theme === "dark" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-accent" />}
                  label="Dark Mode"
                  description="Easier on the eyes at night"
                >
                  <Switch 
                    checked={theme === "dark"} 
                    onCheckedChange={toggleTheme}
                  />
                </SettingItem>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Support
              </h3>
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <SettingItem
                  icon={<HelpCircle className="w-5 h-5 text-primary" />}
                  label="Help Center"
                  description="Get help with Radius"
                  onClick={() => setHelpCenterOpen(true)}
                />
                <div className="h-px bg-border mx-3" />
                <SettingItem
                  icon={<FileText className="w-5 h-5 text-primary" />}
                  label="Terms of Service"
                  description="Read our terms"
                  onClick={handleOpenTerms}
                  external
                />
                <div className="h-px bg-border mx-3" />
                <SettingItem
                  icon={<FileText className="w-5 h-5 text-primary" />}
                  label="Privacy Policy"
                  description="Read our privacy policy"
                  onClick={handleOpenPrivacy}
                  external
                />
              </div>
            </div>

            {/* Danger Zone */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Account
              </h3>
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <SettingItem
                  icon={<Trash2 className="w-5 h-5" />}
                  label="Delete Account"
                  description="Permanently delete your account"
                  onClick={() => setDeleteDialogOpen(true)}
                  danger
                />
              </div>
            </div>

            {/* App Version */}
            <div className="text-center py-4">
              <p className="text-xs text-muted-foreground">Radius v1.0.0</p>
              <p className="text-xs text-muted-foreground mt-1">Made with ❤️ for connections</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sub-sheets */}
      <BlockedUsersSheet open={blockedUsersOpen} onOpenChange={setBlockedUsersOpen} />
      <HelpCenterSheet open={helpCenterOpen} onOpenChange={setHelpCenterOpen} />
      <DeleteAccountDialog 
        open={deleteDialogOpen} 
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleDeleteAccount}
      />
    </>
  );
};

export default SettingsSheet;
