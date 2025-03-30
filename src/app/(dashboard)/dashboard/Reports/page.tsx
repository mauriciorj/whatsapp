"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChartSpline, RefreshCcw } from "lucide-react";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import LineChart from "@/components/dashboard/lineChart";
import TableDeviceSystem from "@/components/dashboard/tableDeviceSystem";
import TableDeviceType from "@/components/dashboard/tableDeviceType";
import TableRegion from "@/components/dashboard/tableRegion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useTranslations from "@/hooks/useTranslations";
import getGroupedCounts from "@/lib/formatReport";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { AlertBanner } from "@/components/ui/alert-banner";

export default function ReportsPage() {
  const searchParams = useSearchParams();
  const translate = useTranslations("Pages.Dashboard.Reports");

  const campaignName = searchParams.get("campaign");

  const [serverError, setServerError] = useState<boolean | null>(null);

  const [reportPeriod, setReportPeriod] = useState<number>(7);
  const [reportPerDayData, setReportPerDayData] = useState<any>(null);
  const [reportPerDeviceSizeData, setReportPerDeviceSizeData] =
    useState<any>(null);
  const [reportPerDeviceSystemData, setReportPerDeviceSystemData] =
    useState<any>(null);
  const [reportPerCountryAndCityData, setreportPerCountryAndCityData] =
    useState<any>(null);

  const timeTemp = new Date(
    new Date().setDate(new Date().getDate() - reportPeriod)
  ).toISOString();

  const { data: userProfileData, isLoading: isProfileDataLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const { data: userCampaigns, isLoading: isUserCampaignsLoading } = useQuery({
    queryKey: ["userCampaigns"],
    queryFn: async () => {
      // CLIENT SIDE
      const supabase = await createClient();

      const { data, error }: any = await supabase
        .from("campaigns")
        .select("id, title, user_id")
        .eq("user_id", userProfileData?.user_id);

      if (error) {
        setServerError(true);
      }

      return (
        data?.sort((a: any, b: any) => a.title.localeCompare(b.title)) || []
      );
    },
    enabled: !!userProfileData?.user_id,
  }) as any;

  const getCurrentCampaign = userCampaigns?.find(
    (campaign: any) => campaign.title === campaignName
  );

  const { data, isFetching, refetch } = useQuery<any>({
    queryKey: ["whatsappTracking", getCurrentCampaign?.id, reportPeriod],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("whatsapp_tracking")
        .select("created_at, country, city, device_size, device_system", {
          count: "exact",
        })
        .eq("user_id", userProfileData.user_id)
        .eq("campaign_id", getCurrentCampaign?.id)
        .gte("created_at", timeTemp)
        .order("created_at", { ascending: true });

      if (error) {
        setServerError(true);
      }

      return data || [];
    },
    enabled: Boolean(
      !!userProfileData?.user_id && !!campaignName && !!userCampaigns
    ),
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
  }, [data]);

  const breadcrumbItems = [
    { href: "/dashboard/relatorios", label: "Relatórios", icon: ChartSpline },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      isLoading={isProfileDataLoading || isUserCampaignsLoading}
      pageTitle={translate["pageTitle"]}
      pageDescription={translate["pageDescription"]}
    >
      <>
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
                <SelectItem value="7">
                  {translate["reportPeriods"]["sevenDays"]}
                </SelectItem>
                <SelectItem value="14">
                  {translate["reportPeriods"]["fourteenDays"]}
                </SelectItem>
                <SelectItem value="30">
                  {translate["reportPeriods"]["thirtiehDays"]}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {serverError && (
          <div className="container mb-10">
            <AlertBanner message={translate["alertMessage"]} type="error" />
          </div>
        )}
        {Boolean(data?.length) ? (
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
            <div className="border rounded-md py-5 px-7 text-center">
              {!campaignName ? translate["noCampaign"] : translate["noData"]}
            </div>
          </div>
        )}
      </>
    </PageLayout>
  );
}
