import Link from "next/link";
import AuthCard from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";

export default function Successo() {
  return (
    <div className="pt-16 pb-16 px-4">
      <AuthCard>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">
            Pagamento realizado com sucesso!{" "}
          </h1>
          <p className="pt-7">
            Uma confirmação vai ser enviada para o seu e-mail.
          </p>
          <p className="pt-5">
            <Button asChild>
              <Link href="/login">
                Clique aqui para acessar o nosso sistema.
              </Link>
            </Button>
          </p>
          <p className="pt-5">Qualquer dúvida entre em contato.</p>
        </div>
      </AuthCard>
    </div>
  );
}
