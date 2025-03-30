import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppMessageCardProps {
  message: {
    id: string;
    title: string;
    content: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
  translate: any;
  onEdit: (message: any) => void;
  onDelete: (message: any) => void;
}

export default function WhatsAppMessageCard({
  message,
  translate,
  onEdit,
  onDelete,
}: WhatsAppMessageCardProps) {
  const createdDate = new Date(message.createdAt).toLocaleDateString();
  const updatedDate = new Date(message.updatedAt).toLocaleDateString();

  return (
    <div className="w-full p-4 border rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        {/* Top Left: Title */}
        <div className="flex items-center">
          <div className="font-medium">{message.title}</div>
        </div>

        {/* Top Right: Switch */}
        <div className="flex flex-col items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              defaultChecked={message.active}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className="mt-1 text-xs">{translate["active"]}</span>
        </div>
      </div>

      {/* Message content */}
      <div className="mt-2 text-sm text-gray-700 line-clamp-2">
        {message.content}
      </div>

      <div className="flex justify-between items-end mt-4">
        {/* Bottom Left: Dates */}
        <div className="text-sm text-gray-500">
          <div>
            {translate["createdAt"]}: {createdDate}
          </div>
          <div>
            {translate["updatedAt"]}: {updatedDate}
          </div>
        </div>

        {/* Bottom Right: Action Buttons */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(message)}>
            {translate["messageUpdateCta"]}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(message)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}
