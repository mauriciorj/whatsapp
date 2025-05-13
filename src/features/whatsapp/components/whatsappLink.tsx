"use client";

import { useEffect, useState } from "react";
import WhatsAppLinkDialog from "./whatsappLinkDialog";
import WhatsAppLinkHoverCards from "./whatsappLinkHovers";
import ContentCard from "@/components/layout/contentCard";
import AlertBanner from "@/components/ui/alert-banner";
import { Input } from "@/components/ui/input";
import Skeleton from "@/components/ui/skeleton";
import createClient from "@/db/supabase/client";
import useTranslations from "@/hooks/useTranslations";
import generateRandomCode from "@/lib/generateCode";
import { linkSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

const WhatsAppLink = ({
  isLoading,
  link,
  campaignId,
  refetch,
}: {
  isLoading: boolean;
  link?: string | null;
  campaignId?: string;
  refetch: () => void;
}) => {
  const translations = useTranslations(
    "Pages.Dashboard.Whatsapp.LinkComponent"
  );

  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [personalizedLink, setPersonalizedLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const [isGenerateRandomLinkLoading, setIsGenerateRandomLinkLoading] =
    useState(false);

  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const baseLink = link ? `https://zaprouter.pro/wp/${link}` : "";

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(baseLink);
      setIsCopied(true);
    }
  };

  const generateRandomLink = async () => {
    setServerErrorMessage(null);
    setSuccessMessage(null);
    setIsGenerateRandomLinkLoading(true);
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
      const { error } = await supabase
        .from("campaigns")
        .update({
          wp_link: randomUniqueCode,
        })
        .eq("id", campaignId);
      if (error) {
        setServerErrorMessage(
          translations["hoverCards"]["generateRandomLinkErrorMessage"]
        );
      } else {
        setSuccessMessage(
          translations["hoverCards"]["generateRandomLinkSuccessMessage"]
        );
        refetch();
      }
      setIsGenerateRandomLinkLoading(false);
    } catch {
      setIsGenerateRandomLinkLoading(false);
      setServerErrorMessage(
        translations["hoverCards"]["generateRandomLinkErrorMessage"]
      );
    }
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const mutation = useMutation({
    mutationFn: async (entries) => {
      setServerErrorMessage(null);
      setSuccessMessage(null);

      // CLIENT SIDE
      const supabase = await createClient();
      const { error } = await supabase
        .from("campaigns")
        .update({
          wp_link: entries,
        })
        .eq("id", campaignId);

      if (error) {
        setServerErrorMessage(translations["alertMessage"]);
        return false;
      } else {
        return true;
      }
    },
    onError: () => {
      setIsFormLoading(false);
      setSuccessMessage(null);
      setIsModalOpen(false);
      linkForm.reset();
      return setServerErrorMessage(translations["dialog"]["alertMessage"]);
    },
    onSuccess: () => {
      setIsFormLoading(false);
      setSuccessMessage(translations["dialog"]["successMessage"]);
      setIsModalOpen(false);
      setServerErrorMessage(null);
      linkForm.reset();
      refetch();
      return setSuccessMessage(translations["dialog"]["successMessage"]);
    },
  });

  const linkForm = useForm({
    defaultValues: {
      link: "",
    },
    validators: {
      onSubmit: linkSchema,
    },
    onSubmit: async ({ value }: any) => {
      setIsFormLoading(true);
      return await mutation.mutate(value?.link as any);
    },
  });

  return (
    <div className="mb-10">
      <ContentCard title={translations["componentTitle"]}>
        <div className="container mb-10">
          <AlertBanner message={serverErrorMessage} type="error" />
        </div>
        <div className="container mb-10">
          <AlertBanner message={successMessage} type="success" />
        </div>
        <div className="flex gap-4">
          <div className="w-full relative">
            {isLoading && (
              <div className="absolute left-3 top-2">
                <Skeleton className="h-6 w-[270px]" />
              </div>
            )}
            <Input
              className="font-mono"
              id="myWhatsAppLink"
              readOnly
              value={baseLink}
            />
          </div>
        </div>
        <WhatsAppLinkHoverCards
          copyToClipboard={copyToClipboard}
          generateRandomLink={generateRandomLink}
          isCopied={isCopied}
          isGenerateRandomLinkLoading={isGenerateRandomLinkLoading}
          setIsModalOpen={() => {
            setIsModalOpen(true);
            setServerErrorMessage(null);
            setSuccessMessage(null);
          }}
          translations={translations}
        />
      </ContentCard>
      <WhatsAppLinkDialog
        form={linkForm}
        isLoading={isFormLoading}
        isModalOpen={isModalOpen}
        personalizedLink={personalizedLink}
        setIsModalOpen={setIsModalOpen}
        setPersonalizedLink={(e: string) => setPersonalizedLink(e)}
        translations={translations}
      />
    </div>
  );
};

export default WhatsAppLink;
