import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { IssueFilters as IssueFiltersType, IssueStatus, IssuePriority } from "@/types/issue";
import { Search, X } from "lucide-react";
import { getUniqueAssignees } from "@/data/mockIssues";

interface IssueFiltersProps {
  filters: IssueFiltersType;
  onFiltersChange: (filters: IssueFiltersType) => void;
}

const statusOptions: { value: IssueStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In Progress" },
  { value: "in-review", label: "In Review" },
  { value: "closed", label: "Closed" }
];

const priorityOptions: { value: IssuePriority; label: string }[] = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" }
];

export const IssueFilters = ({ filters, onFiltersChange }: IssueFiltersProps) => {
  const assigneeOptions = getUniqueAssignees();

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search: search || undefined });
  };

  const handleStatusFilter = (status: IssueStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFiltersChange({ 
      ...filters, 
      status: newStatuses.length > 0 ? newStatuses : undefined 
    });
  };

  const handlePriorityFilter = (priority: IssuePriority) => {
    const currentPriorities = filters.priority || [];
    const newPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter(p => p !== priority)
      : [...currentPriorities, priority];
    
    onFiltersChange({ 
      ...filters, 
      priority: newPriorities.length > 0 ? newPriorities : undefined 
    });
  };

  const handleAssigneeFilter = (assignee: string) => {
    const currentAssignees = filters.assignee || [];
    const newAssignees = currentAssignees.includes(assignee)
      ? currentAssignees.filter(a => a !== assignee)
      : [...currentAssignees, assignee];
    
    onFiltersChange({ 
      ...filters, 
      assignee: newAssignees.length > 0 ? newAssignees : undefined 
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.search || filters.status?.length || filters.priority?.length || filters.assignee?.length;

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="mr-1 h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search issues..."
            value={filters.search || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <Label>Status</Label>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Badge
              key={option.value}
              variant={filters.status?.includes(option.value) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => handleStatusFilter(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div className="space-y-2">
        <Label>Priority</Label>
        <div className="flex flex-wrap gap-2">
          {priorityOptions.map((option) => (
            <Badge
              key={option.value}
              variant={filters.priority?.includes(option.value) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => handlePriorityFilter(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Assignee Filter */}
      <div className="space-y-2">
        <Label>Assignee</Label>
        <div className="flex flex-wrap gap-2">
          {assigneeOptions.map((assignee) => (
            <Badge
              key={assignee}
              variant={filters.assignee?.includes(assignee) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => handleAssigneeFilter(assignee)}
            >
              {assignee}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};