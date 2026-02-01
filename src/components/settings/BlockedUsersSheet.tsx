import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserX, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlockedUser {
  id: string;
  name: string;
  photo?: string;
  blockedAt: string;
}

interface BlockedUsersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data - in production this would come from API
const mockBlockedUsers: BlockedUser[] = [
  { id: "1", name: "Alex Johnson", blockedAt: "2024-01-15" },
  { id: "2", name: "Sam Wilson", photo: "https://i.pravatar.cc/150?img=3", blockedAt: "2024-01-10" },
];

const BlockedUsersSheet = ({ open, onOpenChange }: BlockedUsersSheetProps) => {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(mockBlockedUsers);

  const handleUnblock = (userId: string) => {
    // In production: API call to /api/blocked-users/unblock
    setBlockedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <SheetTitle className="text-xl font-bold">Blocked Users</SheetTitle>
          </div>
        </SheetHeader>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {blockedUsers.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <UserX className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No blocked users</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Users you block will appear here
                </p>
              </motion.div>
            ) : (
              blockedUsers.map((user) => (
                <motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 bg-card rounded-xl"
                >
                  <Avatar className="w-12 h-12">
                    {user.photo ? (
                      <AvatarImage src={user.photo} alt={user.name} />
                    ) : null}
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Blocked on {new Date(user.blockedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUnblock(user.id)}
                    className="rounded-full text-xs"
                  >
                    Unblock
                  </Button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BlockedUsersSheet;
