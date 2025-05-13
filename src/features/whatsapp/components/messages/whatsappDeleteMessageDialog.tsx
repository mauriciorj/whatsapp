import Form from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WhatsappDeleteMessageDialog = ({
  isModalOpen,
  setIsModalOpen,
  form,
  isLoading,
  message,
  translations,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  form: any;
  isLoading: boolean;
  message: any;
  translations: any;
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations["deleteDialogTitle"]}</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-500 mb-4">
          {translations["deleteMessageFormWarning"]} <b>{message?.title}</b>
        </div>
        <Form
          fieldsToRender={[
            {
              label:
                translations["deleteMessageForm"]["fields"]["deleteWord"][
                  "label"
                ],
              name: translations["deleteMessageForm"]["fields"]["deleteWord"][
                "name"
              ],
              placeholder:
                translations["deleteMessageForm"]["fields"]["deleteWord"][
                  "placeholder"
                ],
              type: "text",
            },
          ]}
          form={form}
          isLoading={isLoading}
          submitLabel={translations["deleteMessageForm"]["submitLabel"]}
          submitLoadingLabel={
            translations["deleteMessageForm"]["submitLoadingLabel"]
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappDeleteMessageDialog;
