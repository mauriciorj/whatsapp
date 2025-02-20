"use client";

import { useCallback } from "react";
import {
  // redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useTheme } from "next-themes";
import {
  ChartNoAxesCombined,
  Check,
  MapPin,
  MonitorCog,
  MonitorSmartphone,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PLANS from "@/lib/plans";

const Pricing = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const plans = [
    {
      name: PLANS.basico.name,
      value: "basico",
      price: `R$${PLANS.basico.price}`,
      description: "Perfeito para quem está começando",
      features: [
        {
          icon: <Check className="h-5 w-5 text-primary" />,
          label: "Um link",
          special: false,
        },
        {
          icon: <Check className="h-5 w-5 text-primary" />,
          label: "Até 2 WhatsApp",
          special: false,
        },
        {
          icon: <Check className="h-5 w-5 text-primary" />,
          label: "Relatório básico",
          special: false,
        },
        {
          icon: (
            <ChartNoAxesCombined
              className="h-5 w-5 text-primary"
              color={theme === "light" ? "#475569" : "#b8c2d1"}
            />
          ),
          label: "Total de cliques diários",
          special: true,
        },
      ],
    },
    {
      name: PLANS.avancado.name,
      value: "avancado",
      price: `R$${PLANS.avancado.price}`,
      description: "Para quem já tem uma operação rodando",
      popular: true,
      features: [
        {
          icon: <Check className="h-5 w-5 text-primary" />,
          label: "Um link",
          special: false,
        },
        {
          icon: <Check className="h-5 w-5 text-primary" />,
          label: "Até 4 WhatsApps",
          special: false,
        },
        {
          icon: <Check className="h-5 w-5 text-primary" />,
          label: "Relatório completo:",
          special: false,
        },
        {
          icon: (
            <ChartNoAxesCombined
              className="h-5 w-5 text-primary"
              color={theme === "light" ? "#475569" : "#b8c2d1"}
            />
          ),
          label: "Total de cliques diários",
          special: true,
        },
        {
          icon: (
            <MapPin
              className="h-5 w-5 text-primary"
              color={theme === "light" ? "#475569" : "#b8c2d1"}
            />
          ),
          label: "Localização",
          special: true,
        },
        {
          icon: (
            <MonitorSmartphone
              className="h-5 w-5 text-primary"
              color={theme === "light" ? "#475569" : "#b8c2d1"}
            />
          ),
          label: "Tipo de dispositivo",
          special: true,
        },
        {
          icon: (
            <MonitorCog
              className="h-5 w-5 text-primary"
              color={theme === "light" ? "#475569" : "#b8c2d1"}
            />
          ),
          label: "Sistema operacional",
          special: true,
        },
      ],
    },
    {
      name: "Customizado",
      value: "customizado",
      price: null,
      description: "Para operações robustas e complexas",
      features: [
        {
          icon: <UserRound className="h-5 w-5 text-primary" />,
          label: "Entre em contato com o nosso time!",
          special: false,
        },
      ],
    },
  ];

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toLowerCase());

      return params.toString();
    },
    [searchParams]
  );

  return (
    <section className="py-24 bg-secondary" id="planos">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Preço Simplificado
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              className={`flex flex-col relative p-8 justify-between ${
                plan.popular ? "border-2 border-blue-500" : null
              }`}
              key={plan.name}
            >
              {plan.popular && (
                <div className="absolute w-[80%] text-center -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-primary-foreground text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {Object.values(plan.features).map((feature) =>
                    feature.special ? (
                      <li
                        className="flex items-center gap-2 ml-3"
                        key={feature.label}
                      >
                        {feature.icon}
                        <span className="text-primary-light">
                          {feature.label}
                        </span>
                      </li>
                    ) : (
                      <li
                        key={feature.label}
                        className="flex items-center gap-2"
                      >
                        {feature.icon}
                        <span>{feature.label}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <Button
                  className="w-full"
                  onClick={() => {
                    // if (plan.value === "basico") {
                    //   redirect("https://pay.kiwify.com.br/vNY2XvG");
                    // } else {
                    //   redirect("https://pay.kiwify.com.br/tA9jJEx");
                    // }
                    router.push(
                      pathname +
                        "criar-conta/" +
                        "?" +
                        createQueryString("plano", plan.value)
                    );
                  }}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
