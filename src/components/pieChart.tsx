"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartConfig } from "@/components/ui/chart";
import { useAppDispatch, useAppSelector } from "@/store";
import { getTaskSummary } from "@/store/task/async";
import { useEffect } from "react";

export const description = "A pie chart showing task status with labels";

const chartConfig = {
  total: {
    label: "Total Tasks",
  },
  Pending: {
    label: "Pending",
    color: "#EF4444",
  },
  InProgress: {
    label: "In Progress",
    color: "#FEB21A",
  },
  Completed: {
    label: "Completed",
    color: "#255F38",
  },
} satisfies ChartConfig;

export function ChartPieWithLabels() {
  const dispatch = useAppDispatch();
  const { tasks: chartData } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTaskSummary());
  }, [dispatch]);
  return (
    <Card className="flex flex-col bg-[#FDF4E3] shadow-[8px_8px_0px_#222222] border border-black">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Tasks</CardTitle>
        <CardDescription>Overview of task progress</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="status"
                stroke="0"
                innerRadius="50%"
                outerRadius="80%"
                label={({ status, total }) => (total > 0 ? status : "")}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
       
      </CardContent>
    </Card>
  );
}
