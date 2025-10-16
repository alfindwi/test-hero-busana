"use client";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { useAppDispatch } from "@/store";
import { getTaskById } from "@/store/task/async";
import type { TaskDetail } from "@/type/ITask";

export default function TaskDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<TaskDetail | null>(null);

  useEffect(() => {
    dispatch(getTaskById(Number(id))).then((res) => setTask(res.payload));
  }, [dispatch, id]);

  const getStatusColor = (status: string) => {
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

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 font-mono">
      <Button
        variant="outline"
        className="mb-4 border border-black shadow-[4px_4px_0px_#222] hover:shadow-[2px_2px_0px_#222]"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Back
      </Button>

      <Card className="border border-black shadow-[8px_8px_0px_#222] bg-[#f4fafa]">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{task.name}</CardTitle>
          <p className="text-sm text-gray-600">
            Assigned to: {task.assignee.name}
          </p>
          <p className="text-sm text-gray-600">Role : {task.assignee.role}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">Description:</p>
            <p className="text-gray-700">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Start Date:</p>
              <p>{new Date(task.startDate).toLocaleString().split(",")[0]}</p>
            </div>
            <div>
              <p className="font-semibold">End Date:</p>
              <p>{new Date(task.endDate).toLocaleString().split(",")[0]}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">Status:</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-2">Status Logs:</p>
            {task.logs.length === 0 ? (
              <p className="text-gray-500">No status changes yet.</p>
            ) : (
              <ul className="border border-black rounded-md divide-y divide-black bg-white">
                {task.logs.map((log) => (
                  <li key={log.id} className="p-3">
                    <p>
                      <strong>From:</strong> {log.previous_status} →{" "}
                      <strong>{log.new_status}</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      Changed at: {new Date(log.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
