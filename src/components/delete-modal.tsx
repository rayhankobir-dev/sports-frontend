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

export function DeleteDialog({ isOpen, setIsOpen, action }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you want to delete?</DialogTitle>
          <DialogDescription>
            This actions can not be undo, so please be carefull.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5 sm:justify-end">
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
            variant="destructive"
            className="px-8"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
