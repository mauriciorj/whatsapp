import Skeleton from "@/components/ui/skeleton";
import ContentCard from "@/components/layout/contentCard";

const LoginLoading = () => {
  return (
    <div>
      <div className="flex flex-row mb-10 pr-5 justify-between">
        <Skeleton className="h-5 w-[210px] mb-4" />
      </div>
      <div className="flex flex-row mb-2 pr-5 pl-10 justify-between">
        <Skeleton className="h-10 w-[310px] mb-2" />
        <Skeleton className="h-10 w-48 mb-2" />
      </div>
      <div className="flex flex-row mb-12 pr-5 pl-10 justify-between">
        <Skeleton className="h-5 w-[310px] mb-2" />
        <Skeleton className="h-10 w-48 mb-5" />
      </div>
      <ContentCard>
        <div className="container mb-8 mt-2">
          <Skeleton className="h-10 w-48 mb-4" />
        </div>
        <div className="container mb-10 pl-10">
          <Skeleton className="h-10 w-[95%] mb-4" />
          <Skeleton className="h-10 w-[95%] mb-4" />
          <Skeleton className="h-10 w-[95%] mb-4" />
          <Skeleton className="h-10 w-[95%] mb-8" />
          <Skeleton className="h-10 w-28 mb-4" />
        </div>
      </ContentCard>
    </div>
  );
};

export default LoginLoading;
