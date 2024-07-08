"use client";

import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api"; 
import { Id } from "../../convex/_generated/dataModel";

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  complete: {
    label: "Complete",
    color: "hsl(var(--chart-1))",
  },
  incomplete: {
    label: "Incomplete",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ProgressChart({ params }: { params: { projectId: Id<"projects"> } }) {
  const projectId = params?.projectId;

  // get completed and incomplete tasks
  const completedTasksData = useQuery(api.tasks.getCompletedTasks, { projectId: projectId, status: 'Completed'  });
  const incompleteTasksData = useQuery(api.tasks.getIncompletedTasks, { projectId: projectId, status: 'Incomplete' });

  // create chartData based on the tasks
  const chartData = React.useMemo(() => {
    const completedTasks = completedTasksData?.length || 0;
    const incompleteTasks = incompleteTasksData?.length || 0;

    return [
      { status: "complete", tasks: completedTasks, fill: "var(--color-complete)" },
      { status: "incomplete", tasks: incompleteTasks, fill: "var(--color-incomplete)" },
    ];
  }, [completedTasksData, incompleteTasksData]);

  // calculate total tasks and completion percentage
  const totalTasks = chartData.reduce((acc, curr) => acc + curr.tasks, 0);
  const completedTasks = chartData.find((item) => item.status === "complete")?.tasks || 0;
  const completionPercentage = totalTasks === 0 ? 0 : ((completedTasks / totalTasks) * 100).toFixed(0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Total Progress</CardTitle>
        <CardDescription>Total progress for this project.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {totalTasks > 0 ? (
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
                dataKey="tasks"
                nameKey="status"
                innerRadius={75}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalTasks.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Tasks
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="text-center text-neutral-500 text-sm">
            No tasks found for this project.
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Based on your input, you've completed{" "}
          <span className="inline-block text-primary font-bold">
            {completionPercentage}%
          </span>{" "}
          of this project.
        </div>
      </CardFooter>
    </Card>
  );
}
