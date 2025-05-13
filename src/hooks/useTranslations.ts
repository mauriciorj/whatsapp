"use client";

import pt from "@/translations/pt.json";
import campaignsPt from "@/features/campaigns/translations/pt.json";
import contactPt from "@/features/contact/translations/pt.json";
import userPt from "@/features/user/translations/userPt.json";
import whatsappPt from "@/features/whatsapp/translations/pt.json";

const useTranslations = (translation: any) => {
  const translations = {
    ...pt,
    Features: {
      ...campaignsPt,
      ...contactPt,
      ...userPt,
      ...whatsappPt,
    },
  };
  return translation?.split(".").reduce((o: any, i: any) => o[i], translations);
};

export default useTranslations;
