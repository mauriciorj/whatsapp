"use client";

import { ShieldAlert } from "lucide-react";
import PageLayout from "@/components/layout/pageLayout";

const privacySections = [
  {
    title: "Política de Privacidade",
    content: [
      "A sua privacidade é uma prioridade para o [Nome do SaaS]. Esta Política de Privacidade descreve como coletamos, usamos, protegemos e compartilhamos suas informações ao utilizar nossos serviços.",
    ],
  },
  {
    title: "1. Informações Coletadas",
    content: [
      "Ao criar uma conta ou utilizar nossos serviços, podemos coletar os seguintes dados:",
      "- Informações pessoais, como nome, e-mail, telefone e outros dados fornecidos durante o cadastro.",
      "- Dados de uso, como registros de acesso, endereço IP e informações sobre como você utiliza a plataforma.",
      "- Informações relacionadas ao WhatsApp, como números cadastrados no sistema para redirecionamento.",
    ],
  },
  {
    title: "2. Uso das Informações",
    content: [
      "As informações coletadas são utilizadas para:",
      "- Fornecer e melhorar nossos serviços;",
      "- Garantir o funcionamento correto do sistema de redirecionamento;",
      "- Personalizar a experiência do usuário;",
      "- Cumprir obrigações legais e regulatórias.",
    ],
  },
  {
    title: "3. Compartilhamento de Informações",
    content: [
      "Nós não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:",
      "- Quando exigido por lei ou por determinação judicial;",
      "- Para proteger nossos direitos, propriedade e segurança ou de nossos usuários;",
      "- Com prestadores de serviços que atuam em nosso nome e sob nossas diretrizes de confidencialidade.",
    ],
  },
  {
    title: "4. Proteção de Dados",
    content: [
      "Adotamos medidas de segurança técnica, organizacional e administrativa para proteger suas informações contra acesso não autorizado, perda ou alteração. No entanto, nenhum sistema é completamente seguro, e não podemos garantir a segurança absoluta dos dados.",
    ],
  },
  {
    title: "5. Direitos do Usuário",
    content: [
      "Você tem o direito de:",
      "- Acessar e corrigir suas informações pessoais;",
      "- Solicitar a exclusão de seus dados, salvo quando necessário para cumprir obrigações legais;",
      "- Revogar seu consentimento para o processamento de dados, quando aplicável.",
      "- Para exercer seus direitos, entre em contato pelo e-mail contato@zaprouter.com.",
    ],
  },
  {
    title: "6. Retenção de Dados",
    content: [
      "Suas informações serão mantidas enquanto sua conta estiver ativa ou conforme necessário para cumprir nossas obrigações legais.",
    ],
  },
  {
    title: "7. Alterações na Política de Privacidade",
    content: [
      "Podemos atualizar esta Política de Privacidade periodicamente. Qualquer alteração será comunicada a você por meio de nossos canais oficiais.",
    ],
  },
  {
    title: "8. Contato",
    content: [
      "Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco pelo e-mail contato@zaprouter.com.",
      "O [Nome do SaaS] está comprometido em proteger a sua privacidade e em garantir a transparência no uso das suas informações.",
    ],
  },
];

const breadcrumbItems = [
  {
    href: "/politica-de-privacidade",
    label: "Política de Privacidade",
    icon: ShieldAlert,
  },
];

const PoliticaDePrivacidade = () => {
  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <section className="mb-10 ml-0 md:ml-[150px]">
        <p className="text-muted-foreground">
          Última atualização: 20 de Dezembro de 2024
        </p>
      </section>
      {privacySections.map((section, index) => (
        <section className="mb-10 ml-0 md:ml-[150px]" key={index}>
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          <div className="space-y-4 text-muted-foreground">
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </PageLayout>
  );
};

export default PoliticaDePrivacidade;
