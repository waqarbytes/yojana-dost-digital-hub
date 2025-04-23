
import { cn } from "@/lib/utils";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatisticsCard({
  title,
  value,
  subtitle,
  icon,
  className,
}: StatisticsCardProps) {
  return (
    <div className={cn("p-5 bg-white rounded-lg shadow-sm border", className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
    </div>
  );
}
