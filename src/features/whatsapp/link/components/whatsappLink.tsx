"use client";

import { useEffect, useState } from "react";
import WhatsAppLinkDialog from "./whatsappLinkDialog";
import WhatsAppLinkHoverCards from "./whatsappLinkHovers";
import ContentCard from "@/components/layout/contentCard";
import AlertBanner from "@/components/ui/alert-banner";
import { Input } from "@/components/ui/input";
import Skeleton from "@/components/ui/skeleton";
import UpdateWhatsappLink from "@/features/whatsapp/link/lib/updateWhatsappLink";
import useTranslations from "@/hooks/useTranslations";

const WhatsAppLink = ({
  isLoading,
  link,
  // refetch,
}: {
  isLoading: boolean;
  link?: string | null;
  // refetch: () => void;
}) => {
  const translations = useTranslations(
    "Pages.Dashboard.Whatsapp.LinkComponent"
  );

  const [isCopied, setIsCopied] = useState(false);
  const [personalizedLink, setPersonalizedLink] = useState<string | null>(null);

  const baseLink = link ? `https://zaprouter.pro/wp/${link}` : "";

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(baseLink);
      setIsCopied(true);
    }
  };

  const {
    errorMessage,
    form,
    formTranslation,
    isLoading: updateWhatsappLinkIsLoading,
    isModalOpen,
    setIsModalOpen,
    successMessage,
  } = UpdateWhatsappLink();

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <div className="mb-10">
      <ContentCard title={translations["componentTitle"]}>
        <div className="container mb-10">
          <AlertBanner message={errorMessage} type="error" />
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
          isCopied={isCopied}
          setIsModalOpen={() => setIsModalOpen(true)}
          translations={formTranslation["HoverCards"]}
        />
      </ContentCard>
      <WhatsAppLinkDialog
        form={form}
        isLoading={updateWhatsappLinkIsLoading}
        isModalOpen={isModalOpen}
        personalizedLink={personalizedLink}
        setIsModalOpen={setIsModalOpen}
        setPersonalizedLink={(e: string) => setPersonalizedLink(e)}
        translations={formTranslation["Dialog"]}
      />
    </div>
  );
};

export default WhatsAppLink;
