export const DELETE_MAGIC_WORD = "deletar";

export const ENDPOINTS = {
  WHATSAPP: "/whatsapp-connection",
};

export const ERROR_MESSAGE = {
  USER_NOT_AUTHORIZED: "not_authorized",
  WHATSAPP_ALREADY_EXIST: "whatsapp_already_exist",
  WHATSAPP_SOCKET_INIT_ERROR: "whatsapp_socket_init_error",
};

export const PAGES = {
  auth: {
    atualizarSenha: "/atualizar-senha",
    criarConta: "/criar-conta",
    login: "/login",
    recuperarSenha: "/recuperar-senha",
    success: "/sucesso",
  },
  dashboard: { dashboard: "/dashboard", campaigns: "/dashboard/campaigns" },
};

export const UPDATE_PASSWORD_REDIRECT_TO_URL =
  "https://www.zaprouter.pro/atualizar-senha";

export const RESET_PASSWORD_REDIRECT_TO_URL =
  "https://www.zaprouter.pro/dashboard/perfil?showResetPassword=true";
