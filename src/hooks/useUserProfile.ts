import GetUserProfile from "@/actions/getUserProfile/actions";
import { UserType } from "@/db/types/types";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  }) as {
    data: UserType;
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    user,
    isLoading,
    error,
    refetch,
  };
}
