import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
}

const DeleteAccountDialog = ({ open, onOpenChange, onConfirmDelete }: DeleteAccountDialogProps) => {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText.toLowerCase() === "delete";

  const handleDelete = () => {
    if (isConfirmed) {
      // In production: API call to /api/account/delete
      onConfirmDelete();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center">Delete Account?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action cannot be undone. All your data, matches, and messages will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-2">
            Type <span className="font-mono font-bold text-destructive">DELETE</span> to confirm:
          </p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE"
            className="rounded-xl"
          />
        </div>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <AlertDialogAction
            onClick={handleDelete}
            disabled={!isConfirmed}
            className="w-full bg-destructive hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
          >
            Delete My Account
          </AlertDialogAction>
          <AlertDialogCancel className="w-full rounded-xl">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
