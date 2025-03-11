"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import { AlertBanner } from "@/components/ui/alert-banner";
import WhatsAppLink from "@/components/dashboard/whatsapp/whatsappLink";
import WhatsAppMessage from "@/components/dashboard/whatsapp/whatsappMessage";
import { WhatsAppNumbers } from "@/components/dashboard/whatsapp/whatsappNumbers";
import useTranslations from "@/hooks/useTranslations";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

const WhatsAppPage = () => {
  const searchParams = useSearchParams();
  const translate = useTranslations("Pages.Dashboard.Whatsapp");

  const [serverError, setServerError] = useState<boolean | null>(null);

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const projectName = decodeURIComponent(searchParams.get("project") || "");

  const {
    data: userProjects,
    isLoading: isUserProjectsLoading,
    refetch,
  } = useQuery({
    queryKey: ["userProjects", projectName],
    queryFn: async () => {
      // CLIENT SIDE
      const supabase = await createClient();

      const { data, error }: any = await supabase
        .from("projects")
        .select()
        .eq("user_id", userProfileData?.user_id)
        .eq("title", projectName);

      if (error) {
        setServerError(true);
      }

      return data[0];

      // SERVER SIDE
      // GetUserProjects({ userId: userProfileData?.user_id });
    },
    enabled: Boolean(!!userProfileData?.user_id && !!projectName),
  }) as any;

  const breadcrumbItems = [
    { href: "/dashboard/whatsapp", label: "Whatsapp", icon: MessageCircle },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={translate["pageTitle"]}
      pageDescription={translate["pageDescription"]}
    >
      {serverError && (
        <div className="container mb-10">
          <AlertBanner message={translate["alertMessage"]} type="error" />
        </div>
      )}
      {!projectName ? (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7 text-center">
            {!projectName ? translate["noProject"] : translate["noData"]}
          </div>
        </div>
      ) : (
        <>
          <WhatsAppLink
            isLoading={userProfileIsLoading || isUserProjectsLoading}
            link={userProjects?.wp_link}
            projectId={userProjects?.id}
            refetch={refetch}
          />
          <WhatsAppMessage
            isLoading={userProfileIsLoading || isUserProjectsLoading}
            message={userProjects?.wp_message}
            projectId={userProjects?.id}
          />
          <WhatsAppNumbers
            isLoading={userProfileIsLoading}
            numbers={userProjects?.wp_numbers}
            projectId={userProjects?.id}
            refetch={refetch}
            userPlan={userProfileData?.plan}
          />
        </>
      )}
    </PageLayout>
  );
};

export default WhatsAppPage;
