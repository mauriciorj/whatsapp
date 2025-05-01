import pt from "@/translations/pt.json";

const useTranslations = (translation: any) => {
  return translation?.split(".").reduce((o: any, i: any) => o[i], pt);
};

export default useTranslations;
