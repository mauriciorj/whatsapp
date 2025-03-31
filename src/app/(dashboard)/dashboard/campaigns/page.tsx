"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PanelsTopLeft, Plus } from "lucide-react";
import DeleteCampaign from "@/actions/deleteProject/actions";
import PageLayout from "@/components/dashboard/pageLayout";
import CampaignsCard from "@/components/dashboard/campaigns/campaignsCard";
import CampaignsDialog from "@/components/dashboard/campaigns/campaignsDialog";
import CampaignsLoadingCard from "@/components/dashboard/campaigns/campaignsLoadingCard";
import Form from "@/components/form";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { CampaignsType } from "@/db/types/types";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUserCampaigns } from "@/hooks/useUserCampaigns";
import useTranslations from "@/hooks/useTranslations";
import BusinessRules from "@/lib/businessRules";
import { DELETE_MAGIC_WORD, PAGES } from "@/lib/constants";
import generateRandomCode from "@/lib/generateCode";
import { deleteDialogSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

export default function CampaignsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const translate = useTranslations("Pages.Dashboard.Campaigns");

  const campaignName = searchParams?.get("campaign") || null;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [campaignToBeDeleted, setCampaignToBeDeleted] =
    useState<CampaignsType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { user: userProfileData, isLoading: isUserProfileDataLoading } =
    useUserProfile();

  const {
    campaigns: userCampaigns,
    isLoading: isCampaignsLoading,
    refetch,
  } = useUserCampaigns();

  const deleteForm = useForm({
    defaultValues: {
      deleteWord: "",
    },
    validators: {
      onSubmit: deleteDialogSchema,
    },
    onSubmit: async ({ value }: { value: { deleteWord: string } }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      if (value?.deleteWord === DELETE_MAGIC_WORD) {
        try {
          const result = await DeleteCampaign(campaignToBeDeleted);
          if (result?.status >= 400) {
            setIsModalOpen(false);
            setCampaignToBeDeleted(null);
            setSuccessMessage(null);
            setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
            refetch();
          } else {
            if (campaignName) {
              router.replace(PAGES.dashboard.campaigns);
              router.refresh();
            }
            setIsModalOpen(false);
            setErrorMessage(null);
            setCampaignToBeDeleted(null);
            setSuccessMessage(translate["deleteCampaignForm"]["successMessage"]);
            form.reset();
            refetch();
          }
        } catch {
          setSuccessMessage(null);
          setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
        }
      } else {
        setSuccessMessage(null);
        setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      campaign: "",
    },
    validators: {
      onChange({ value }) {
        if (
          userCampaigns?.some(
            (item: CampaignsType) => item.title === value.campaign
          )
        ) {
          return {
            fields: {
              campaign:
                translate["createCampaignForm"]["fields"]["campaign"][
                  "fieldError"
                ],
            },
          };
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }: { value: { campaign: string } }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        const supabase = await createClient();

        const checkIfCodeExists = async (randomCodeToLink: string) => {
          const { data } = await supabase
            .from("campaigns")
            .select()
            .eq("wp_link", randomCodeToLink);
          return data;
        };

        const getUniqueCode = async () => {
          let code: boolean | string = false;
          while (code === false) {
            const getCode = await generateRandomCode();
            const check = await checkIfCodeExists(getCode);
            if (!check?.length) code = getCode;
          }
          return code;
        };

        const randomUniqueCode = await getUniqueCode();
        const { error } = await supabase.from("campaigns").insert({
          wp_link: randomUniqueCode,
          title: value.campaign,
          user_id: userProfileData?.user_id,
        });
        if (error) {
          setSuccessMessage(null);
          setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
        } else {
          form.reset();
          setIsOpenForm(false);
          setErrorMessage(null);
          // setSuccessMessage(translate["createCampaignForm"]["successMessage"]);
          refetch();
          router.push(`/dashboard/whatsapp?campaign=${value.campaign}`);
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
      }
    },
  });

  const onClickHandler = ({ campaign }: { campaign: string }) => {
    router.push(`/dashboard/reports?campaign=${campaign}`);
  };

  const hasCampaign = Boolean(userCampaigns?.length > 0);
  const maxCampaignsNumbers = userProfileData?.plan
    ? BusinessRules[userProfileData?.plan]?.campaigns
    : 0;
  const canAddMoreCampaigns = Boolean(
    userCampaigns?.length > 0 || userCampaigns?.length < maxCampaignsNumbers
  );

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
        userProfileData?.first_name &&
        `${translate["pageTitle"]} ${userProfileData?.first_name}`
      }
    >
      {errorMessage && (
        <div className="container mb-10">
          <AlertBanner
            message={translate["createCampaignForm"]["alertMessage"]}
            type="error"
          />
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
        <DefaultCard description={getCardDescription} title={getCardTitle}>
          {hasCampaign && (
            <CampaignsCard
              onClickHandler={onClickHandler}
              campaignCardTitle={translate["campaignCardTitle"]}
              campaignName={campaignName}
              setIsModalOpen={setIsModalOpen}
              setCampaignToBeDeleted={setCampaignToBeDeleted}
              translate={translate}
              userCampaigns={userCampaigns}
            />
          )}
          {!isCampaignsLoading &&
            !isUserProfileDataLoading &&
            (isOpenForm || !hasCampaign) && (
              <div className="mt-10">
                <div className="h-[1px] border-b mb-5"></div>
                <Form
                  cancelButtonLabel={
                    translate["createCampaignForm"]["cancelLabel"]
                  }
                  fieldsToRender={[
                    {
                      countChar: true,
                      countCharMaxChar: 50,
                      label:
                        translate["createCampaignForm"]["fields"]["campaign"][
                          "label"
                        ],
                      maxLength: 50,
                      name: translate["createCampaignForm"]["fields"]["campaign"][
                        "name"
                      ],
                      placeholder:
                        translate["createCampaignForm"]["fields"]["campaign"][
                          "placeholder"
                        ],
                      type: "text",
                    },
                  ]}
                  form={form}
                  onCancel={() => {
                    form.reset();
                    setIsOpenForm(false);
                  }}
                  submitLabel={translate["createCampaignForm"]["submitLabel"]}
                  submitLoadingLabel={
                    translate["createCampaignForm"]["submitLoadingLabel"]
                  }
                />
              </div>
            )}
          <div className="flex flex-row w-full justify-end mt-8">
            {canAddMoreCampaigns && hasCampaign && (
              <Button
                onClick={() => {
                  setIsOpenForm(true);
                  setSuccessMessage(null);
                }}
                variant="outline"
              >
                <div className="flex flex-row items-center">
                  <span>{translate["createCampaignForm"]["addCampaignLabel"]}</span>{" "}
                  <Plus className="h-4 w-4 ml-2" />
                </div>
              </Button>
            )}
          </div>
        </DefaultCard>
      )}
      <CampaignsDialog
        form={deleteForm}
        isModalOpen={isModalOpen}
        campaignToBeDeleted={campaignToBeDeleted}
        setIsModalOpen={setIsModalOpen}
        translate={translate["deleteCampaignForm"]["dialog"]}
      />
    </PageLayout>
  );
}
