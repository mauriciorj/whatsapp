interface PlansProps {
  [key: string]: {
    maxNumbers: number;
    name: string;
    projects: number;
    price: number | string;
    url?: string;
  };
}

const BusinessRules: PlansProps = {
  basico: {
    maxNumbers: 50,
    name: "Personalizável",
    projects: 1,
    price: 55,
  },
  avancado: {
    maxNumbers: 50,
    name: "Avançado",
    projects: 4,
    price: 97,
    url: "https://pay.kiwify.com.br/JeIpGkP",
  },
  customizavel: {
    maxNumbers: 50,
    name: "Customizavel",
    projects: 4,
    price: " - Sob Consulta",
  },
};

export default BusinessRules;
