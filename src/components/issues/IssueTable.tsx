import { Issue, SortParams } from "@/types/issue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { ChevronUp, ChevronDown, Edit, Eye } from "lucide-react";
import { format } from "date-fns";

interface IssueTableProps {
  issues: Issue[];
  sortParams: SortParams;
  onSortChange: (field: keyof Issue) => void;
  onEditIssue: (issue: Issue) => void;
  onViewIssue: (issue: Issue) => void;
}

export const IssueTable = ({ 
  issues, 
  sortParams, 
  onSortChange, 
  onEditIssue, 
  onViewIssue 
}: IssueTableProps) => {
  const SortableHeader = ({ field, children }: { field: keyof Issue; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer select-none hover:bg-muted/50"
      onClick={() => onSortChange(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortParams.field === field && (
          sortParams.direction === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader field="id">ID</SortableHeader>
            <SortableHeader field="title">Title</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <SortableHeader field="priority">Priority</SortableHeader>
            <SortableHeader field="assignee">Assignee</SortableHeader>
            <SortableHeader field="updatedAt">Updated</SortableHeader>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow 
              key={issue.id} 
              className="cursor-pointer hover:bg-muted/30"
              onClick={() => onViewIssue(issue)}
            >
              <TableCell className="font-medium">{issue.id}</TableCell>
              <TableCell className="max-w-md">
                <div className="truncate font-medium">{issue.title}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {issue.description}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={issue.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={issue.priority} />
              </TableCell>
              <TableCell>{issue.assignee}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(issue.updatedAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewIssue(issue);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditIssue(issue);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {issues.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No issues found matching your criteria.
        </div>
      )}
    </div>
  );
};