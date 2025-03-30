import { Skeleton } from "@/components/ui/skeleton";

export default function WhatsAppMessagesLoading() {
  return (
    <div>
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex flex-col space-y-3 mt-6">
          <Skeleton className="h-[120px] w-full rounded-md" />
        </div>
      ))}
    </div>
  );
} 