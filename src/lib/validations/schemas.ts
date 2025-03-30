import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Endereço de email inválido" }),
  subject: z.string().min(2, { message: "Assunto é obrigatório" }),
  message: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" }),
});

export const deleteDialogSchema = z.object({
  deleteWord: z.literal("deletar", {
    errorMap: () => ({
      message: "Por favor insira a palavra 'deletar' corretamente.",
    }),
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Endereço de email inválido"),
});

export const linkSchema = z.object({
  link: z.string().regex(/^[A-Za-z\b-]{4,50}$/, "Link inválido"),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Por favor insira um email válido." }),
  password: z.string().min(1, { message: "Por favor insira uma senha." }),
});

export const phoneNumber = z.object({
  phoneNumber: z
    .string()
    .min(5, { message: "Por favor insira um número de telefone válido" }),
});

export const campaignTitleSchema = z.object({
  campaign: z.string().min(1, { message: "Por favor insira um nome válido." }),
});

export const campaignMessageSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Por favor insira uma mensagem válida." })
    .max(200, { message: "A mensagem não pode ter mais de 200 caracteres." }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Por favor insira um e-mail válido" }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,20}$/,
      { message: "Senha inválida" }
    ),
  firstName: z.string().min(2, { message: "Por favor insira um nome válido" }),
  lastName: z.string().min(2, { message: "Por favor insira um nome válido" }),
  plan: z.string(),
  // cardNumber: z.string().regex(/^\d{16}$/, "Número de Cartão inválido"),
  // expiryDate: z
  //   .string()
  //   .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Data inválida"),
  // cvc: z.string().regex(/^\d{3,4}$/, "Número inválido"),
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,20}$/,
        { message: "Senha inválida" }
      ),
  })
  .required();
