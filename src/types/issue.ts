export type IssueStatus = "open" | "in-progress" | "in-review" | "closed";
export type IssuePriority = "low" | "medium" | "high" | "critical";

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  labels?: string[];
}

export interface IssueFilters {
  status?: IssueStatus[];
  priority?: IssuePriority[];
  assignee?: string[];
  search?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  field: keyof Issue;
  direction: "asc" | "desc";
}