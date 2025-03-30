import Form from "@/components/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WhatsappEditMessageDialog({
  isModalOpen,
  setIsModalOpen,
  form,
  isLoading,
  message,
  translate,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  form: any;
  isLoading: boolean;
  message: any;
  translate: any;
}) {
  // Update form values when message changes
  if (message && form && form.state.values.messageTitle !== message.title) {
    form.setFieldValue("messageTitle", message.title);
    form.setFieldValue("messageContent", message.content);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translate["editDialogTitle"]}</DialogTitle>
        </DialogHeader>
        <Form
          fieldsToRender={[
            {
              label:
                translate["editMessageForm"]["fields"]["messageTitle"]["label"],
              name: translate["editMessageForm"]["fields"]["messageTitle"][
                "name"
              ],
              placeholder:
                translate["editMessageForm"]["fields"]["messageTitle"][
                  "placeholder"
                ],
              type: "text",
            },
            {
              label:
                translate["editMessageForm"]["fields"]["messageContent"][
                  "label"
                ],
              name: translate["editMessageForm"]["fields"]["messageContent"][
                "name"
              ],
              placeholder:
                translate["editMessageForm"]["fields"]["messageContent"][
                  "placeholder"
                ],
              type: "textarea",
            },
          ]}
          form={form}
          isLoading={isLoading}
          submitLabel={translate["editMessageForm"]["submitLabel"]}
          submitLoadingLabel={
            translate["editMessageForm"]["submitLoadingLabel"]
          }
        />
      </DialogContent>
    </Dialog>
  );
}
