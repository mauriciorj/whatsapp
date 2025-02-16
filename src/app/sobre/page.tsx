const aboutSections = [
  {
    title: "Sobre nós",
    content: [
      "Bem-vindo ao ZapRouter! Somos uma equipe apaixonada por tecnologia e inovação, dedicada a criar soluções que simplifiquem e otimizem a interação entre empresas e seus clientes.",
      "Nosso propósito é facilitar a gestão de campanhas que utilizam o WhatsApp como canal principal de comunicação. Desenvolvemos uma plataforma inteligente que distribui, de forma linear e equilibrada, o redirecionamento de clientes entre números cadastrados. Isso não só aumenta a eficiência do atendimento, como também reduz os riscos de bloqueios no WhatsApp.",
      "Acreditamos que a conexão com o cliente deve ser simples, fluida e sem barreiras. É por isso que trabalhamos para oferecer uma ferramenta confiável, segura e intuitiva, que atende às necessidades de empreendedores e empresas de todos os portes.",
      "Nossa missão é potencializar seus resultados, permitindo que você foque no que realmente importa: crescer e fortalecer sua relação com o cliente.",
      "Estamos aqui para ajudar você a transformar sua estratégia de comunicação e levar o seu negócio a novos patamares!",
      "Junte-se a nós e experimente o futuro das campanhas no WhatsApp.",
    ],
  },
];

export default function Sobre() {
  return (
    <div className="mb-24 p-8 space-y-8">
      {aboutSections.map((section, index) => (
        <section className="space-y-4" key={index}>
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          <div className="space-y-4 text-muted-foreground">
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
