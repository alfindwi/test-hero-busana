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
import { useAppDispatch } from "@/store";
import { deleteTask, getTask } from "@/store/task/async";
import type { ITask } from "@/type/ITask";
import toast from "react-hot-toast";

interface ModalDeleteTaskProps {
  task: ITask | null;
  trigger?: React.ReactNode;
}

export function ModalDeleteTask({
  task,
  trigger,
}: ModalDeleteTaskProps) {
    const dispatch = useAppDispatch();
    if(!task) return null
  
  const onSubmit = async () => {
    try {
      const res = await dispatch(deleteTask(task.id));
      if (deleteTask.fulfilled.match(res)) {
        toast.success("Delete successful!", {
          duration: 3000,
          icon: "🚀",
          style: {
            background: "#3A7D44",
            color: "#FCFAEE",
            fontWeight: "600",
            borderRadius: "6px",
            boxShadow: "5px 5px 0px #222222",
            fontFamily: "monospace",
          },
        });
        dispatch(getTask());
      }
    } catch (error) {
      console.log(error);
      const errorMessage = (error as { error?: string })?.error ?? "";
      toast.error(errorMessage, {
        duration: 3000,
        icon: "🚀",
        style: {
          background: "#B8001F",
          color: "#FCFAEE",
          fontWeight: "600",
          borderRadius: "6px",
          boxShadow: "5px 5px 0px #222222",
          fontFamily: "monospace",
        },
      });
    }
  };

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
            <Button type="submit" onClick={onSubmit}  variant="red">
              Delete
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
