import { useState, useMemo } from "react";
import { Issue, IssueFilters as IssueFiltersType, PaginationParams, SortParams } from "@/types/issue";
import { mockIssues } from "@/data/mockIssues";

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [filters, setFilters] = useState<IssueFiltersType>({});
  const [pagination, setPagination] = useState<PaginationParams>({ page: 1, pageSize: 10 });
  const [sort, setSort] = useState<SortParams>({ field: "updatedAt", direction: "desc" });

  // Filter issues
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          issue.title.toLowerCase().includes(searchLower) ||
          issue.description.toLowerCase().includes(searchLower) ||
          issue.id.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(issue.status)) return false;
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(issue.priority)) return false;
      }

      // Assignee filter
      if (filters.assignee && filters.assignee.length > 0) {
        if (!filters.assignee.includes(issue.assignee)) return false;
      }

      return true;
    });
  }, [issues, filters]);

  // Sort issues
  const sortedIssues = useMemo(() => {
    return [...filteredIssues].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredIssues, sort]);

  // Paginate issues
  const paginatedIssues = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return sortedIssues.slice(startIndex, endIndex);
  }, [sortedIssues, pagination]);

  const totalIssues = filteredIssues.length;

  const handleSortChange = (field: keyof Issue) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  const handleFiltersChange = (newFilters: IssueFiltersType) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filters change
  };

  const handlePaginationChange = (newPagination: PaginationParams) => {
    setPagination(newPagination);
  };

  const addIssue = (issueData: Partial<Issue>) => {
    const newIssue: Issue = {
      id: `ISS-${String(issues.length + 1).padStart(3, '0')}`,
      title: issueData.title || "",
      description: issueData.description || "",
      status: issueData.status || "open",
      priority: issueData.priority || "medium",
      assignee: issueData.assignee || "",
      reporter: issueData.reporter || "Current User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      labels: issueData.labels || []
    };
    
    setIssues(prev => [newIssue, ...prev]);
  };

  const updateIssue = (updatedIssue: Partial<Issue> & { id: string }) => {
    setIssues(prev => prev.map(issue => 
      issue.id === updatedIssue.id 
        ? { ...issue, ...updatedIssue, updatedAt: new Date().toISOString() }
        : issue
    ));
  };

  return {
    issues: paginatedIssues,
    totalIssues,
    filters,
    pagination,
    sort,
    handleSortChange,
    handleFiltersChange,
    handlePaginationChange,
    addIssue,
    updateIssue
  };
};