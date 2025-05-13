"use client";

import { RefreshCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PeriodSelector = ({
  dataLength,
  isLoading,
  refetch,
  reportPeriod,
  setReportPeriod,
  translations,
}: {
  dataLength: boolean;
  isLoading: boolean;
  refetch: () => void;
  reportPeriod: number;
  setReportPeriod: (e: number) => void;
  translations: any;
}) => (
  <div className="w-full flex justify-end mt-6">
    <div className="w-full md:w-fit flex flex-row mb-5 items-center justify-end">
      <div
        onClick={() => (Boolean(dataLength) ? refetch() : null)}
        className={`${
          Boolean(!dataLength) &&
          "cursor-not-allowed opacity-50 [&>span]:line-clamp-1"
        }flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm mr-2 hover:bg-accent cursor-pointer`}
      >
        <RefreshCcw
          className={`${isLoading ? "animate-spin" : null} h-5 w-5`}
        />
      </div>
      <Select
        onValueChange={(e) => setReportPeriod(parseInt(e))}
        defaultValue={reportPeriod.toString()}
        disabled={Boolean(!dataLength)}
      >
        <SelectTrigger>
          <SelectValue placeholder="7 dias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7">
            {translations["reportPeriods"]["sevenDays"]}
          </SelectItem>
          <SelectItem value="14">
            {translations["reportPeriods"]["fourteenDays"]}
          </SelectItem>
          <SelectItem value="30">
            {translations["reportPeriods"]["thirtiehDays"]}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default PeriodSelector;
