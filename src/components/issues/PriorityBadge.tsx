import { Badge } from "@/components/ui/badge";
import { IssuePriority } from "@/types/issue";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowUp, ArrowDown, Minus } from "lucide-react";

interface PriorityBadgeProps {
  priority: IssuePriority;
  className?: string;
  showIcon?: boolean;
}

export const PriorityBadge = ({ priority, className, showIcon = true }: PriorityBadgeProps) => {
  const getPriorityConfig = (priority: IssuePriority) => {
    switch (priority) {
      case "critical":
        return {
          label: "Critical",
          className: "bg-priority-critical text-white hover:bg-priority-critical/80",
          icon: AlertTriangle
        };
      case "high":
        return {
          label: "High",
          className: "bg-priority-high text-white hover:bg-priority-high/80",
          icon: ArrowUp
        };
      case "medium":
        return {
          label: "Medium", 
          className: "bg-priority-medium text-white hover:bg-priority-medium/80",
          icon: Minus
        };
      case "low":
        return {
          label: "Low",
          className: "bg-priority-low text-white hover:bg-priority-low/80",
          icon: ArrowDown
        };
      default:
        return {
          label: priority,
          className: "bg-muted text-muted-foreground",
          icon: Minus
        };
    }
  };

  const config = getPriorityConfig(priority);
  const Icon = config.icon;

  return (
    <Badge 
      variant="secondary" 
      className={cn("gap-1", config.className, className)}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
};