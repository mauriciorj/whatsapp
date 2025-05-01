import { useUserProfile } from "./useUserProfile";
import { Tables } from "@/db/types/database.types";
import { createClient } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useCompany() {
  const { data: user } = useUserProfile();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userCompany", user?.company_id],
    queryFn: async () => {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("company")
        .select("name, plan, subscription_status")
        .eq("if", user?.company_id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!user?.company_id, // Only run the query if we have a company_id
  }) as {
    data: Tables<"company">[];
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    data,
    errorMessage: error?.message,
    isLoading,
    refetch,
  };
}
