import { useState } from "react";
import { Issue } from "@/types/issue";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IssueTable } from "@/components/issues/IssueTable";
import { IssueFilters } from "@/components/issues/IssueFilters";
import { IssueDetail } from "@/components/issues/IssueDetail";
import { IssueForm } from "@/components/issues/IssueForm";
import { Pagination } from "@/components/issues/Pagination";
import { useIssues } from "@/hooks/useIssues";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const {
    issues,
    totalIssues,
    filters,
    pagination,
    sort,
    handleSortChange,
    handleFiltersChange,
    handlePaginationChange,
    addIssue,
    updateIssue
  } = useIssues();

  const { toast } = useToast();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateIssue = () => {
    setEditingIssue(null);
    setIsFormOpen(true);
  };

  const handleEditIssue = (issue: Issue) => {
    setEditingIssue(issue);
    setIsFormOpen(true);
  };

  const handleViewIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDetailOpen(true);
  };

  const handleSubmitIssue = (issueData: Partial<Issue>) => {
    if (editingIssue) {
      updateIssue({ ...issueData, id: editingIssue.id });
      toast({
        title: "Issue updated",
        description: `Issue ${editingIssue.id} has been updated successfully.`,
      });
    } else {
      addIssue(issueData);
      toast({
        title: "Issue created",
        description: "New issue has been created successfully.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Issues</h1>
            <p className="text-muted-foreground">
              Track and manage your project issues
            </p>
          </div>
          <Button onClick={handleCreateIssue} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Issue
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <IssueFilters 
              filters={filters} 
              onFiltersChange={handleFiltersChange} 
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            <IssueTable
              issues={issues}
              sortParams={sort}
              onSortChange={handleSortChange}
              onEditIssue={handleEditIssue}
              onViewIssue={handleViewIssue}
            />
            
            <Pagination
              currentPage={pagination.page}
              pageSize={pagination.pageSize}
              totalItems={totalIssues}
              onPageChange={handlePaginationChange}
            />
          </div>
        </div>

        {/* Issue Detail Sheet */}
        <IssueDetail
          issue={selectedIssue}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />

        {/* Issue Form Dialog */}
        <IssueForm
          issue={editingIssue}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmitIssue}
        />
      </div>
    </div>
  );
};

export default Index;
