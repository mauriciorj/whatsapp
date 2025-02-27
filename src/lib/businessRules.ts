interface PlansProps {
  [key: string]: {
    maxNumbers: number;
    name: string;
    projects: number;
    price: number;
  };
}

const BusinessRules: PlansProps = {
  basico: {
    maxNumbers: 50,
    name: "Básico",
    projects: 1,
    price: 55,
  },
  avancado: {
    maxNumbers: 50,
    name: "Avançado",
    projects: 4,
    price: 55,
  },
};

export default BusinessRules;
