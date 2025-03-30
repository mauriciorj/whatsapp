"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import { WhatsAppMessages } from "@/components/dashboard/whatsapp/messages/whatsappMessages";
import DraggableWhatsAppMessages from "@/components/dashboard/whatsapp/messages/draggableWhatsAppMessages";
import { AlertBanner } from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";
import { createClient } from "@/supabase/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import GetUserProfile from "@/actions/getUserProfile/actions";

const MessagesPage = () => {
  const searchParams = useSearchParams();
  const translate = useTranslations("Pages.Dashboard.Messages");

  const [serverError, setServerError] = useState<boolean | null>(null);

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  });

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  const { data: userCampaigns, refetch } = useQuery({
    queryKey: ["userCampaigns", campaignName],
    queryFn: async () => {
      // CLIENT SIDE
      const supabase = await createClient();

      const { data, error }: any = await supabase
        .from("campaigns")
        .select()
        .eq("user_id", userProfileData?.user_id)
        .eq("title", campaignName);

      if (error) {
        setServerError(true);
      }

      return data?.[0];
    },
    enabled: Boolean(!!userProfileData?.user_id && !!campaignName),
  }) as any;

  const reorderMutation = useMutation({
    mutationFn: async (reorderedMessages: any[]) => {
      const supabase = await createClient();
      const { error } = await supabase
        .from("campaigns")
        .update({ wp_messages: reorderedMessages })
        .eq("id", userCampaigns?.id);

      if (error) {
        setServerError(true);
        return false;
      }
      return true;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleMessagesReorder = (reorderedMessages: any[]) => {
    reorderMutation.mutate(reorderedMessages);
  };

  const breadcrumbItems = [
    { href: "/dashboard/whatsapp", label: "Whatsapp", icon: MessageCircle },
  ];

  console.log("");
  console.log("");
  console.log("userCampaigns.wp_messages => ", userCampaigns?.wp_messages);

  const test = [
    { title: "a", content: "a", id: "1", createdAt: "2025-03-03" },
    { title: "b", content: "b", id: "2", createdAt: "2025-03-03" },
    { title: "c", content: "c", id: "3", createdAt: "2025-03-03" },
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
      {!campaignName ? (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7 text-center">
            {!campaignName ? translate["noCampaign"] : translate["noData"]}
          </div>
        </div>
      ) : (
        <>
          <WhatsAppMessages
            isLoading={userProfileIsLoading}
            messages={userCampaigns?.wp_messages || []}
            campaignId={userCampaigns?.id}
            refetch={refetch}
            userPlan={userProfileData?.plan}
          />

          {/* {userCampaigns?.wp_messages?.length > 0 && ( */}
            <div className="mt-6">
              <DraggableWhatsAppMessages
                messages={test}
                onReorder={handleMessagesReorder}
                title={translate["messagesQueueTitle"]}
              />
            </div>
          {/* )} */}
        </>
      )}
    </PageLayout>
  );
};

export default MessagesPage;
