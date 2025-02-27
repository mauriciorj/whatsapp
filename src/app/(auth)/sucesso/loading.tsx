import AuthCard from "@/components/auth/auth-card";
import { Skeleton } from "@/components/ui/skeleton";

const LoginLoading = () => {
  return (
    <AuthCard>
      <div className="flex flex-col items-center space-y-2 text-center">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-5 w-[350px] mb-4" />
      </div>
      <div className="space-y-4 mt-7">
        <Skeleton className="h-10 w-full" />
      </div>
    </AuthCard>
  );
};

export default LoginLoading;
