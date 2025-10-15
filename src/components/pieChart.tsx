"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartConfig } from "@/components/ui/chart";

export const description = "A pie chart showing task status with labels";

const chartData = [
  { status: "Pending", total: 5, fill: "#ED3F27" },
  { status: "InProgress", total: 8, fill: "#FEB21A" },
  { status: "Completed", total: 12, fill: "#255F38" },
];

const chartConfig = {
  total: {
    label: "Total Tasks",
  },
  Pending: {
    label: "Pending",
    color: "#ED3F27",
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
  return (
    <Card className="flex flex-col bg-[#FDF4E3] shadow-[8px_8px_0px_#222222] border border-black">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Tasks</CardTitle>
        <CardDescription>Overview of task progress</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
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
              innerRadius={40}
              outerRadius={80}
              label={({ status }) => status}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
