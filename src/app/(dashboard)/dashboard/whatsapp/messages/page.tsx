"use client";

import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
// import Form from "@/components/form";
// import WhatsappMessagesForm from "@/features/whatsapp/components/messages/whatsappMessagesForm";
// import WhatsAppMessages from "@/features/whatsapp/components/messages/whatsappMessages";
// import DraggableWhatsAppMessages from "@/features/whatsapp/components/messages/draggableWhatsAppMessages";
// import AlertBanner from "@/components/ui/alert-banner";
import useTranslations from "@/hooks/useTranslations";

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const translations = useTranslations("Pages.Dashboard.Messages");

  const campaignName = decodeURIComponent(searchParams.get("campaign") || "");

  // const reorderMutation = useMutation({
  //   mutationFn: async (reorderedMessages: any[]) => {
  //     const supabase = await createClient();
  //     const { error } = await supabase
  //       .from("campaigns")
  //       .update({ wp_messages: reorderedMessages })
  //       .eq("id", userCampaigns?.id);

  //     if (error) {
  //       setServerError(true);
  //       return false;
  //     }
  //     return true;
  //   },
  //   onSuccess: () => {
  //     refetch();
  //   },
  // });

  // const handleMessagesReorder = (reorderedMessages: any[]) => {
  //   reorderMutation.mutate(reorderedMessages);
  // };

  const breadcrumbItems = [
    { href: "/dashboard/messages", label: "Mensagens", icon: MessageCircle },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle={translations["pageTitle"]}
      pageDescription={translations["pageDescription"]}
    >
      <div className="container mb-10">
        {/* <AlertBanner message={errorMessage} type="error" /> */}
      </div>
      {!campaignName ? (
        <div className="w-full flex flex-col items-center justify-center h-[100px]">
          <div className="border rounded-md py-5 px-7 text-center">
            {!campaignName
              ? translations["noCampaign"]
              : translations["noData"]}
          </div>
        </div>
      ) : (
        <>
          {/* <WhatsappMessagesForm
            form={createWhatsappMessageForm}
            translations={
              createWhatsappMessageFormTranslations
            }
            isLoading={isLoading}
          /> */}
          {/* <WhatsAppMessages
              isLoading={isLoading}
              messages={userCampaigns?.wp_messages || []}
              campaignId={userCampaigns?.id}
              refetch={refetch}
            />
            {userCampaigns?.wp_messages?.length > 0 && (
              <div className="mt-6">
                <DraggableWhatsAppMessages
                  messages={userCampaigns?.wp_messages}
                  // onReorder={handleMessagesReorder}
                  title={translations["messageListTitle"]}
                />
              </div>
            )} */}
        </>
      )}
    </PageLayout>
  );
}
