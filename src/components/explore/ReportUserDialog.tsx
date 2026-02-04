import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ReportUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  onReport: (reason: string) => void;
}

const reportReasons = [
  { id: "spam", label: "Spam or scam" },
  { id: "harassment", label: "Harassment or bullying" },
  { id: "inappropriate", label: "Inappropriate content" },
  { id: "impersonation", label: "Impersonation" },
  { id: "other", label: "Other" },
];

const ReportUserDialog = ({
  open,
  onOpenChange,
  userName,
  onReport,
}: ReportUserDialogProps) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const handleReport = (e: React.MouseEvent) => {
    e.preventDefault();
    const reason = selectedReason === "other" ? otherReason : selectedReason;
    if (reason) {
      onReport(reason);
      setSelectedReason("");
      setOtherReason("");
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Report {userName}</AlertDialogTitle>
          <AlertDialogDescription>
            Please select a reason for reporting this user. We take all reports
            seriously.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <RadioGroup
            value={selectedReason}
            onValueChange={setSelectedReason}
            className="space-y-3"
          >
            {reportReasons.map((reason) => (
              <div key={reason.id} className="flex items-center space-x-3">
                <RadioGroupItem value={reason.id} id={reason.id} />
                <Label htmlFor={reason.id} className="cursor-pointer">
                  {reason.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selectedReason === "other" && (
            <Textarea
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Please describe the issue..."
              className="mt-3"
              rows={3}
            />
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReport}
            disabled={!selectedReason || (selectedReason === "other" && !otherReason)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Report
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReportUserDialog;
