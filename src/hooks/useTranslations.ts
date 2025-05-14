"use client";

import pt from "@/translations/pt.json";
import campaignsPt from "@/features/campaigns/translations/pt.json";
import contactPt from "@/features/contact/translations/pt.json";
import userPt from "@/features/user/translations/userPt.json";

import whatsappMessagesPt from "@/features/whatsapp/messages/translations/pt.json";
import whatsappPhoneNamePt from "@/features/whatsapp/phoneNumbers/translations/pt.json";
import whatsappLinkPt from "@/features/whatsapp/link/translations/pt.json";

const useTranslations = (translation: any) => {
  const translations = {
    ...pt,
    Features: {
      ...campaignsPt,
      ...contactPt,
      ...userPt,
      ...whatsappLinkPt,
      ...whatsappMessagesPt,
      ...whatsappPhoneNamePt,
    },
  };
  return translation?.split(".").reduce((o: any, i: any) => o[i], translations);
};

export default useTranslations;
