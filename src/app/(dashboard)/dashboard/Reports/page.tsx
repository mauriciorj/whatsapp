"use client";

import { useSearchParams } from "next/navigation";
import { ChartSpline } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import LineChart from "@/features/reports/components/lineChart";
import TableDeviceSystem from "@/features/reports/components/tableDeviceSystem";
import TableDeviceType from "@/features/reports/components/tableDeviceType";
import TableRegion from "@/features/reports/components/tableRegion";
import PeriodSelector from "@/features/reports/components/periodSelector";
import useTranslations from "@/hooks/useTranslations";
import AlertBanner from "@/components/ui/alert-banner";
import useReports from "@/features/reports/hooks/useReports";

export default function ReportsPage() {
  const searchParams = useSearchParams();
  const translations = useTranslations("Pages.Dashboard.Reports");

  const campaignName = searchParams.get("campaign");

  const {
    data: reports,
    error: errorReports,
    isLoading: isLoadingReports,
    refetch,
    reportsPeriod,
    reportsPerDayData,
    reportsPerDeviceSizeData,
    reportsPerDeviceSystemData,
    reportsPerCountryAndCityData,
    setReportsPeriod,
  } = useReports();

  const breadcrumbItems = [
    { href: "/dashboard/relatorios", label: "Relatórios", icon: ChartSpline },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      isLoading={isLoadingReports}
      pageTitle={translations["pageTitle"]}
      pageDescription={translations["pageDescription"]}
    >
      <>
        <PeriodSelector
          dataLength={Boolean(reports?.length)}
          isLoading={isLoadingReports}
          refetch={refetch}
          reportPeriod={reportsPeriod}
          setReportPeriod={setReportsPeriod}
          translations={translations}
        />

        {errorReports && (
          <div className="container mb-10">
            <AlertBanner message={translations["alertMessage"]} type="error" />
          </div>
        )}
        {Boolean(reports?.length) ? (
          <>
            <LineChart data={reportsPerDayData} isLoading={isLoadingReports} />
            <TableRegion
              data={reportsPerCountryAndCityData}
              isLoading={isLoadingReports}
            />
            <TableDeviceType
              data={reportsPerDeviceSizeData}
              isLoading={isLoadingReports}
            />
            <TableDeviceSystem
              data={reportsPerDeviceSystemData}
              isLoading={isLoadingReports}
            />
          </>
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7 text-center">
              {!campaignName
                ? translations["noCampaign"]
                : translations["noData"]}
            </div>
          </div>
        )}
      </>
    </PageLayout>
  );
}
