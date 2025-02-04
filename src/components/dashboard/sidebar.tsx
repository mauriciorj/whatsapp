"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageCircle,
  HelpCircle,
  Mail,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isInsideDashboard = Boolean(pathname.split("/")[1] === "dashboard");

  if (!isInsideDashboard) return null;

  return (
    <>
      <Button
        className="md:hidden fixed top-3 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="ghost"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div
        className={cn(
          "fixed md:relative md:h-svh left-0 top-16 md:top-0 h-full w-64 border-r p-6 transition-transform duration-200 ease-in-out md:translate-x-0 z-10 bg-background",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="space-y-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
          </div>
          <nav className="space-y-2">
            <Link
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                pathname === "/dashboard" && "bg-secondary text-foreground"
              )}
              href="/dashboard"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                pathname === "/dashboard/whatsapp" &&
                  "bg-secondary text-foreground"
              )}
              href="/dashboard/whatsapp"
              onClick={() => setIsOpen(false)}
              prefetch
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Link>
            <Link
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                pathname === "/ajuda" && "bg-secondary text-foreground"
              )}
              href="/ajuda"
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="h-5 w-5" />
              Ajuda
            </Link>
            <Link
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                pathname === "/contato" && "bg-secondary text-foreground"
              )}
              href="/contato"
              onClick={() => setIsOpen(false)}
            >
              <Mail className="h-5 w-5" />
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
