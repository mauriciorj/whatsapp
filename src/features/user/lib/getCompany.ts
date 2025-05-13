import { Tables } from "@/db/types/database.types";
import getUserProfile from "@/features/user/lib/getUserProfile";
import createClient from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

const getCompany = () => {
  const { userProfile } = getUserProfile();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userCompany", userProfile?.company_id],
    queryFn: async () => {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("company")
        .select("name, plan, subscription_status")
        .eq("if", userProfile?.company_id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!userProfile?.company_id, // Only run the query if we have a company_id
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
};

export default getCompany;
