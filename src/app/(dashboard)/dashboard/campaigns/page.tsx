"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PanelsTopLeft, Plus } from "lucide-react";
import PageLayout from "@/components/dashboard/pageLayout";
import CampaignsCard from "@/components/dashboard/campaigns/campaignsCard";
import CampaignsDeleteDialog from "@/components/dashboard/campaigns/campaignsDeleteDialog";
import CampaignsEditDialog from "@/components/dashboard/campaigns/campaignsEditDialog";
import CampaignsLoadingCard from "@/components/dashboard/campaigns/campaignsLoadingCard";
import Form from "@/components/form";
import ContentCard from "@/components/layout/contentCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Card } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useCampaigns } from "@/hooks/useCampaigns";
import useTranslations from "@/hooks/useTranslations";

export default function CampaignsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const translate = useTranslations("Pages.Dashboard.Campaigns");

  const campaignName = searchParams?.get("campaign") || null;

  const { data: user, isLoading: isUserProfileDataLoading } = useUserProfile();

  const {
    campaignToDialog,
    createCampaignForm,
    data: userCampaigns,
    editCampaignForm,
    deleteCampaignForm,
    errorMessage,
    isLoading: isCampaignsLoading,
    isEditModalOpen,
    isDeleteModalOpen,
    setCampaignToDialog,
    setIsDeleteModalOpen,
    setIsEditModalOpen,
    setSuccessMessage,
    successMessage,
  } = useCampaigns({ campaignName, translate });

  const onClickHandler = ({ campaign }: { campaign: string }) => {
    router.push(`/dashboard/reports?campaign=${campaign}`);
  };

  const hasCampaign = Boolean(userCampaigns?.length > 0);
  // const maxCampaignsNumbers = user?.plan
  //   ? BusinessRules[user?.plan]?.campaigns
  //   : 0;
  // const canAddMoreCampaigns = Boolean(
  //   userCampaigns?.length > 0 || userCampaigns?.length < maxCampaignsNumbers
  // );
  const canAddMoreCampaigns = true;

  const getCardTitle = hasCampaign
    ? translate["createCampaignForm"]["cardTitleTwo"]
    : translate["createCampaignForm"]["cardTitle"];

  const getCardDescription = hasCampaign
    ? translate["createCampaignForm"]["cardDescriptionTwo"]
    : translate["createCampaignForm"]["cardDescription"];

  const breadcrumbItems = [
    { href: "/dashboard/campaigns", label: "Campanhas", icon: PanelsTopLeft },
  ];

  return (
    <PageLayout
      breadcrumbItems={breadcrumbItems}
      isLoading={isUserProfileDataLoading}
      pageTitle={
        user?.first_name
          ? `${translate["pageTitle"]} ${user?.first_name}`
          : translate["pageTitle"]
      }
    >
      {errorMessage && (
        <div className="container mb-10">
          <AlertBanner message={errorMessage} type="error" />
        </div>
      )}
      {successMessage && (
        <div className="container mb-10">
          <AlertBanner message={successMessage} type="success" />
        </div>
      )}
      {isCampaignsLoading || isUserProfileDataLoading ? (
        <CampaignsLoadingCard />
      ) : (
        <ContentCard description={getCardDescription} title={getCardTitle}>
          <div className="flex flex-col w-full items-center justify-center">
            <Card className="w-full max-w-lg px-10 pb-10">
              {!isCampaignsLoading && !isUserProfileDataLoading && (
                <div className="mt-10">
                  <Form
                    // cancelButtonLabel={
                    //   translate["createCampaignForm"]["cancelLabel"]
                    // }
                    fieldsToRender={[
                      {
                        countChar: true,
                        countCharMaxChar: 50,
                        label:
                          translate["createCampaignForm"]["fields"]["campaign"][
                            "label"
                          ],
                        maxLength: 50,
                        name: translate["createCampaignForm"]["fields"][
                          "campaign"
                        ]["name"],
                        placeholder:
                          translate["createCampaignForm"]["fields"]["campaign"][
                            "placeholder"
                          ],
                        type: "text",
                      },
                    ]}
                    form={createCampaignForm}
                    // onCancel={() => {
                    //   createCampaignForm.reset();
                    //   setIsOpenForm(false);
                    // }}
                    submitLabel={translate["createCampaignForm"]["submitLabel"]}
                    submitLoadingLabel={
                      translate["createCampaignForm"]["submitLoadingLabel"]
                    }
                  />
                </div>
              )}
            </Card>
          </div>
          <div className="h-[1px] border-b mt-10 mb-10" />
          {/* <div className="flex flex-row w-full justify-end mt-8">
            {canAddMoreCampaigns && hasCampaign && (
              <Button
                onClick={() => {
                  setIsOpenForm(true);
                  setSuccessMessage(null);
                }}
                variant="outline"
              >
                <div className="flex flex-row items-center">
                  <span>
                    {translate["createCampaignForm"]["addCampaignLabel"]}
                  </span>{" "}
                  <Plus className="h-4 w-4 ml-2" />
                </div>
              </Button>
            )}
          </div> */}
          {hasCampaign && (
            <CampaignsCard
              onClickHandler={onClickHandler}
              campaignCardTitle={translate["campaignCardTitle"]}
              campaignName={campaignName}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              setCampaignToDialog={setCampaignToDialog}
              translate={translate}
              userCampaigns={userCampaigns}
            />
          )}
        </ContentCard>
      )}
      <CampaignsDeleteDialog
        form={deleteCampaignForm}
        isModalOpen={isDeleteModalOpen}
        campaignToDialog={campaignToDialog}
        setIsModalOpen={setIsDeleteModalOpen}
        translate={translate["deleteCampaignForm"]["dialog"]}
      />
      <CampaignsEditDialog
        form={editCampaignForm}
        isModalOpen={isEditModalOpen}
        campaignToDialog={campaignToDialog}
        setIsModalOpen={setIsEditModalOpen}
        translate={translate["editCampaignForm"]["dialog"]}
      />
    </PageLayout>
  );
}
