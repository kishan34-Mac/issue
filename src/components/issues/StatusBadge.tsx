import { Badge } from "@/components/ui/badge";
import { IssueStatus } from "@/types/issue";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusConfig = (status: IssueStatus) => {
    switch (status) {
      case "open":
        return {
          label: "Open",
          className: "bg-status-open text-status-open-foreground hover:bg-status-open/80"
        };
      case "in-progress":
        return {
          label: "In Progress", 
          className: "bg-status-progress text-status-progress-foreground hover:bg-status-progress/80"
        };
      case "in-review":
        return {
          label: "In Review",
          className: "bg-status-review text-status-review-foreground hover:bg-status-review/80"
        };
      case "closed":
        return {
          label: "Closed",
          className: "bg-status-closed text-status-closed-foreground hover:bg-status-closed/80"
        };
      default:
        return {
          label: status,
          className: "bg-muted text-muted-foreground"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant="secondary" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};