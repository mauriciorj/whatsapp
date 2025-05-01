import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserProfile } from "./useUserProfile";
import DeleteCampaign from "@/actions/deleteProject/actions";
import { Tables } from "@/db/types/database.types";
import { DELETE_MAGIC_WORD, PAGES } from "@/lib/constants";
import generateRandomCode from "@/lib/generateCode";
import {
  deleteDialogSchema,
  editDialogSchema,
} from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

const queryCampaigns = (user: Tables<"user_profile">) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userCampaign", user?.company_id],
    queryFn: async () => {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("campaigns")
        .select("id, title, company_id")
        .eq("company_id", user?.company_id);

      if (error) {
        throw new Error(error.message);
      }

      return (
        data?.sort((a, b) => {
          if (a?.title && b?.title) {
            return a.title.localeCompare(b.title);
          } else {
            return 0;
          }
        }) || []
      );
    },
    enabled: !!user?.company_id, // Only run the query if we have a company_id
  }) as {
    data: Tables<"campaigns">[];
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    data,
    isLoading,
    errorMessage: error,
    refetch,
  };
};

export function useCampaigns({
  campaignName,
  translate,
}: {
  campaignName?: string | null;
  translate?: any | undefined;
}) {
  const router = useRouter();

  const [campaignToDialog, setCampaignToDialog] =
    useState<Tables<"campaigns"> | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data: user, errorMessage: userErrorMessage } = useUserProfile();

  const {
    data,
    isLoading,
    errorMessage: campaignsErrorMessage,
    refetch,
  } = queryCampaigns(user);

  if (userErrorMessage || campaignsErrorMessage) {
    setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
  }

  const createCampaignForm = useForm({
    defaultValues: {
      campaign: "",
    },
    validators: {
      onChange({ value }) {
        if (
          data?.some(
            (item: Tables<"campaigns">) => item.title === value.campaign
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
          user_id: user?.user_id,
        });
        if (error) {
          setSuccessMessage(null);
          setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
        } else {
          createCampaignForm.reset();
          setErrorMessage(null);
          setSuccessMessage(translate["createCampaignForm"]["successMessage"]);
          refetch();
          router.push(`/dashboard/whatsapp?campaign=${value.campaign}`);
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
      }
    },
  });

  const deleteCampaignForm = useForm({
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
          const result = await DeleteCampaign(campaignToDialog);
          if (result?.status >= 400) {
            setIsDeleteModalOpen(false);
            setCampaignToDialog(null);
            setSuccessMessage(null);
            setErrorMessage(translate["createCampaignForm"]["alertMessage"]);
            refetch();
          } else {
            if (campaignName) {
              router.replace(PAGES.dashboard.campaigns);
              router.refresh();
            }
            setIsDeleteModalOpen(false);
            setErrorMessage(null);
            setCampaignToDialog(null);
            setSuccessMessage(
              translate["deleteCampaignForm"]["successMessage"]
            );
            createCampaignForm.reset();
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

  const editCampaignForm = useForm({
    defaultValues: {
      campaignName: campaignToDialog?.title || '',
      campaignStartDate: null,
      campaignEndDate: null,
    },
    validators: {
      onSubmit: editDialogSchema,
    },
    onSubmit: async ({ value }: { value: { campaignName: string } }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      console.log("editar campanha: ", value?.campaignName);
    },
  });

  return {
    campaignToDialog,
    createCampaignForm,
    data,
    deleteCampaignForm,
    editCampaignForm,
    errorMessage,
    isLoading,
    isEditModalOpen,
    isDeleteModalOpen,
    setCampaignToDialog,
    setIsDeleteModalOpen,
    setIsEditModalOpen,
    setSuccessMessage,
    successMessage,
  };
}
