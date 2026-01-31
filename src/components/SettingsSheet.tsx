import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Bell, 
  Shield, 
  Eye, 
  MapPin, 
  Moon, 
  Trash2, 
  HelpCircle, 
  FileText,
  ChevronRight,
  Smartphone
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

const SettingItem = ({ icon, label, description, children, onClick, danger }: SettingItemProps) => (
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
    {onClick && !children && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
  </motion.div>
);

const SettingsSheet = ({ open, onOpenChange }: SettingsSheetProps) => {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [discoveryRadius, setDiscoveryRadius] = useState([25]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">Settings</SheetTitle>
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
                <Switch checked={true} onCheckedChange={() => {}} />
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
                label="Blocked Users"
                description="Manage your block list"
                onClick={() => {}}
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
                  <p className="text-xs text-muted-foreground">Find people within {discoveryRadius[0]} km</p>
                </div>
                <span className="text-sm font-semibold text-primary">{discoveryRadius[0]} km</span>
              </div>
              <Slider
                value={discoveryRadius}
                onValueChange={setDiscoveryRadius}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1 km</span>
                <span>100 km</span>
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
                icon={<Moon className="w-5 h-5 text-primary" />}
                label="Dark Mode"
                description="Easier on the eyes at night"
              >
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
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
                onClick={() => {}}
              />
              <div className="h-px bg-border mx-3" />
              <SettingItem
                icon={<FileText className="w-5 h-5 text-primary" />}
                label="Terms & Privacy"
                description="Read our policies"
                onClick={() => {}}
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
                onClick={() => {}}
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
  );
};

export default SettingsSheet;
