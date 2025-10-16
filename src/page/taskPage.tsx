"use client";

import { useEffect, useState } from "react";
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
import { ModalDeleteTask } from "@/components/modalDeleteTask";
import { getTask } from "@/store/task/async";
import { useAppDispatch, useAppSelector } from "@/store";
import type { ITask } from "@/type/ITask";

export default function TaskPage() {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);

  const filterStatus =
    selectedStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === selectedStatus);

  const totalPages = Math.ceil((filterStatus?.length ?? 0) / itemsPerPage);
  const currentTask = Array.isArray(filterStatus)
    ? filterStatus.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const getStatusColor = (status: ITask["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-[#EF4444] text-white";
      case "InProgress":
        return "bg-[#FBBF24] text-black";
      case "Completed":
        return "bg-[#22C55E] text-white";
      default:
        return "";
    }
  };

  const handleFilterChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="w-full mt-20 max-w-6xl mx-auto px-4 py-3 font-mono">
      <div className="flex mt-5 flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold tracking-tight text-black">
          Task List
        </h2>

        <div className="w-full flex justify-end md:w-auto gap-5">
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700 text-sm">Filter:</label>
            <select
              value={selectedStatus}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="border border-black rounded-md py-2 px-3 text-sm shadow-[5px_5px_0px_#222222]"
            >
              <option value="All" >All</option>
              <option value="Pending" >Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
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
      </div>

      <div className="rounded-lg shadow-[8px_8px_0px_#222222] border border-black overflow-x-auto">
        <Table className="bg-[#f2f7f5] text-black font-mono w-full min-w-[800px]">
          <TableHeader>
            <TableRow className="bg-[#e8efed]">
              <TableHead className="min-w-[180px]">Title</TableHead>
              <TableHead className="hidden md:table-cell min-w-[250px]">
                Description
              </TableHead>
              <TableHead className="hidden md:table-cell">Start Date</TableHead>
              <TableHead className="hidden md:table-cell">End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentTask.length > 0 ? (
              currentTask.map((tasks) => (
                <TableRow key={tasks.id}>
                  <TableCell className="font-medium">{tasks.name}</TableCell>

                  <TableCell
                    className="hidden md:table-cell text-sm text-gray-700 max-w-[250px] truncate"
                    title={tasks.description}
                  >
                    {tasks.description}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-sm">
                    {new Date(tasks.startDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-sm">
                    {new Date(tasks.endDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        tasks.status
                      )}`}
                    >
                      {tasks.status === "Pending"
                        ? "Pending"
                        : tasks.status === "InProgress"
                        ? "In Progress"
                        : "Completed"}
                    </span>
                  </TableCell>

                  <TableCell className="flex justify-center gap-2">
                    <Link to={`/tasks/${tasks.id}`}>
                      <button className="bg-[#f2f7f5] border border-black rounded shadow-[3px_3px_0px_#343131] px-2 py-1 text-sm hover:scale-105 transition">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <ModalEditTask
                      task={tasks}
                      trigger={
                        <button className="bg-[#f2f7f5] border border-black rounded shadow-[3px_3px_0px_#343131] px-2 py-1 text-sm hover:scale-105 transition">
                          <Pencil className="w-4 h-4" />
                        </button>
                      }
                    />
                    <ModalDeleteTask
                      task={tasks}
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
