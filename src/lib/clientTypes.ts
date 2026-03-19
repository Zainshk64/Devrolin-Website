// ─── Types matching the backend MongoDB models ───────────────────────────────

export interface Milestone {
  _id?: string;
  title: string;
  dueDate: string;
  amount: number;
  status: "completed" | "in-progress" | "pending";
}

export interface HourlyLog {
  _id?: string;
  week: string;
  hours: number;
  rate: number;
}

export interface Client {
  _id: string;
  name: string;
  company: string;
  avatar: string;
  avatarColor: string;
  status: "active" | "completed" | "on-hold";
  projectTitle: string;
  projectDetails: string;
  totalBudget: number;
  amountPaid: number;
  currency: string;
  progressPercent: number;
  progressLabel: string;
  startDate: string;
  endDate: string;
  paymentType: "milestone" | "hourly";
  googleDocUrl: string;
  milestones?: Milestone[];
  hourlyRate?: number;
  totalHoursLogged?: number;
  hourlyLogs?: HourlyLog[];
  remainingBalance?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Invoice {
  _id: string;
  client: string | Client;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  currency: string;
  description: string;
  notes: string;
  paymentMethod:
    | "bank_transfer"
    | "paypal"
    | "stripe"
    | "wise"
    | "crypto"
    | "cash";
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  paidAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasMore: boolean;
}
