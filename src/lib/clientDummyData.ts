// lib/clientDummyData.ts

export type Milestone = {
  title: string;
  amount: number;
  status: "completed" | "in-progress" | "pending";
  dueDate: string;
};

export type HourlyLog = {
  week: string;
  hours: number;
  rate: number;
};

export type Client = {
  id: number;
  name: string;
  company: string;
  avatar: string; // initials
  avatarColor: string;
  projectTitle: string;
  projectDetails: string;
  googleDocUrl: string;
  paymentType: "milestone" | "hourly";
  currency: string;
  totalBudget: number;
  amountPaid: number;
  progressPercent: number;
  progressLabel: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "on-hold";
  milestones?: Milestone[];
  hourlyLogs?: HourlyLog[];
  hourlyRate?: number;
  totalHoursLogged?: number;
};

export const clientDummyData: Client[] = [
  {
    id: 1,
    name: "James Whitfield",
    company: "NovaTech Solutions",
    avatar: "JW",
    avatarColor: "#e87b2b",
    projectTitle: "AI Voice Booking Agent",
    projectDetails:
      "End-to-end AI voice assistant integrated with CRM for automated appointment booking, real-time slot management, and client follow-up. Built on GPT-4o with Twilio voice infrastructure. Deployed across 3 regional call centers.",
    googleDocUrl: "https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVEIupic/preview",
    paymentType: "milestone",
    currency: "USD",
    totalBudget: 18000,
    amountPaid: 12000,
    progressPercent: 72,
    progressLabel: "Phase 3 of 4 — Integration Testing",
    startDate: "Jan 10, 2025",
    endDate: "Apr 30, 2025",
    status: "active",
    milestones: [
      { title: "Discovery & Architecture", amount: 3000, status: "completed", dueDate: "Jan 25, 2025" },
      { title: "Core AI Model Integration", amount: 5000, status: "completed", dueDate: "Feb 20, 2025" },
      { title: "CRM & Twilio Integration", amount: 4000, status: "in-progress", dueDate: "Mar 30, 2025" },
      { title: "QA, Deployment & Handoff", amount: 6000, status: "pending", dueDate: "Apr 30, 2025" },
    ],
  },
  {
    id: 2,
    name: "Aisha Rahman",
    company: "Elevate Digital",
    avatar: "AR",
    avatarColor: "#2bc5e8",
    projectTitle: "SaaS MVP Platform",
    projectDetails:
      "Full-stack SaaS platform for B2B HR automation — employee onboarding, payroll integrations, and analytics dashboard. Built with Next.js 14, Supabase, and Stripe billing. Monthly billing cycles managed via Stripe webhooks.",
    googleDocUrl: "https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVEIupic/preview",
    paymentType: "hourly",
    currency: "USD",
    totalBudget: 25000,
    amountPaid: 9600,
    progressPercent: 38,
    progressLabel: "Sprint 4 — Payroll Module",
    startDate: "Dec 1, 2024",
    endDate: "Jun 15, 2025",
    status: "active",
    hourlyRate: 80,
    totalHoursLogged: 120,
    hourlyLogs: [
      { week: "Dec W3", hours: 22, rate: 80 },
      { week: "Dec W4", hours: 18, rate: 80 },
      { week: "Jan W1", hours: 25, rate: 80 },
      { week: "Jan W2", hours: 20, rate: 80 },
      { week: "Jan W3", hours: 15, rate: 80 },
      { week: "Feb W1", hours: 20, rate: 80 },
    ],
  },
  {
    id: 3,
    name: "Carlos Mendez",
    company: "BlockVault Finance",
    avatar: "CM",
    avatarColor: "#2be87b",
    projectTitle: "AI Document Processing System",
    projectDetails:
      "Automated document intelligence pipeline — OCR ingestion, contract clause extraction, risk flagging, and audit trail generation for financial compliance. Integrated with SharePoint and exported to client's internal ERP via REST APIs.",
    googleDocUrl: "https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVEIupic/preview",
    paymentType: "milestone",
    currency: "USD",
    totalBudget: 32000,
    amountPaid: 32000,
    progressPercent: 100,
    progressLabel: "Project Completed ✓",
    startDate: "Sep 5, 2024",
    endDate: "Jan 20, 2025",
    status: "completed",
    milestones: [
      { title: "Requirements & Data Mapping", amount: 4000, status: "completed", dueDate: "Sep 20, 2024" },
      { title: "OCR Pipeline Build", amount: 8000, status: "completed", dueDate: "Oct 15, 2024" },
      { title: "AI Extraction Model", amount: 10000, status: "completed", dueDate: "Nov 30, 2024" },
      { title: "ERP Integration & Go-live", amount: 10000, status: "completed", dueDate: "Jan 20, 2025" },
    ],
  },
];