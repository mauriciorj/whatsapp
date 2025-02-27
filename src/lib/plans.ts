const PLANS: Record<'basico' | 'avancado', { name: string; price: number }> = {
  basico: {
    name: "Básico", 
    price: 59,
  },
  avancado: {
    name: "Avançado",
    price: 99,
  },
};

export default PLANS;
