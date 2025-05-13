"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PanelsTopLeft } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import ContentCard from "@/components/layout/contentCard";
import AlertBanner from "@/components/ui/alert-banner";
import CampaignsCard from "@/features/campaigns/components/campaignsCard";
import CampaignsLoadingCard from "@/features/campaigns/components/campaignsLoadingCard";
import CreateCampaignsForm from "@/features/campaigns/components/createCampaignsForm";
import DeleteCampaignsDialog from "@/features/campaigns/components/deleteCampaignsDialog";
import UpdateCampaignsDialog from "@/features/campaigns/components/updateCampaignsDialog";
import createCampaign from "@/features/campaigns/lib/createCampaign";
import deleteCampaign from "@/features/campaigns/lib/deleteCampaign";
import getCampaigns from "@/features/campaigns/lib/getCampaigns";
import updateCampaign from "@/features/campaigns/lib/updateCampaign";
import getUserProfile from "@/features/user/lib/getUserProfile";
import useTranslations from "@/hooks/useTranslations";

export default function CampaignsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const translations = useTranslations("Pages.Dashboard.Campaigns");

  const campaignName = searchParams?.get("campaign") || null;

  const { userProfile, userProfileIsLoading } = getUserProfile();

  const {
    data: userCampaigns,
    isLoading: isLoadingGetCampaigns,
    errorMessage: errorMessageGetCampaigns,
    refetch,
  } = getCampaigns();

  const {
    errorMessage: createCampaignErrorMessage,
    form: createCampaignForm,
    formTranslation: createCampaignTranslations,
    successMessage: createCampaignSuccessMessage,
  } = createCampaign();

  const {
    deleteCampaignToDialog,
    errorMessage: deleteCampaignErrorMessage,
    form: deleteCampaignForm,
    formTranslation: deleteCampaignsTranslation,
    isDeleteCampaignModalOpen,
    setDeleteCampaignToDialog,
    setIsDeleteCampaignModalOpen,
    successMessage: deleteCampaignSuccessMessage,
  } = deleteCampaign();

  const {
    errorMessage: editCampaignErrorMessage,
    form: updateCampaignForm,
    formTranslation: updateCampaignTranslation,
    isUpdateCampaignModalOpen,
    updateCampaignToDialog,
    setIsUpdateCampaignModalOpen,
    setUpdateCampaignToDialog,
    successMessage: updateCampaignSuccessMessage,
  } = updateCampaign();

  const onClickHandler = ({ campaign }: { campaign: string }) => {
    router.push(`/dashboard/reports?campaign=${campaign}`);
  };

  const hasCampaign = Boolean(userCampaigns?.length > 0);

  const getCardTitle = hasCampaign
    ? createCampaignTranslations["cardTitleTwo"]
    : createCampaignTranslations["cardTitle"];

  const getCardDescription = hasCampaign
    ? createCampaignTranslations["cardDescriptionTwo"]
    : createCampaignTranslations["cardDescription"];

  const breadcrumbItems = [
    { href: "/dashboard/campaigns", label: "Campanhas", icon: PanelsTopLeft },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      isLoading={userProfileIsLoading}
      pageTitle={
        userProfile?.first_name
          ? `${translations["pageTitle"]} ${userProfile?.first_name}`
          : translations["pageTitle"]
      }
    >
      <div className="container mb-10">
        <AlertBanner
          message={
            errorMessageGetCampaigns ||
            createCampaignErrorMessage ||
            deleteCampaignErrorMessage ||
            editCampaignErrorMessage
          }
          type="error"
        />
      </div>
      <div className="container mb-10">
        <AlertBanner
          message={
            createCampaignSuccessMessage ||
            deleteCampaignSuccessMessage ||
            updateCampaignSuccessMessage
          }
          type="success"
        />
      </div>
      {isLoadingGetCampaigns || userProfileIsLoading ? (
        <CampaignsLoadingCard />
      ) : (
        <ContentCard description={getCardDescription} title={getCardTitle}>
          <div className="flex flex-col w-full items-center justify-center">
            <ContentCard
              className="w-full max-w-lg px-10 pb-10"
              title={createCampaignTranslations["createCampaignLabel"]}
            >
              {!isLoadingGetCampaigns && !userProfileIsLoading && (
                <div className="mt-10">
                  <CreateCampaignsForm
                    form={createCampaignForm}
                    translations={createCampaignTranslations}
                  />
                </div>
              )}
            </ContentCard>
          </div>
          <div className="h-[1px] border-b mt-10 mb-10" />
          {hasCampaign && (
            <CampaignsCard
              onClickHandler={onClickHandler}
              campaignCardTitle={translations["campaignCardTitle"]}
              campaignName={campaignName}
              setIsDeleteCampaignModalOpen={setIsDeleteCampaignModalOpen}
              setIsUpdateCampaignModalOpen={setIsUpdateCampaignModalOpen}
              setUpdateCampaignToDialog={setUpdateCampaignToDialog}
              setDeleteCampaignToDialog={setDeleteCampaignToDialog}
              translations={translations}
              userCampaigns={userCampaigns}
            />
          )}
        </ContentCard>
      )}
      <DeleteCampaignsDialog
        form={deleteCampaignForm}
        isModalOpen={isDeleteCampaignModalOpen}
        campaignToDialog={deleteCampaignToDialog}
        setIsModalOpen={setIsDeleteCampaignModalOpen}
        translations={deleteCampaignsTranslation["dialog"]}
      />
      <UpdateCampaignsDialog
        form={updateCampaignForm}
        isModalOpen={isUpdateCampaignModalOpen}
        campaignToDialog={updateCampaignToDialog}
        setIsModalOpen={setIsUpdateCampaignModalOpen}
        translations={updateCampaignTranslation["dialog"]}
      />
    </PageLayout>
  );
}
