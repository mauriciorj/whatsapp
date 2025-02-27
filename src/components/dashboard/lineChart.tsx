import { MousePointerClick } from "lucide-react";
import {
  Line,
  LineChart as LineChartGraph,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LineChart = ({ data, isLoading }: { data: any; isLoading: boolean }) => (
  <div className="w-full h-[300px] bg-card py-6 rounded-lg">
    <div className="w-full flex flex-row justify-between mb-5">
      <div className="flex flex-row items-center mb-4">
        <MousePointerClick className="mr-2 h-8 w-8" />
        <h3 className="text-2xl font-semibold">Cliques por dia</h3>
      </div>
    </div>
    <div className="w-full h-full">
      {isLoading && (
        <Card className="w-full h-[300px] p-6">
          <Skeleton className="h-7 w-36 mb-4" />
          <div className="h-[calc(100%-40px)]">
            <Skeleton className="w-full h-full" />
          </div>
        </Card>
      )}
      {Boolean(data?.length) && !isLoading && (
        <ResponsiveContainer>
          <LineChartGraph
            data={data}
            margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{ color: "black" }}
              labelStyle={{ color: "black" }}
              itemStyle={{ color: "black" }}
            />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChartGraph>
        </ResponsiveContainer>
      )}
      {/* {Boolean(!data?.length) && !isLoading && (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7">
            Sem dados para serem mostrados no momento.
          </div>
        </div>
      )} */}
    </div>
  </div>
);

export default LineChart;
