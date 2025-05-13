import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import getReport from "@/features/reports/lib/getReports";
import getGroupedCounts from "@/features/reports/lib/formatReport";

const useReports = () => {
  const searchParams = useSearchParams();

  const [reportsPeriod, setReportsPeriod] = useState<number>(7);
  const [reportsPerDayData, setReportsPerDayData] = useState<any>(null);
  const [reportsPerDeviceSizeData, setReportsPerDeviceSizeData] =
    useState<any>(null);
  const [reportsPerDeviceSystemData, setReportsPerDeviceSystemData] =
    useState<any>(null);
  const [reportsPerCountryAndCityData, setreportsPerCountryAndCityData] =
    useState<any>(null);

  const campaignName = searchParams.get("campaign");

  const { data, error, isLoading, refetch } = getReport({
    reportsPeriod,
  });

  useEffect(() => {
    refetch();
  }, [campaignName, refetch]);

  useEffect(() => {
    if (data?.length) {
      const {
        reportPerDay,
        reportPerDeviceSize,
        reportPerDeviceSystem,
        reportPerCountryAndCity,
      } = getGroupedCounts(data);

      if (reportPerDay) {
        setReportsPerDayData(reportPerDay);
      }
      if (reportPerDeviceSize) {
        setReportsPerDeviceSizeData(reportPerDeviceSize);
      }
      if (reportPerDeviceSystem) {
        setReportsPerDeviceSystemData(reportPerDeviceSystem);
      }
      if (reportPerCountryAndCity) {
        setreportsPerCountryAndCityData(reportPerCountryAndCity);
      }
    }
  }, [data]);

  return {
    data,
    error,
    isLoading,
    refetch,
    reportsPeriod,
    reportsPerDayData,
    reportsPerDeviceSizeData,
    reportsPerDeviceSystemData,
    reportsPerCountryAndCityData,
    setReportsPeriod,
  };
};

export default useReports;
