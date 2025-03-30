import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppPhoneNumberCardProps {
  entry: string;
  translate: any;
  onEdit: (phoneNumber: string) => void;
  onDelete: (phoneNumber: string) => void;
}

export default function WhatsAppPhoneNumberCard({
  entry,
  translate,
  onEdit,
  onDelete,
}: WhatsAppPhoneNumberCardProps) {
  return (
    <div className="w-full p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        {/* Top Left: Connection Status + Phone Number */}
        <div className="flex items-center">
          <div className="mr-2">
            {/* This is a placeholder for connection status - you'll need to add actual status logic */}
            <div
              className={`h-3 w-3 rounded-full ${
                Math.random() > 0.5 ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </div>
          <div className="font-medium">{entry}</div>
        </div>

        {/* Top Right: Switch */}
        <div className="flex flex-col items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              defaultChecked={true}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="mt-1 text-xs">{translate["active"]}</span>
        </div>
      </div>

      <div className="flex justify-end items-end mt-4 space-x-2">
        <Button size="sm" variant="outline" onClick={() => onEdit(entry)}>
          {translate["numbersUpdateCta"]}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onDelete(entry)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
