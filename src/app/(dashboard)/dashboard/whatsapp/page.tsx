"use client";

import { MessageCircle } from "lucide-react";
import GetUserProfile from "@/actions/getUserProfile/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import WhatsAppLink from "@/components/whatsapp/whatsapp-link";
import { WhatsAppNumbers } from "@/components/whatsapp/whatsapp-numbers";
import { useQuery } from "@tanstack/react-query";

const WhatsAppPage = () => {
  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const breadcrumbItems = [
    { href: "/dashboard/whatsapp", label: "Whatsapp", icon: MessageCircle },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle="Whatsapp"
      pageDescription="Gerencie seu link e números."
    >
      <WhatsAppLink
        isLoading={userProfileIsLoading}
        link={userProfileData?.whatsapp?.link}
      />
      <WhatsAppNumbers
        isLoading={userProfileIsLoading}
        numbers={userProfileData?.whatsapp?.numbers}
        userInfo={userProfileData}
      />
    </PageLayout>
  );
};

export default WhatsAppPage;
