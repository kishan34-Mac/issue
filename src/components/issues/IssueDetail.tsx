import { Issue } from "@/types/issue";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { User, Calendar, Tag } from "lucide-react";

interface IssueDetailProps {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IssueDetail = ({ issue, isOpen, onClose }: IssueDetailProps) => {
  if (!issue) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <span className="text-muted-foreground">{issue.id}</span>
            <span>{issue.title}</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Status and Priority */}
          <div className="flex gap-3">
            <StatusBadge status={issue.status} />
            <PriorityBadge priority={issue.priority} />
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {issue.description}
            </p>
          </div>

          <Separator />

          {/* Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Details</h3>
            
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Assignee</div>
                  <div className="text-sm text-muted-foreground">{issue.assignee}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Reporter</div>
                  <div className="text-sm text-muted-foreground">{issue.reporter}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Created</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(issue.createdAt), "PPpp")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Last Updated</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(issue.updatedAt), "PPpp")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Labels */}
          {issue.labels && issue.labels.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Labels</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {issue.labels.map((label) => (
                    <Badge key={label} variant="outline">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Raw JSON for debugging */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Raw Data (JSON)</h3>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-64">
              {JSON.stringify(issue, null, 2)}
            </pre>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};