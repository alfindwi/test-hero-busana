"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { getAllUserTask } from "@/store/user/async";
import { useEffect } from "react";

export const description = "User Task Progress Chart";

const chartConfig = {
  pending: {
    label: "Pending",
    color: "#EF4444",
  },
  inProgress: {
    label: "In Progress",
    color: "#FBBF24",
  },
  completed: {
    label: "Completed",
    color: "#22C55E",
  },
} satisfies ChartConfig;

export function ChartBar() {
  const dispatch = useAppDispatch();
  const { users: chartData, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUserTask());
  }, [dispatch]);
  return (
    <Card className="bg-[#FDF4E3] shadow-[8px_8px_0px_#222222] border border-black">
      <CardHeader>
        <CardTitle>User Task Progress</CardTitle>
        <CardDescription>
          Comparison of Pending, In Progress, and Completed tasks
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey="pending"
              fill={chartConfig.pending.color}
              radius={6}
            />
            <Bar
              dataKey="inProgress"
              fill={chartConfig.inProgress.color}
              radius={6}
            />
            <Bar
              dataKey="completed"
              fill={chartConfig.completed.color}
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing task activity for each user
        </div>
      </CardFooter>
    </Card>
  );
}
