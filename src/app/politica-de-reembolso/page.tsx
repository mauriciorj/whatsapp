"use client";

import { HandCoins } from "lucide-react";
import PageLayout from "@/components/layout/pageLayout";

const refundPolicySections = [
  {
    title: "Política de Reembolso",
    content: [
      "Nós, do [Nome do SaaS], nos dedicamos a oferecer uma experiência satisfatória e um serviço de alta qualidade. No entanto, caso você não esteja completamente satisfeito, temos uma política de reembolso clara e justa.",
    ],
  },
  {
    title: "Prazo para Solicitação de Reembolso",
    content: [
      "Você pode solicitar o reembolso em até 7 dias corridos após a criação da sua conta na nossa plataforma, conforme estabelecido no Código de Defesa do Consumidor.",
    ],
  },
  {
    title: "Como Solicitar o Reembolso",
    content: [
      "Para iniciar o processo de reembolso, envie um e-mail para contato@zaprouter.com com o seguinte assunto: Solicitação de Reembolso. No corpo do e-mail, inclua:",
      "- Seu nome completo;",
      "- O e-mail utilizado para cadastro na plataforma;",
      "- O motivo da solicitação (opcional, mas apreciamos o feedback para melhorar nossos serviços).",
    ],
  },
  {
    title: "Tempo para Receber o Reembolso",
    content: [
      "O tempo para que o valor seja reembolsado pode variar de acordo com o meio de pagamento utilizado e/ou o banco responsável pela transação. Após o processamento do pedido de reembolso por nossa equipe, você será notificado e receberá uma estimativa de prazo.",
      "Estamos comprometidos em tratar todas as solicitações com agilidade e transparência. Se tiver dúvidas ou precisar de assistência adicional, entre em contato com nossa equipe pelo e-mail acima.",
    ],
  },
  {
    title: "",
    content: ["Agradecemos por confiar no [Nome do SaaS]!"],
  },
];

const breadcrumbItems = [
  {
    href: "/politica-de-reembolso",
    label: "Política de Reembolso",
    icon: HandCoins,
  },
];

export default function PoliticaDeReembolso() {
  return (
    <PageLayout breadcrumbItems={breadcrumbItems}>
      <section className="mb-10 ml-0 md:ml-[150px]">
        <p className="text-muted-foreground">
          Última atualização: 20 de Dezembro de 2024
        </p>
      </section>
      {refundPolicySections.map((section, index) => (
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
}
