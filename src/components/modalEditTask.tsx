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

interface ModalEditTaskProps {
  task?: ITask | null;
  trigger?: React.ReactNode;
  users?: { id: string; name: string }[];
  onSubmit?: (updatedTask: ITask) => void;
}

export function ModalEditTask({
  task,
  trigger,
  users,
  onSubmit,
}: ModalEditTaskProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );
  const [assignedTo, setAssignedTo] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description || "");
      setStatus(task.status);
      setAssignedTo(task.assignedTo);
      setStartDate(task.startDate || "");
      setEndDate(task.endDate || "");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    onSubmit({
      ...task,
      name,
      description,
      status,
      assignedTo,
      startDate,
      endDate,
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
            Perbarui detail task yang sudah ada.
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
              className="text-sm"
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Membuat fitur login menggunakan JWT..."
              rows={3}
              className="text-sm resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <InputDate onChangeDate={setStartDate} value={startDate} />
            <InputDate onChangeDate={setEndDate} value={endDate} />
          </div>

          <div className="grid gap-2">
            <Label>Assigned To</Label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(parseInt(e.target.value))}
              className="bg-[#fffdf6] border border-[#f2f1ed] rounded-md px-3 py-2 text-sm focus:outline-none"
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
                  e.target.value as "pending" | "in-progress" | "completed"
                )
              }
              className="bg-[#fffdf6] border border-[#f2f1ed] rounded-md px-3 py-2 text-sm focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
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
