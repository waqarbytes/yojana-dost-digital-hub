
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  href?: string;
  className?: string;
}

export function ServiceCard({
  title,
  icon,
  description,
  href = "#",
  className,
}: ServiceCardProps) {
  return (
    <Link 
      to={href}
      className={cn(
        "flex flex-col items-center p-4 bg-white border rounded-lg text-center transition-all duration-300",
        "hover:shadow-md hover:border-primary hover:-translate-y-1",
        className
      )}
    >
      <div className="mb-3 text-3xl text-primary">{icon}</div>
      <h3 className="font-medium text-base mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </Link>
  );
}
