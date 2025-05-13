import { Card } from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  description?: string;
  title?: string;
}

const AuthCard = ({
  children,
  className = "",
  description,
  title,
}: AuthCardProps) => {
  return (
    <Card className={`w-full max-w-lg mx-auto p-8 ${className}`}>
      {title && <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>}
      {description && (
        <p className="text-center text-muted-foreground pb-6">{description}</p>
      )}
      {children}
    </Card>
  );
};

export default AuthCard;
