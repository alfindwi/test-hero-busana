"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TaskDetail } from "@/type/ITask";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState<TaskDetail | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      setTask(data);
    };
    fetchTask();
  }, [id]);

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto mt-30 text-center font-mono text-gray-600">
        Loading task detail...
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-red-500 text-white";
      case "inprogress":
        return "bg-yellow-500 text-black";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-30 px-4 font-mono">
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
            Assigned to: User #{task.assignedTo}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">Description:</p>
            <p className="text-gray-700">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Start Date:</p>
              <p>{new Date(task.startDate).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">End Date:</p>
              <p>{new Date(task.endDate).toLocaleString()}</p>
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
