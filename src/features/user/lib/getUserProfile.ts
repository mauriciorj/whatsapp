import GetUserProfile from "@/actions/getUserProfile/actions";
import { Tables } from "@/db/types/database.types";
import { useQuery } from "@tanstack/react-query";

const getUserProfile = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile(),
  }) as {
    data: Tables<"user_profile">;
    isLoading: boolean;
    error: any;
    refetch: () => void;
  };

  return {
    userProfile: data,
    userProfileError: error,
    userProfileIsLoading: isLoading,
    userProfileErrorMessage: error?.message,
    userProfileRefetch : refetch,
  };
};

export default getUserProfile;
