import { QrCode, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type whatsappTable = {
  id: string;
  name: string;
  status: string;
};

interface WhatsAppPhoneNumberCardProps {
  entry: whatsappTable;
  translations: any;
  onEdit: (phoneNumber: string) => void;
  onDelete: (phoneNumber: string) => void;
  onGenerateQrCode: (phoneNumber: string) => void;
}

const WhatsAppPhoneNumberCard = ({
  entry,
  translations,
  onEdit,
  onDelete,
  onGenerateQrCode,
}: WhatsAppPhoneNumberCardProps) => {
  return (
    <div className="w-full p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        {/* Top Left: Connection Status + Phone Number */}
        <div className="flex items-center">
          <div className="mr-2">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span>
          </div>
          <div className="font-medium break-all">{entry?.name}</div>
        </div>

        {/* Top Right: Switch */}
        <div className="flex flex-col items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              defaultChecked={true}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translations-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="mt-1 text-xs">{translations["active"]}</span>
        </div>
      </div>

      <div className="flex justify-end items-end mt-4 space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onGenerateQrCode(entry?.id)}
        >
          <QrCode className="h-5 w-5 mr-2" />
          {translations["generateQrCodeCta"]}
        </Button>
        <Button size="sm" variant="outline" onClick={() => onEdit(entry?.id)}>
          {translations["numbersEditCta"]}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onDelete(entry?.id)}>
          <Trash2 className="h-5 w-5 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppPhoneNumberCard;
