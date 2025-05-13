import Form from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const UpdateWhatsappMessageDialog = ({
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
  // Update form values when message changes
  if (message && form && form.state.values.messageTitle !== message.title) {
    form.setFieldValue("messageTitle", message.title);
    form.setFieldValue("messageContent", message.content);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations["editDialogTitle"]}</DialogTitle>
        </DialogHeader>
        <Form
          fieldsToRender={[
            {
              label:
                translations["editMessageForm"]["fields"]["messageTitle"][
                  "label"
                ],
              name: translations["editMessageForm"]["fields"]["messageTitle"][
                "name"
              ],
              placeholder:
                translations["editMessageForm"]["fields"]["messageTitle"][
                  "placeholder"
                ],
              type: "text",
            },
            {
              label:
                translations["editMessageForm"]["fields"]["messageContent"][
                  "label"
                ],
              name: translations["editMessageForm"]["fields"]["messageContent"][
                "name"
              ],
              placeholder:
                translations["editMessageForm"]["fields"]["messageContent"][
                  "placeholder"
                ],
              type: "textarea",
            },
          ]}
          form={form}
          isLoading={isLoading}
          submitLabel={translations["editMessageForm"]["submitLabel"]}
          submitLoadingLabel={
            translations["editMessageForm"]["submitLoadingLabel"]
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWhatsappMessageDialog;
