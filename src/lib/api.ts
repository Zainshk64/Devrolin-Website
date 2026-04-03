export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://devrolin.com/api";

// ─── Generic fetch wrapper ───────────────────────────────────────────────────

interface FetchOptions {
  method?: string;
  body?: Record<string, unknown> | FormData;
  auth?: boolean;
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { method = "GET", body, auth = true } = options;

  const headers: Record<string, string> = {};

  if (auth) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(body);
    }
  }

  const res = await fetch(`${API_BASE}${endpoint}`, config);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Request failed with status ${res.status}`,
    );
  }

  return res.json();
}

// ─── Client API ──────────────────────────────────────────────────────────────

import type { Client, Invoice, PaginationInfo } from "./clientTypes";

interface ClientsResponse {
  clients: Client[];
  pagination: PaginationInfo;
}

interface ClientStatsResponse {
  totalClients: number;
  activeClients: number;
  completedClients: number;
  onHoldClients: number;
  totalBudget: number;
  totalPaid: number;
  totalOutstanding: number;
  avgBudget: number;
}

export const clientAPI = {
  // ── Read ─────────────────────────────────────────────────────────────────
  getAll: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : "";
    return apiFetch<ClientsResponse>(`/clients${query}`);
  },

  getById: (id: string) => apiFetch<Client>(`/clients/${id}`),

  getStats: () => apiFetch<ClientStatsResponse>("/clients/stats/summary"),

  // ── Write (admin) ────────────────────────────────────────────────────────
  create: (data: Record<string, unknown>) =>
    apiFetch<Client>("/admin/new-client", {
      method: "POST",
      body: data,
    }),

  update: (id: string, data: Record<string, unknown>) =>
    apiFetch<Client>(`/admin/edit-client/${id}`, {
      method: "PUT",
      body: data,
    }),

  updateProgress: (
    id: string,
    data: { progressPercent?: number; progressLabel?: string; status?: string },
  ) =>
    apiFetch<Client>(`/admin/client-progress/${id}`, {
      method: "PATCH",
      body: data as Record<string, unknown>,
    }),

  updateMilestone: (
    clientId: string,
    milestoneId: string,
    data: Record<string, unknown>,
  ) =>
    apiFetch<Client>(`/admin/client-milestone/${clientId}/${milestoneId}`, {
      method: "PATCH",
      body: data,
    }),

  addHourlyLog: (
    id: string,
    data: { week: string; hours: number; rate?: number },
  ) =>
    apiFetch<Client>(`/admin/client-hourly-log/${id}`, {
      method: "POST",
      body: data as Record<string, unknown>,
    }),

  delete: (id: string) =>
    apiFetch<{ message: string }>(`/admin/delete-client/${id}`, {
      method: "DELETE",
    }),
};

// ─── Invoice API ─────────────────────────────────────────────────────────────

interface InvoicesResponse {
  invoices: Invoice[];
  pagination: PaginationInfo;
}

interface InvoiceStatsResponse {
  totalInvoices: number;
  draft: { count: number; total: number };
  sent: { count: number; total: number };
  paid: { count: number; total: number };
  overdue: { count: number; total: number };
  cancelled: { count: number; total: number };
}

export const invoiceAPI = {
  // ── Read ─────────────────────────────────────────────────────────────────
  getAll: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : "";
    return apiFetch<InvoicesResponse>(`/invoices${query}`);
  },

  getById: (id: string) => apiFetch<Invoice>(`/invoices/${id}`),

  getByClient: (clientId: string) =>
    apiFetch<Invoice[]>(`/invoices/client/${clientId}`),

  getStats: () => apiFetch<InvoiceStatsResponse>("/invoices/stats/summary"),

  // ── Write (admin) ────────────────────────────────────────────────────────
  create: (data: Record<string, unknown>) =>
    apiFetch<Invoice>("/admin/new-invoice", {
      method: "POST",
      body: data,
    }),

  update: (id: string, data: Record<string, unknown>) =>
    apiFetch<Invoice>(`/admin/edit-invoice/${id}`, {
      method: "PUT",
      body: data,
    }),

  markPaid: (id: string) =>
    apiFetch<{ message: string; invoice: Invoice }>(
      `/admin/invoice-paid/${id}`,
      { method: "PATCH" },
    ),

  delete: (id: string) =>
    apiFetch<{ message: string }>(`/admin/delete-invoice/${id}`, {
      method: "DELETE",
    }),
};

// ─── Agency skills (home agency progress bars) ───────────────────────────────

export interface AgencySkill {
  _id: string;
  title: string;
  percent: number;
  sortOrder?: number;
}

export const agencySkillAPI = {
  getAll: () =>
    apiFetch<AgencySkill[]>("/agency-skills", { auth: false }),

  create: (body: { title: string; percent: number; sortOrder?: number }) =>
    apiFetch<AgencySkill>("/admin/new-agency-skill", {
      method: "POST",
      body: body as Record<string, unknown>,
    }),

  delete: (id: string) =>
    apiFetch<{ message: string }>(`/admin/delete-agency-skill/${id}`, {
      method: "DELETE",
    }),
};

// ─── Home sponsor logos (carousel on home) ───────────────────────────────────

export interface HomeSponsorLogo {
  _id: string;
  image: {
    url: string;
    alt?: string;
    public_id?: string;
  };
  sortOrder?: number;
}

export const homeSponsorAPI = {
  getAll: () =>
    apiFetch<HomeSponsorLogo[]>("/home-sponsors", { auth: false }),

  create: (formData: FormData) =>
    apiFetch<HomeSponsorLogo>("/admin/new-home-sponsor", {
      method: "POST",
      body: formData,
    }),

  delete: (id: string) =>
    apiFetch<{ message: string }>(`/admin/delete-home-sponsor/${id}`, {
      method: "DELETE",
    }),
};

// ─── Our service slides (ServiceMain carousel) ───────────────────────────────

export interface OurServiceSlide {
  _id: string;
  heading: string;
  bullets: string[];
  sortOrder?: number;
}

export const ourServiceSlideAPI = {
  getAll: () =>
    apiFetch<OurServiceSlide[]>("/our-service-slides", { auth: false }),

  create: (body: {
    heading: string;
    bullets: string[];
    sortOrder?: number;
  }) =>
    apiFetch<OurServiceSlide>("/admin/new-our-service-slide", {
      method: "POST",
      body: body as Record<string, unknown>,
    }),

  delete: (id: string) =>
    apiFetch<{ message: string }>(`/admin/delete-our-service-slide/${id}`, {
      method: "DELETE",
    }),
};
