"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteProperty } from "@/actions/properties";
import { toast } from "sonner";

export function DeletePropertyButton({
  propertyId,
  title,
}: {
  propertyId: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteProperty(propertyId);
        toast.success("Listing deleted");
        setOpen(false);
      } catch {
        toast.error("Couldn't delete this listing. Try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        size="icon-sm"
        className="text-destructive hover:bg-destructive/10"
        onClick={() => setOpen(true)}
        aria-label={`Delete ${title}`}
      >
        <Trash2 className="size-4" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this listing?</DialogTitle>
          <DialogDescription>
            &ldquo;{title}&rdquo; and its photos will be permanently removed.
            This can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending ? "Deleting..." : "Delete listing"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
