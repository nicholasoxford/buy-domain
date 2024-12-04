import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NameserverList from "./NameserverList";
import { toast } from "sonner";

interface NameserversDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domain: string;
  initialNameservers?: string[];
}

export function NameserversDialog({
  open,
  onOpenChange,
  domain,
  initialNameservers = ["", ""],
}: NameserversDialogProps) {
  const [nameservers, setNameservers] = useState<string[]>(initialNameservers);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const filteredNameservers = nameservers.filter((ns) => ns.trim() !== "");

      if (filteredNameservers.length < 2) {
        toast.error("At least 2 nameservers are required");
        return;
      }

      const response = await fetch(`/api/domains/${domain}/nameservers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameservers: filteredNameservers }),
      });

      if (!response.ok) {
        throw new Error("Failed to update nameservers");
      }

      toast.success("Nameservers updated successfully");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update nameservers"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-slate-900">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl">Update Nameservers</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set the nameservers for {domain}. At least 2 nameservers are
            required.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <NameserverList
            nameservers={nameservers}
            onChange={setNameservers}
            disabled={isLoading}
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
