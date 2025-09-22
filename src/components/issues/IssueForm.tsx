import { useState } from "react";
import { Issue, IssueStatus, IssuePriority } from "@/types/issue";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getUniqueAssignees } from "@/data/mockIssues";

interface IssueFormProps {
  issue?: Issue;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (issue: Partial<Issue>) => void;
}

const statusOptions: { value: IssueStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In Progress" },
  { value: "in-review", label: "In Review" },
  { value: "closed", label: "Closed" }
];

const priorityOptions: { value: IssuePriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" }
];

export const IssueForm = ({ issue, isOpen, onClose, onSubmit }: IssueFormProps) => {
  const [formData, setFormData] = useState({
    title: issue?.title || "",
    description: issue?.description || "",
    status: issue?.status || "open" as IssueStatus,
    priority: issue?.priority || "medium" as IssuePriority,
    assignee: issue?.assignee || "",
    reporter: issue?.reporter || "Current User",
    labels: issue?.labels?.join(", ") || ""
  });

  const assigneeOptions = getUniqueAssignees();
  const isEditing = !!issue;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const issueData: Partial<Issue> = {
      ...formData,
      labels: formData.labels.split(",").map(l => l.trim()).filter(Boolean),
    };

    if (isEditing) {
      issueData.id = issue.id;
      issueData.createdAt = issue.createdAt;
      issueData.updatedAt = new Date().toISOString();
    }

    onSubmit(issueData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `Edit Issue ${issue.id}` : "Create New Issue"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter issue title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the issue in detail"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Select value={formData.assignee} onValueChange={(value) => handleChange("assignee", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {assigneeOptions.map((assignee) => (
                    <SelectItem key={assignee} value={assignee}>
                      {assignee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reporter">Reporter</Label>
              <Input
                id="reporter"
                value={formData.reporter}
                onChange={(e) => handleChange("reporter", e.target.value)}
                placeholder="Reporter name"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="labels">Labels</Label>
            <Input
              id="labels"
              value={formData.labels}
              onChange={(e) => handleChange("labels", e.target.value)}
              placeholder="Enter labels separated by commas"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Issue" : "Create Issue"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};