import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WhatsAppNumbersLoading = () => {
  return (
    <Card className="p-6">
      <Skeleton className="h-7 w-48 mb-4" />
      <div className="space-y-4">
        {[1, 2].map((index) => (
          <div key={index} className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WhatsAppNumbersLoading;
