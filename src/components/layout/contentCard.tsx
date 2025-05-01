import { Card } from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  description?: string;
  isHoverable?: boolean;
  onClick?: () => void;
  title?: string;
}

const ContentCard = ({
  children,
  className = "",
  description,
  isHoverable,
  onClick,
  title,
}: AuthCardProps) => {
  return (
    <Card
      className={`w-full mx-auto p-8 ${className} ${
        isHoverable &&
        "hover:bg-accent hover:text-accent-foreground cursor-pointer"
      }`}
      onClick={onClick}
    >
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      {description && (
        <p className="ml-5 text-muted-foreground pb-6">{description}</p>
      )}
      {children}
    </Card>
  );
};

export default ContentCard;
