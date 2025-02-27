import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ContactCard = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Contato</h2>
        </div>
        <Button asChild>
          <Link href="/contato">Entre em contato</Link>
        </Button>
      </div>
    </Card>
  );
};

export default ContactCard;
