"use client";

import { ChartSpline } from "lucide-react";
import { UsageCharts } from "@/components/dashboard/usageCharts";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { data: userProfileData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const breadcrumbItems = [
    { href: "/dashboard/relatorios", label: "Relatórios", icon: ChartSpline },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle="Relatórios"
      pageDescription="Seus relatórios com as últimas informações"
    >
      <UsageCharts userId={userProfileData?.user_id} />
    </PageLayout>
  );
}
