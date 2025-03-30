"use client";

import { useState } from "react";
import Form from "@/components/form";
import DefaultCard from "@/components/layout/defaultCard";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Skeleton } from "@/components/ui/skeleton";
import useTranslations from "@/hooks/useTranslations";
import { campaignMessageSchema } from "@/lib/validations/schemas";
import { createClient } from "@/supabase/client";
import { useForm } from "@tanstack/react-form";

const WhatsAppMessage = ({
  isLoading,
  message,
  campaignId,
}: {
  isLoading: boolean;
  message: string;
  campaignId: string;
}) => {
  const translate = useTranslations(
    "Pages.Dashboard.Whatsapp.MessageComponent"
  );

  const [isShowSaveButton, setIsShowSaveButton] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      message: message || "",
    },
    validators: {
      onSubmit: campaignMessageSchema,
      onChange({ value }) {
        if (value?.message !== message) {
          setIsShowSaveButton(true);
        } else {
          setIsShowSaveButton(false);
        }

        return undefined;
      },
    },
    onSubmit: async ({ value }: any) => {
      // CLIENT SIDE
      const supabase = await createClient();

      setServerError(false);
      setSuccessMessage(false);

      const { error } = await supabase
        .from("campaigns")
        .update({
          wp_message: value.message,
        })
        .eq("id", campaignId);

      if (error) {
        setServerError(true);
      } else {
        setSuccessMessage(true);
      }
    },
  });

  return (
    <div className="mb-10">
      <DefaultCard
        description={translate["componentDescription"]}
        title={translate["componentTitle"]}
      >
        {serverError && (
          <AlertBanner message={translate["alertMessage"]} type="error" />
        )}
        {successMessage && (
          <AlertBanner message={translate["successMessage"]} type="success" />
        )}
        {isLoading ? (
          <div className="absolute left-3 top-2">
            <Skeleton className="h-6 w-[270px]" />
          </div>
        ) : (
          <Form
            cancelButtonLabel={
              isShowSaveButton ? translate["form"]["cancelLabel"] : null
            }
            fieldsToRender={[
              {
                countChar: true,
                countCharMaxChar: 200,
                label: translate["form"]["fields"]["message"]["label"],
                name: translate["form"]["fields"]["message"]["name"],
                type: "textArea",
              },
            ]}
            form={form}
            onCancel={() => {
              form.reset();
              setIsShowSaveButton(false);
            }}
            submitLabel={
              isShowSaveButton ? translate["form"]["submitLabel"] : null
            }
            submitLoadingLabel={translate["form"]["submitLoadingLabel"]}
          />
        )}
      </DefaultCard>
    </div>
  );
};

export default WhatsAppMessage;
