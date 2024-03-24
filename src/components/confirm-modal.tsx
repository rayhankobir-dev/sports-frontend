/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/lib/utils/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/utils/ui/dialog";

export function ConfirmDialog({
  isOpen,
  setIsOpen,
  action,
  title,
  description,
}: any) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader>
          <DialogTitle>{title || "Are you want to confirm?"}</DialogTitle>
          <DialogDescription>
            {description ||
              "This actions can not be undo, so please be carefull."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5 flex gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="px-8">
              Cancle
            </Button>
          </DialogClose>

          <Button
            onClick={() => {
              setIsOpen(false);
              action();
            }}
            type="button"
            variant="default"
            className="bg-green-600 hover:bg-green-500 px-8"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
