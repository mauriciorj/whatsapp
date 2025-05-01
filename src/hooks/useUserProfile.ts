import GetUserProfile from "@/actions/getUserProfile/actions";
import { Tables } from "@/db/types/database.types";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  }) as {
    data: Tables<'user_profile'>;
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    data,
    error,
    isLoading,
    errorMessage: error?.message,
    refetch,
  };
}
