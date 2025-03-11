"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "../../form";

const WhatsAppLinkDialog = ({
  form,
  isLoading,
  isModalOpen,
  personalizedLink,
  setIsModalOpen,
  setPersonalizedLink,
  translate,
}: {
  form: any;
  isLoading: boolean;
  isModalOpen: boolean;
  personalizedLink: string | null;
  setIsModalOpen: (value: boolean) => void;
  setPersonalizedLink: (value: string) => void;
  translate: any;
}) => {
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        setIsModalOpen(false);
        form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translate["dialog"]["title"]}</DialogTitle>
          <DialogDescription>
            {translate["dialog"]["description"]}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row">
          <div className="text-sm text-muted-foreground">
            https://zaprouter.pro/wp/
          </div>
          <div className="text-sm bold">{personalizedLink}</div>
        </div>
        <div className="flex flex-row">
          <div className="text-sm text-muted-foreground">
            {translate["dialog"]["instruction"]}
          </div>
        </div>
        <Form
          cancelButtonLabel={translate["dialog"]["form"]["cancelLabel"]}
          fieldsToRender={[
            {
              countChar: true,
              countCharMaxChar: 50,
              isPersonalizedLink: true,
              label: translate["dialog"]["form"]["fields"]["link"]["label"],
              name: translate["dialog"]["form"]["fields"]["link"]["name"],
              placeholder:
                translate["dialog"]["form"]["fields"]["link"]["placeholder"],
              type: "text",
            },
          ]}
          isLoading={isLoading}
          onCancel={() => {
            setIsModalOpen(false);
            form.reset();
          }}
          onChange={(e: any) => setPersonalizedLink(e)}
          form={form}
          submitLabel={translate["dialog"]["form"]["submitLabel"]}
          submitLoadingLabel={translate["dialog"]["form"]["submitLoadingLabel"]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppLinkDialog;
