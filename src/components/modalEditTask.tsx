"use client";

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
import { Textarea } from "@/components/ui/textarea";
import type { ITask } from "@/type/ITask";
import React, { useState, useEffect } from "react";
import { InputDate } from "./ui/inputDate";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateTask } from "@/store/task/async";

interface ModalEditTaskProps {
  task?: ITask | null;
  trigger?: React.ReactNode;
  onSubmit?: (updatedTask: ITask) => void;
}

export function ModalEditTask({ task, trigger, onSubmit }: ModalEditTaskProps) {
  if (!task) return null;
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Pending" | "InProgress" | "Completed">(
    "Pending"
  );
  const [assignedTo, setAssignedTo] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description || "");
      const normalizedStatus =
        task.status === "Pending"
          ? "Pending"
          : task.status === "InProgress"
          ? "InProgress"
          : "Completed";

      setStatus(normalizedStatus);
      setAssignedTo(task.assignedTo);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
    }
  }, [task]);

  const normalizeStatus = (
    s: "Pending" | "InProgress" | "Completed"
  ): "Pending" | "InProgress" | "Completed" => {
    switch (s) {
      case "Pending":
        return "Pending";
      case "InProgress":
        return "InProgress";
      case "Completed":
        return "Completed";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    const updatedData = {
      name,
      description,
      status: normalizeStatus(status),
      assignedTo: Number(assignedTo),
      startDate,
      endDate,
    };

    await dispatch(
      updateTask({
        id: Number(task.id),
        data: updatedData,
      })
    );

    onSubmit?.({
      ...task,
      ...updatedData,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="text-sm px-3 py-1">
            Edit
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="bg-[#FFFDF6] text-black border border-black rounded-lg font-mono 
        shadow-[6px_6px_0px_#222222] 
        max-w-[95%] sm:max-w-lg w-full p-4 sm:p-6 overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader className="text-center sm:text-left">
          <DialogTitle className="text-lg font-bold">Edit Task</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Edit the task details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <div className="grid gap-2">
            <Label>
              Task Title<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Implement login feature"
              className="text-sm border border-[#9a9a9a]"
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Membuat fitur login menggunakan JWT..."
              rows={3}
              className="text-sm border border-[#9a9a9a]"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <InputDate
              onChangeDate={setStartDate}
              value={startDate}
              text="Start Date"
            />
            <InputDate
              onChangeDate={setEndDate}
              value={endDate}
              text="End Date"
            />
          </div>

          <div className="grid gap-2">
            <Label>Assigned To</Label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(parseInt(e.target.value))}
              className="bg-[#fffdf6] border border-[#9a9a9a] rounded-md px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label>
              Status<span className="text-red-500">*</span>
            </Label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "Pending" | "InProgress" | "Completed"
                )
              }
              className="bg-[#fffdf6] border border-[#9a9a9a] rounded-md px-3 py-2 text-sm focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full sm:w-auto mt-5"
              variant="blue"
            >
              Save Changes
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
