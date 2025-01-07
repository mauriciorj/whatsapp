"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  type: "success" | "error";
  message?: string | null;
  className?: string;
}

export function AlertBanner({ type, message, className }: AlertBannerProps) {
  if (!message) return null;
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-4 rounded-lg text-sm",
        type === "success" &&
          "bg-green-50 text-green-700 border border-green-200",
        type === "error" && "bg-red-50 text-red-700 border border-red-200",
        className
      )}
    >
      {type === "success" ? (
        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      )}
      {message}
    </div>
  );
}
