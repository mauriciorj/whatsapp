"use client";

import { useState } from "react";
import createClient from "@/db/supabase/client";
import useWhatsapp from "@/features/whatsapp/hooks/useWhatsapp";
import generateRandomCode from "@/lib/generateCode";

const GenerateRandomLink = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [randomUniqueCode, setRandomUniqueCode] = useState<string | null>(null);

  const { currentCampaign } = useWhatsapp();

  const generate = async () => {
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

      const uniqueCode = await getUniqueCode();
      const { error } = await supabase
        .from("campaigns")
        .update({
          wp_link: uniqueCode,
        })
        .eq("id", currentCampaign?.id);
      if (error) {
        setError(true);
        setRandomUniqueCode(null);
      } else {
        setRandomUniqueCode(uniqueCode);
        //   refetch();
      }
      setIsLoading(false);
    } catch {
      setRandomUniqueCode(null);
      setIsLoading(false);
      setError(true);
    }
  };

  return {
    error,
    generate,
    isLoading,
    randomUniqueCode,
  };
};

export default GenerateRandomLink;
