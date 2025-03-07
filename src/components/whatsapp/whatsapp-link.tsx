"use client";

import { useEffect, useState } from "react";
import WhatsAppLinkDialog from "./whatsapp-link-dialog";
import WhatsAppLinkHoverCards from "./whatsapp-link-hovers";
import DefaultCard from "@/components/layout/defaultCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { linkSchema } from "@/lib/validations/schemas";
import { useForm } from "@tanstack/react-form";
import useTranslations from "@/hooks/useTranslations";
import { createClient } from "@/db/supabase/client";
import generateRandomCode from "@/lib/generateCode";
import { AlertBanner } from "../ui/alert-banner";

const WhatsAppLink = ({
  isLoading,
  link,
  projectId,
  refetch,
}: {
  isLoading: boolean;
  link: string;
  projectId: string;
  refetch: () => void;
}) => {
  const translate = useTranslations("Pages.Dashboard.Whatsapp.LinkComponent");
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
          .from("projects")
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
        .from("projects")
        .update({
          wp_link: randomUniqueCode,
        })
        .eq("id", projectId);
      if (error) {
        setServerErrorMessage(
          translate["hoverCards"]["generateRandomLinkErrorMessage"]
        );
      } else {
        setSuccessMessage(
          translate["hoverCards"]["generateRandomLinkSuccessMessage"]
        );
        refetch();
      }
      setIsGenerateRandomLinkLoading(false);
    } catch {
      setIsGenerateRandomLinkLoading(false);
      setServerErrorMessage(
        translate["hoverCards"]["generateRandomLinkErrorMessage"]
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

  const form = useForm({
    defaultValues: {
      link: "",
    },
    validators: {
      onSubmit: linkSchema,
    },
    onSubmit: async ({ value }: any) => {
      console.log("value => ", value);
    },
  });

  return (
    <div className="mb-10">
      <DefaultCard title={translate["componentTitle"]}>
        {serverErrorMessage && (
          <div className="container mb-10">
            <AlertBanner message={serverErrorMessage} type="error" />
          </div>
        )}
        {successMessage && (
          <div className="container mb-10">
            <AlertBanner message={successMessage} type="success" />
          </div>
        )}
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
              translate={translate}
            />
          </div>
        </div>
      </DefaultCard>
      <WhatsAppLinkDialog
        form={form}
        isModalOpen={isModalOpen}
        personalizedLink={personalizedLink}
        setIsModalOpen={setIsModalOpen}
        setPersonalizedLink={(e: string) => setPersonalizedLink(e)}
        translate={translate}
      />
    </div>
  );
};

export default WhatsAppLink;
