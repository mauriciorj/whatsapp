"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "@/components/form";

const WhatsAppLinkDialog = ({
  form,
  isLoading,
  isModalOpen,
  personalizedLink,
  setIsModalOpen,
  setPersonalizedLink,
  translations,
}: {
  form: any;
  isLoading: boolean;
  isModalOpen: boolean;
  personalizedLink: string | null;
  setIsModalOpen: (value: boolean) => void;
  setPersonalizedLink: (value: string) => void;
  translations: any;
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
          <DialogTitle>{translations["Dialog"]["title"]}</DialogTitle>
          <DialogDescription>
            {translations["Dialog"]["description"]}
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
            {translations["Dialog"]["instruction"]}
          </div>
        </div>
        <Form
          cancelButtonLabel={translations["Dialog"]["form"]["cancelLabel"]}
          fieldsToRender={[
            {
              countChar: true,
              countCharMaxChar: 50,
              isPersonalizedLink: true,
              label: translations["Dialog"]["form"]["fields"]["link"]["label"],
              name: translations["Dialog"]["form"]["fields"]["link"]["name"],
              placeholder:
                translations["Dialog"]["form"]["fields"]["link"]["placeholder"],
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
          submitLabel={translations["Dialog"]["form"]["submitLabel"]}
          submitLoadingLabel={translations["Dialog"]["form"]["submitLoadingLabel"]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppLinkDialog;
