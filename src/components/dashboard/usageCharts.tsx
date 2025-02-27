"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
// import getWhatsappTracking from "@/actions/getWhatsappTracking/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/db/supabase/client";
import getGroupedCounts from "@/lib/formatReport";
import { useQuery } from "@tanstack/react-query";
import LineChart from "./lineChart";
import TableDeviceSystem from "./tableDeviceSystem";
import TableDeviceType from "./tableDeviceType";
import TableRegion from "./tableRegion";

export function UsageCharts({ userId }: { userId: string }) {
  const [reportPeriod, setReportPeriod] = useState<number>(7);
  const [reportPerDayData, setReportPerDayData] = useState<any>(null);
  const [reportPerDeviceSizeData, setReportPerDeviceSizeData] =
    useState<any>(null);
  const [reportPerDeviceSystemData, setReportPerDeviceSystemData] =
    useState<any>(null);
  const [reportPerCountryAndCityData, setreportPerCountryAndCityData] =
    useState<any>(null);

  const supabase = createClient();

  const timeTemp = new Date(
    new Date().setDate(new Date().getDate() - reportPeriod)
  ).toISOString();

  // const { data, isFetching, refetch } = useQuery({
  //   queryKey: ["whatsappTracking", reportPeriod],
  //   queryFn: async () => getWhatsappTracking({ userId, period: reportPeriod }),
  // });

  const { data, isFetching, refetch } = useQuery<any>({
    queryKey: ["whatsappTracking", reportPeriod],
    queryFn: async () =>
      await supabase
        .from("whatsapp_tracking")
        .select("created_at, country, city, device_size, device_system", {
          count: "exact",
        })
        .eq("user_id", userId)
        .gte("created_at", timeTemp)
        .order("created_at", { ascending: true }),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data?.data) {
      const {
        reportPerDay,
        reportPerDeviceSize,
        reportPerDeviceSystem,
        reportPerCountryAndCity,
      } = getGroupedCounts(data?.data);
      if (reportPerDay) {
        setReportPerDayData(reportPerDay);
      }
      if (reportPerDeviceSize) {
        setReportPerDeviceSizeData(reportPerDeviceSize);
      }
      if (reportPerDeviceSystem) {
        setReportPerDeviceSystemData(reportPerDeviceSystem);
      }
      if (reportPerCountryAndCity) {
        setreportPerCountryAndCityData(reportPerCountryAndCity);
      }
    }
  }, [data?.data]);

  return (
    <div className="w-full bg-card rounded-lg">
      <div className="w-full flex justify-end mt-6">
        <div className="w-full md:w-fit flex flex-row mb-5 items-center justify-end">
          <div
            onClick={() => (Boolean(data?.data?.length) ? refetch() : null)}
            className={`${
              Boolean(!data?.data?.length) &&
              "cursor-not-allowed opacity-50 [&>span]:line-clamp-1"
            }flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm mr-2 hover:bg-accent cursor-pointer`}
          >
            <RefreshCcw
              className={`${isFetching ? "animate-spin" : null} h-5 w-5`}
            />
          </div>
          <Select
            onValueChange={(e) => setReportPeriod(parseInt(e))}
            defaultValue={reportPeriod.toString()}
            disabled={Boolean(!data?.data?.length)}
          >
            <SelectTrigger>
              <SelectValue placeholder="7 dias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Periodo: 7 dias</SelectItem>
              <SelectItem value="14">Periodo: 14 dias</SelectItem>
              <SelectItem value="30">Periodo: 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {Boolean(data?.data?.length) ? (
        <>
          <LineChart data={reportPerDayData} isLoading={isFetching} />
          <TableRegion
            data={reportPerCountryAndCityData}
            isLoading={isFetching}
          />
          <TableDeviceType
            data={reportPerDeviceSizeData}
            isLoading={isFetching}
          />
          <TableDeviceSystem
            data={reportPerDeviceSystemData}
            isLoading={isFetching}
          />
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7">
            Sem dados para serem mostrados no momento.
          </div>
        </div>
      )}
    </div>
  );
}
