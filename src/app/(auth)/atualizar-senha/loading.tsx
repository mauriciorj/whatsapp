import AuthCard from "@/features/user/components/authCard";
import Skeleton from "@/components/ui/skeleton";

const LoginLoading = () => {
  return (
    <AuthCard>
      <div className="flex flex-col items-center space-y-2 text-center">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-5 w-[350px] mb-4" />
      </div>
      <div className="space-y-4 mt-7">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="mt-5">
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="ml-5 mt-2 mt-1">
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="ml-5 mt-1">
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="ml-5 mt-1">
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="ml-5 mt-1">
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="ml-5 mt-1 mb-5">
        <Skeleton className="h-5 w-56" />
      </div>
      <div className="mt-5">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="flex flex-col items-center mt-5">
        <Skeleton className="h-5 w-[350px]" />
      </div>
    </AuthCard>
  );
};

export default LoginLoading;
