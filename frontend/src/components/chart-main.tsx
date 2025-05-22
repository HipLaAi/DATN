"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../component/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../component/ui/chart"
import { useEffect, useState } from "react"
import { getCardInWeekAPI } from "../services/Card/Card.service"

const chartConfig = {
  card_count: {
    label: "Công việc cần phải làm: ",
    color: "#f54949",
  },
} satisfies ChartConfig

export function ChartMain() {
  const [filteredData, setFilteredData] = useState<any[]>([]) // Sửa kiểu dữ liệu để rõ ràng hơn

  const fetchActivityUserByRange = async () => {
    try {
      const response = await getCardInWeekAPI();
      setFilteredData(response);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  useEffect(() => {
    fetchActivityUserByRange();
  }, []);

  return (
    <Card className="@container/card rounded-xl">
      <CardHeader className="relative">
        <CardTitle>Thống kê công việc trong 1 tuần</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {filteredData && filteredData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="card_count" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-card_count)"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-card_count)"
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
                  const date = new Date(value);
                  return date.toLocaleDateString("vi-VN", {
                    month: "short",
                    day: "numeric",
                  });
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
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="card_count"
                type="natural"
                fill="url(#card_count)"
                stroke="var(--color-card_count)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] items-center justify-center text-gray-500">
            Không có dữ liệu để hiển thị
          </div>
        )}
      </CardContent>
    </Card>
  );
}
