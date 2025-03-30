interface PlansProps {
  [key: string]: {
    maxNumbers: number;
    name: string;
    campaigns: number;
    price: number | string;
    url?: string;
  };
}

const BusinessRules: PlansProps = {
  basico: {
    maxNumbers: 50,
    name: "Personalizável",
    campaigns: 1,
    price: 55,
  },
  avancado: {
    maxNumbers: 50,
    name: "Avançado",
    campaigns: 4,
    price: 97,
    url: "https://pay.kiwify.com.br/JeIpGkP",
  },
  customizavel: {
    maxNumbers: 50,
    name: "Customizavel",
    campaigns: 4,
    price: " - Sob Consulta",
  },
};

export default BusinessRules;
