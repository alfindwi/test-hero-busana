
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModalInputTask {
  trigger?: React.ReactNode;
}

export function ModalInputTask({ trigger }: ModalInputTask) {
    return (
        <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="text-sm px-3 py-1">
            Edit
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-[#FFFDF6] text-black border border-black rounded-lg font-mono shadow-[8px_8px_0px_#222222]">
        <DialogHeader>
          <DialogTitle className="text-lg">Create Company</DialogTitle>
          <DialogDescription className="text-sm">
            Create company information, position, method and date
          </DialogDescription>
        </DialogHeader>

        <form >
          <div className="space-y-2 mt-4">
            <div className="grid gap-3">
              <Label>
                Company Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="PT. XYZ"
                required
              />
            </div>
            <div className="grid gap-3 mt-4">
              <Label>
                Position<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Fullstack Developer"
                required
              />
            </div>
            <div className="grid gap-3 mt-4">
              <Label>
                Application Method<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Email"
                required
              />
            </div>
            <div className="grid gap-3 mt-4">
              <Label htmlFor="status">
                Status<span className="text-red-500">*</span>
              </Label>
              <select
                id="status"
                value={status}
                required
                className="bg-[#fffdf6] border border-[#f2f1ed] rounded-md px-3 py-2 font-mono text-sm focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <DialogClose asChild>
            <Button type="submit" className="mt-4" variant={"blue"}>
              Save
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
    )
}