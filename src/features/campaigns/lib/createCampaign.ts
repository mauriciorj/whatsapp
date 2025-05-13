"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import getCampaigns from "./getCampaigns";
import { Tables } from "@/db/types/database.types";
import getUserProfile from "@/features/user/lib/getUserProfile";
import useTranslations from "@/hooks/useTranslations";
import generateRandomCode from "@/lib/generateCode";
import createClient from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

const createCampaign = () => {
  const router = useRouter();

  const formTranslation = useTranslations("Features.CreateCampaignForm");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, errorMessage: getCampaignsErrorMessage } = getCampaigns();

  const { userProfile, userProfileErrorMessage } = getUserProfile();

  const form = useForm({
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
              campaign: formTranslation["fields"]["campaign"]["fieldError"],
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
          user_id: userProfile?.user_id,
        });
        if (error) {
          setSuccessMessage(null);
          setErrorMessage(formTranslation["alertMessage"]);
        } else {
          form.reset();
          setErrorMessage(null);
          setSuccessMessage(formTranslation["successMessage"]);
          // add useCampaigns and trigger the refetch
          // setIsRefetch(true);
          router.push(`/dashboard/whatsapp?campaign=${value.campaign}`);
        }
      } catch {
        setSuccessMessage(null);
        setErrorMessage(formTranslation["alertMessage"]);
      }
    },
  });

  return {
    errorMessage:
      getCampaignsErrorMessage || userProfileErrorMessage || errorMessage,
    form,
    formTranslation,
    successMessage,
  };
};

export default createCampaign;
