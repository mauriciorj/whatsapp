"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface WhatsappQRCodeDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
  qrCodeUrl: string;
  translations: any;
}

const WhatsappQRCodeDialog = ({
  isModalOpen,
  setIsModalOpen,
  title,
  description,
  qrCodeUrl,
  translations,
}: WhatsappQRCodeDialogProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-2">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6">
          {qrCodeUrl ? (
            <div className="border border-border p-4 rounded-lg bg-muted/20">
              <Image
                src={qrCodeUrl}
                alt="QR Code"
                width={200}
                height={200}
                className="rounded-md"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-[200px] h-[200px] border border-border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground">
                {translations["qrCodeNotAvailable"]}
              </p>
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-4 text-center">
            {translations["qrCodeInstructions"]}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappQRCodeDialog;
