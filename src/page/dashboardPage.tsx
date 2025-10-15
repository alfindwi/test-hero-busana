import { ModalInputTask } from "@/components/modalInputTask";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  return (
    <div className="w-full mt-10 max-w-6xl mx-auto px-4 py-3 ">
      <div className="flex  mt-5 flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="w-full flex justify-end md:w-auto">
          <ModalInputTask
            trigger={
              <Button
                variant="blue"
                className="w-24 md:w-25 text-sm py-2 px-4 mb-4 shadow-[6px_6px_0px_#222222] active:shadow-[4px_4px_0px_#222222] transition-all duration-150"
              >
                Create
              </Button>
            }
          />
        </div>
      </div>

      <div className="rounded-lg shadow-[8px_8px_0px_#222222] border border-black overflow-x-auto">
        <Table className="bg-[#f2f7f5] text-black font-mono w-full min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] hidden md:table-cell">#</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="hidden md:table-cell">Applied At</TableHead>
              <TableHead className="hidden md:table-cell">Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
             <TableRow>
               
                <TableCell className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                  qdiwqnd
                </TableCell>
                <TableCell className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                  doqwdbn
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  101029
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  wkwk
                </TableCell>
                <TableCell>DONE</TableCell>
                
              </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
