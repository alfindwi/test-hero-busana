"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModalInputTask } from "@/components/modalInputTask";
import { ModalEditTask } from "@/components/modalEditTask";
import { PaginationComponent } from "@/components/pagination";
import { Pencil, Trash, Eye } from "lucide-react";
import { ModalDeleteTask } from "@/components/modalDeleteCompany";
import type { ITask } from "@/type/ITask";



export default function TaskPage() {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: "1",
      name: "Create dashboard UI",
      status: "pending",
      description:
        "Create a dashboard UI using React and Tailwind CSS.",
      startDate: "2023-01-01",
      endDate: "2023-02-01",
      assignedTo: 1,
    },
    {
      id: "2",
      name: "Integrate API",
      status: "in-progress",
      description:
        "Integrate backend API endpoints into dashboard using Axios.",
      startDate: "2023-01-05",
      endDate: "2023-02-10",
      assignedTo: 1,
    },
    {
      id: "3",
      name: "Deploy to Vercel",
      status: "completed",
      description:
        "Deploy the frontend app to Vercel and configure environment variables.",
      startDate: "2023-02-01",
      endDate: "2023-02-15",
      assignedTo: 1,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  const getStatusColor = (status: ITask["status"]) => {
    switch (status) {
      case "pending":
        return "bg-red-500 text-white";
      case "in-progress":
        return "bg-yellow-400 text-black";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "";
    }
  };

  return (
    <div className="w-full mt-10 max-w-6xl mx-auto px-4 py-3 font-mono">
      <div className="flex mt-5 flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold tracking-tight text-black">
          Task List
        </h2>

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
        <Table className="bg-[#f2f7f5] text-black font-mono w-full min-w-[800px]">
          <TableHeader>
            <TableRow className="bg-[#e8efed]">
              <TableHead className="w-[50px] hidden md:table-cell">#</TableHead>
              <TableHead className="min-w-[180px]">Title</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Start Date</TableHead>
              <TableHead className="hidden md:table-cell">End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TableRow key={task.id} className="hover:bg-[#e9f0ee] transition">
                  <TableCell className="hidden md:table-cell font-semibold">
                    {index + 1}
                  </TableCell>

                  <TableCell className="font-medium">{task.name}</TableCell>

                  <TableCell
                    className="hidden md:table-cell text-sm text-gray-700 max-w-[250px] truncate"
                    title={task.description}
                  >
                    {task.description}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-sm">
                    {task.startDate}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-sm">
                    {task.endDate}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status === "pending"
                        ? "Pending"
                        : task.status === "in-progress"
                        ? "In Progress"
                        : "Completed"}
                    </span>
                  </TableCell>

                  <TableCell className="flex justify-center gap-2">
                    <Link to={`/tasks/${task.id}`}>
                      <button className="bg-[#f2f7f5] border border-black rounded shadow-[3px_3px_0px_#343131] px-2 py-1 text-sm hover:scale-105 transition">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <ModalEditTask
                      trigger={
                        <button className="bg-[#f2f7f5] border border-black rounded shadow-[3px_3px_0px_#343131] px-2 py-1 text-sm hover:scale-105 transition">
                          <Pencil className="w-4 h-4" />
                        </button>
                      }
                    />
                    <ModalDeleteTask
                      trigger={
                        <button className="bg-[#f2f7f5] border border-black rounded shadow-[3px_3px_0px_#343131] px-2 py-1 text-sm hover:scale-105 transition">
                          <Trash className="w-4 h-4" />
                        </button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
