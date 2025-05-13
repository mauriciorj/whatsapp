"use server";

import { Resend } from "resend";

const postMessage = async (formData: {
  email: string;
  subject: string;
  name: string;
  message: string;
}) => {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

  const { data, error } = await resend.emails.send({
    from: "Contato Web Form <contato@zaprouter.pro>",
    to: ["contato@zaprouter.pro"],
    subject: "Contato Web Form",
    html: `<h1>Contato Web Form</h1>
        <p>From: ${formData.name}</p>
        <p>Assunto: ${formData.subject}</p>
        <p>Email: ${formData.email.toLowerCase()}</p>
        <p>Mensagem: ${formData.message}</p>`,
  });

  if (error) {
    return false;
  }
  if (data) {
    return true;
  }
};

export default postMessage;
