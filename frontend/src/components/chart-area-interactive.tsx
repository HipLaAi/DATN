"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../component/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../component/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../component/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../component/ui/toggle-group"
import { useEffect, useState } from "react"
import { getActivityUserByRangeAPI } from "../services/User/user.service"

const chartConfig = {
  user_count: {
    label: "người dùng hoạt động: ",
    color: "#69faa4"
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("month")
  const [filteredData, setFilteredData] = useState<any>()

  const fetchActivityUserByRange = async (range: any) => {
    try {
      const response = await getActivityUserByRangeAPI(range);
      setFilteredData(response);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  useEffect(() => {
    fetchActivityUserByRange(timeRange);
  }, [timeRange]);

  return (
    <Card className="@container/card rounded-xl">
      <CardHeader className="relative">
        <CardTitle>Thống kê người dùng hoạt động theo ngày</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Tổng số người dùng hoạt động gần đây
          </span>
          <span className="@[540px]/card:hidden">Tổng số người dùng hoạt động gần đây</span>
        </CardDescription>
        <div className="absolute right-4 top-4 rounded-xl">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden rounded-xl"
          >
            <ToggleGroupItem value="month" className="h-8 px-2.5">
              30 ngày gần nhất
            </ToggleGroupItem>
            <ToggleGroupItem value="week" className="h-8 px-2.5">
              7 ngày gần nhất
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40 rounded-xl"
              aria-label="Select a value"
            >
              <SelectValue placeholder="30 ngày gần dây nhất" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="month" className="rounded-lg">
                30 ngày gần nhất
              </SelectItem>
              <SelectItem value="week" className="rounded-lg">
                7 ngày gần nhất
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="user_count" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-user_count)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-user_count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("vi-VN", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("vi-VN", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="user_count"
              type="natural"
              fill="url(#user_count)"
              stroke="var(--color-user_count)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
