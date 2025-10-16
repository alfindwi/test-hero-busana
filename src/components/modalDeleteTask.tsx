import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { ITask } from "@/type/ITask";

interface ModalDeleteCompanyProps {
  task: ITask | null;
  trigger?: React.ReactNode;
}

export function ModalDeleteTask({
  task,
  trigger,
}: ModalDeleteCompanyProps) {
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="text-sm px-3 py-1">
            Delete
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-[#FFFDF6] text-black border border-black rounded-lg font-mono shadow-[8px_8px_0px_#222222]">
        <DialogHeader>
          <DialogTitle className="text-lg">dqwdqwd</DialogTitle>
          <DialogDescription className="text-sm">
            Are you sure you want to delete this task?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <DialogClose asChild>
            <Button type="submit"  variant="red">
              Delete
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
