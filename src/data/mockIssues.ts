import { Issue } from "@/types/issue";

export const mockIssues: Issue[] = [
  {
    id: "ISS-001",
    title: "User authentication flow needs improvement",
    description: "The current login process is confusing and needs better error handling and UX improvements.",
    status: "open",
    priority: "high",
    assignee: "Alice Johnson",
    reporter: "Product Team",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:22:00Z",
    labels: ["frontend", "ux", "authentication"]
  },
  {
    id: "ISS-002", 
    title: "API response times are slow",
    description: "Database queries are taking too long, affecting overall application performance.",
    status: "in-progress",
    priority: "critical",
    assignee: "Bob Smith",
    reporter: "DevOps Team",
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-17T11:45:00Z",
    labels: ["backend", "performance", "database"]
  },
  {
    id: "ISS-003",
    title: "Mobile responsive design issues",
    description: "Several components don't render properly on mobile devices, particularly on screens smaller than 768px.",
    status: "in-review",
    priority: "medium",
    assignee: "Carol Davis",
    reporter: "QA Team",
    createdAt: "2024-01-13T16:20:00Z",
    updatedAt: "2024-01-17T09:30:00Z",
    labels: ["frontend", "mobile", "css"]
  },
  {
    id: "ISS-004",
    title: "Add dark mode support",
    description: "Users have requested a dark mode toggle for better accessibility and user preference.",
    status: "open",
    priority: "low",
    assignee: "Alice Johnson", 
    reporter: "Community",
    createdAt: "2024-01-12T14:10:00Z",
    updatedAt: "2024-01-12T14:10:00Z",
    labels: ["frontend", "accessibility", "feature"]
  },
  {
    id: "ISS-005",
    title: "Memory leak in data processing",
    description: "Large dataset processing is causing memory leaks and eventual application crashes.",
    status: "closed",
    priority: "critical",
    assignee: "Bob Smith",
    reporter: "DevOps Team",
    createdAt: "2024-01-10T08:45:00Z",
    updatedAt: "2024-01-15T16:20:00Z",
    labels: ["backend", "memory", "performance"]
  },
  {
    id: "ISS-006",
    title: "Update user profile validation",
    description: "Current form validation is too restrictive and blocks valid user inputs.",
    status: "in-progress",
    priority: "medium",
    assignee: "Carol Davis",
    reporter: "Support Team",
    createdAt: "2024-01-11T13:25:00Z",
    updatedAt: "2024-01-16T10:15:00Z",
    labels: ["frontend", "validation", "forms"]
  },
  {
    id: "ISS-007",
    title: "Implement automated testing",
    description: "Add comprehensive test coverage for critical user flows to prevent regressions.",
    status: "open",
    priority: "high",
    assignee: "Development Team",
    reporter: "Technical Lead",
    createdAt: "2024-01-09T11:00:00Z",
    updatedAt: "2024-01-17T13:45:00Z",
    labels: ["testing", "automation", "ci/cd"]
  },
  {
    id: "ISS-008",
    title: "Search functionality returns incorrect results",
    description: "The search algorithm is not properly indexing all content fields and returns incomplete results.",
    status: "in-review",
    priority: "high",
    assignee: "Alice Johnson",
    reporter: "QA Team",
    createdAt: "2024-01-08T15:30:00Z",
    updatedAt: "2024-01-17T12:00:00Z",
    labels: ["backend", "search", "algorithm"]
  }
];

export const getUniqueAssignees = (): string[] => {
  const assignees = new Set(mockIssues.map(issue => issue.assignee));
  return Array.from(assignees).sort();
};