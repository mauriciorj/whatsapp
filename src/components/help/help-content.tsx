import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import ContactCard from "./contact-card";

const HelpContent = () => {
  const helpSections = [
    {
      id: "como-mudo-meu-link",
      title: "Como mudo meu link",
      content:
        "Por questões de segurança o link fornecido não pode ser alterado pelo usuário. Caso você realmente necessite trocá-lo por favor entre em contato.",
    },
    {
      id: "whatsapp-numbers",
      title: "Não consigo adicionar mais números de Whats App",
      content:
        "Por favor confira quantos números de Whats App o seu plano inclui.",
    },
    {
      id: "Os gráficos do meu Dashboard não contém nenhuma informação",
      title: "Os gráficos do meu Dashboard não contém nenhuma informação",
      content:
        "Caso você seja um usuário novo, por favor aguarde alguns minutos até que o nosso sistema reconheça e categorize todas as informações necessárias",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-3xl mx-auto p-8">
        <Accordion type="single" collapsible className="space-y-4">
          {helpSections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-lg font-semibold text-left">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
      <ContactCard />
    </div>
  );
};

export default HelpContent;
