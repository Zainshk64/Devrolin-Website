import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import { toast } from "react-hot-toast";
import moment from "moment";
import Link from "next/link";
// ─── Types ────────────────────────────────────────────────────────────────────

interface MilestoneForm {
  title: string;
  dueDate: string;
  amount: string;
  status: string;
}

interface HourlyLogForm {
  week: string;
  hours: string;
  rate: string;
}

interface ClientForm {
  name: string;
  company: string;
  avatar: string;
  avatarColor: string;
  status: string;
  projectTitle: string;
  projectDetails: string;
  totalBudget: string;
  amountPaid: string;
  currency: string;
  progressPercent: string;
  progressLabel: string;
  startDate: string;
  endDate: string;
  paymentType: string;
  googleDocUrl: string;
  hourlyRate: string;
  totalHoursLogged: string;
  milestones: MilestoneForm[];
  hourlyLogs: HourlyLogForm[];
}

interface InvoiceForm {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  description: string;
  notes: string;
  paymentMethod: string;
}

const API = "https://devrolin-backend-production.up.railway.app/api";

const emptyMilestone: MilestoneForm = {
  title: "",
  dueDate: "",
  amount: "",
  status: "pending",
};

const emptyHourlyLog: HourlyLogForm = {
  week: "",
  hours: "",
  rate: "",
};

const defaultClientForm: ClientForm = {
  name: "",
  company: "",
  avatar: "",
  avatarColor: "#e87b2b",
  status: "active",
  projectTitle: "",
  projectDetails: "",
  totalBudget: "",
  amountPaid: "0",
  currency: "USD",
  progressPercent: "0",
  progressLabel: "Project Progress",
  startDate: "",
  endDate: "",
  paymentType: "milestone",
  googleDocUrl: "",
  hourlyRate: "",
  totalHoursLogged: "0",
  milestones: [{ ...emptyMilestone }],
  hourlyLogs: [],
};

const fmt = (n: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

// ─── Component ────────────────────────────────────────────────────────────────

const AdminClients = () => {
  const isAuthorized = useAdminAuth();

  // ── Client state ────────────────────────────────────────────────────────
  const [clients, setClients] = useState<any[]>([]);
  const [form, setForm] = useState<ClientForm>({ ...defaultClientForm });
  const [editForm, setEditForm] = useState(false);
  const [currentClientId, setCurrentClientId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Invoice state ───────────────────────────────────────────────────────
  const [invoiceClient, setInvoiceClient] = useState<any | null>(null);
  const [invoiceForm, setInvoiceForm] = useState<InvoiceForm>({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    amount: "",
    description: "",
    notes: "",
    paymentMethod: "bank_transfer",
  });
  const [invoiceSubmitting, setInvoiceSubmitting] = useState(false);
  const [clientInvoices, setClientInvoices] = useState<Record<string, any[]>>(
    {},
  );
  const [expandedInvoices, setExpandedInvoices] = useState<string | null>(null);

  // ── Active tab ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<"clients" | "invoices">("clients");

  // ── Fetch clients ───────────────────────────────────────────────────────
  const fetchClients = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API}/clients?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClients(data.clients || []);
    } catch {
      toast.error("Error fetching clients");
    }
  };

  useEffect(() => {
    if (isAuthorized) fetchClients();
  }, [isAuthorized]);

  // ── Fetch invoices for a client ─────────────────────────────────────────
  const fetchInvoicesForClient = async (clientId: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API}/invoices/client/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClientInvoices((prev) => ({ ...prev, [clientId]: data }));
    } catch {
      toast.error("Error fetching invoices");
    }
  };

  // ── Client form handlers ────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Milestone handlers
  const handleMilestoneChange = (
    index: number,
    field: keyof MilestoneForm,
    value: string,
  ) => {
    setForm((prev) => {
      const updated = [...prev.milestones];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, milestones: updated };
    });
  };

  const addMilestone = () => {
    setForm((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { ...emptyMilestone }],
    }));
  };

  const removeMilestone = (index: number) => {
    setForm((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  // Hourly log handlers
  const handleHourlyLogChange = (
    index: number,
    field: keyof HourlyLogForm,
    value: string,
  ) => {
    setForm((prev) => {
      const updated = [...prev.hourlyLogs];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, hourlyLogs: updated };
    });
  };

  const addHourlyLog = () => {
    setForm((prev) => ({
      ...prev,
      hourlyLogs: [...prev.hourlyLogs, { ...emptyHourlyLog }],
    }));
  };

  const removeHourlyLog = (index: number) => {
    setForm((prev) => ({
      ...prev,
      hourlyLogs: prev.hourlyLogs.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setForm({ ...defaultClientForm });
    setEditForm(false);
    setCurrentClientId(null);
  };

  // ── Submit client ───────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("adminToken");

    const payload: Record<string, unknown> = {
      name: form.name,
      company: form.company,
      avatar: form.avatar || form.name.charAt(0).toUpperCase(),
      avatarColor: form.avatarColor,
      status: form.status,
      projectTitle: form.projectTitle,
      projectDetails: form.projectDetails,
      totalBudget: Number(form.totalBudget),
      amountPaid: Number(form.amountPaid),
      currency: form.currency,
      progressPercent: Number(form.progressPercent),
      progressLabel: form.progressLabel,
      startDate: form.startDate,
      endDate: form.endDate,
      paymentType: form.paymentType,
      googleDocUrl: form.googleDocUrl,
    };

    if (form.paymentType === "milestone") {
      payload.milestones = JSON.stringify(
        form.milestones
          .filter((m) => m.title && m.dueDate && m.amount)
          .map((m) => ({
            title: m.title,
            dueDate: m.dueDate,
            amount: Number(m.amount),
            status: m.status,
          })),
      );
    }

    if (form.paymentType === "hourly") {
      payload.hourlyRate = Number(form.hourlyRate);
      payload.totalHoursLogged = Number(form.totalHoursLogged);
      payload.hourlyLogs = JSON.stringify(
        form.hourlyLogs
          .filter((l) => l.week && l.hours)
          .map((l) => ({
            week: l.week,
            hours: Number(l.hours),
            rate: Number(l.rate) || Number(form.hourlyRate),
          })),
      );
    }

    try {
      const url = editForm
        ? `${API}/admin/edit-client/${currentClientId}`
        : `${API}/admin/new-client`;

      const res = await fetch(url, {
        method: editForm ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          editForm
            ? "Client updated successfully"
            : "Client created successfully",
        );
        resetForm();
        fetchClients();
      } else {
        toast.error(data.message || "Failed to process client");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete client ───────────────────────────────────────────────────────
  const handleClientDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API}/admin/delete-client/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Client deleted successfully");
        setClients((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(data.message || "Failed to delete client");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // ── Edit client ─────────────────────────────────────────────────────────
  const handleClientEdit = (id: string) => {
    toast.success("Scroll up to edit");
    const client = clients.find((c) => c._id === id);
    if (!client) return;

    setForm({
      name: client.name || "",
      company: client.company || "",
      avatar: client.avatar || "",
      avatarColor: client.avatarColor || "#e87b2b",
      status: client.status || "active",
      projectTitle: client.projectTitle || "",
      projectDetails: client.projectDetails || "",
      totalBudget: String(client.totalBudget || ""),
      amountPaid: String(client.amountPaid || 0),
      currency: client.currency || "USD",
      progressPercent: String(client.progressPercent || 0),
      progressLabel: client.progressLabel || "Project Progress",
      startDate: client.startDate || "",
      endDate: client.endDate || "",
      paymentType: client.paymentType || "milestone",
      googleDocUrl: client.googleDocUrl || "",
      hourlyRate: String(client.hourlyRate || ""),
      totalHoursLogged: String(client.totalHoursLogged || 0),
      milestones:
        client.milestones?.length > 0
          ? client.milestones.map((m: any) => ({
              title: m.title || "",
              dueDate: m.dueDate || "",
              amount: String(m.amount || ""),
              status: m.status || "pending",
            }))
          : [{ ...emptyMilestone }],
      hourlyLogs:
        client.hourlyLogs?.length > 0
          ? client.hourlyLogs.map((l: any) => ({
              week: l.week || "",
              hours: String(l.hours || ""),
              rate: String(l.rate || ""),
            }))
          : [],
    });

    setEditForm(true);
    setCurrentClientId(id);
    setActiveTab("clients");
    window.scrollTo(0, 0);
  };

  // ── Invoice handlers ────────────────────────────────────────────────────
  const openInvoiceModal = (client: any) => {
    const remaining = client.totalBudget - client.amountPaid;
    setInvoiceClient(client);
    setInvoiceForm({
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      amount: String(remaining > 0 ? remaining : client.totalBudget),
      description: `Payment for: ${client.projectTitle}`,
      notes: "",
      paymentMethod: "bank_transfer",
    });
  };

  const closeInvoiceModal = () => {
    setInvoiceClient(null);
  };

  const handleInvoiceChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setInvoiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInvoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceClient) return;
    setInvoiceSubmitting(true);
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${API}/admin/new-invoice`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: invoiceClient._id,
          invoiceNumber: invoiceForm.invoiceNumber,
          invoiceDate: invoiceForm.invoiceDate,
          dueDate: invoiceForm.dueDate,
          amount: Number(invoiceForm.amount),
          description: invoiceForm.description,
          notes: invoiceForm.notes,
          paymentMethod: invoiceForm.paymentMethod,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Invoice ${invoiceForm.invoiceNumber} created!`);
        closeInvoiceModal();
        fetchClients();
        // Refresh invoices if expanded
        if (expandedInvoices === invoiceClient._id) {
          fetchInvoicesForClient(invoiceClient._id);
        }
      } else {
        toast.error(data.message || "Failed to create invoice");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setInvoiceSubmitting(false);
    }
  };

  const handleInvoiceDelete = async (invoiceId: string, clientId: string) => {
    if (!window.confirm("Delete this invoice?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${API}/admin/delete-invoice/${invoiceId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Invoice deleted");
        setClientInvoices((prev) => ({
          ...prev,
          [clientId]: (prev[clientId] || []).filter(
            (inv) => inv._id !== invoiceId,
          ),
        }));
        fetchClients();
      } else {
        toast.error(data.message || "Failed to delete invoice");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleMarkPaid = async (invoiceId: string, clientId: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API}/admin/invoice-paid/${invoiceId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Invoice marked as paid");
        fetchInvoicesForClient(clientId);
        fetchClients();
      } else {
        toast.error(data.message || "Failed to update invoice");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleInvoices = (clientId: string) => {
    if (expandedInvoices === clientId) {
      setExpandedInvoices(null);
    } else {
      setExpandedInvoices(clientId);
      if (!clientInvoices[clientId]) {
        fetchInvoicesForClient(clientId);
      }
    }
  };

  // ── Status badge helper ─────────────────────────────────────────────────
  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: "#22c55e",
      completed: "#e87b2b",
      "on-hold": "#ef4444",
      draft: "#888",
      sent: "#3b82f6",
      paid: "#22c55e",
      overdue: "#ef4444",
      cancelled: "#6b7280",
    };
    return (
      <span
        style={{
          color: colors[status] || "#888",
          border: `1px solid ${colors[status] || "#888"}`,
          padding: "2px 10px",
          borderRadius: 12,
          fontSize: 12,
          textTransform: "capitalize",
          fontWeight: 600,
        }}
      >
        {status.replace("-", " ")}
      </span>
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Admin — Clients & Invoices</title>
        <meta name="description" content="Manage clients and invoices" />
      </Head>

      <AdminLayout>
        <div className="container py-4">
          {/* Tab navigation */}
          <div className="d-flex gap-2 mb-4">
            <button
              className={`btn ${activeTab === "clients" ? "" : "btn-outline-secondary"}`}
              style={
                activeTab === "clients"
                  ? { background: "#e87b2b", color: "#fff", border: "none" }
                  : {}
              }
              onClick={() => setActiveTab("clients")}
            >
              <i className="fa-solid fa-handshake me-2" />
              Clients
            </button>
            <button
              className={`btn ${activeTab === "invoices" ? "" : "btn-outline-secondary"}`}
              style={
                activeTab === "invoices"
                  ? { background: "#e87b2b", color: "#fff", border: "none" }
                  : {}
              }
              onClick={() => setActiveTab("invoices")}
            >
              <i className="fa-solid fa-file-invoice-dollar me-2" />
              All Invoices
            </button>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* CLIENT TAB                                                     */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {activeTab === "clients" && (
            <>
              <h4 className="text-white mb-4">
                {editForm ? "Edit Client" : "Add New Client"}
              </h4>

              <form className="row g-3" onSubmit={handleSubmit}>
                {/* ── Basic Info ──────────────────────────────────────── */}
                <div className="col-12">
                  <h6 className="text-secondary mb-0">Basic Information</h6>
                </div>

                <div className="col-md-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="Client Name *"
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="Company *"
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    name="avatar"
                    value={form.avatar}
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="Avatar (emoji)"
                    maxLength={2}
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-2">
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="color"
                      name="avatarColor"
                      value={form.avatarColor}
                      onChange={handleChange}
                      className="form-control form-control-color p-1"
                      style={{ width: 50, height: 48 }}
                      title="Avatar Color"
                      disabled={submitting}
                    />
                    <small className="text-secondary">Color</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="form-select p-3"
                    disabled={submitting}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="form-select p-3"
                    disabled={submitting}
                  >
                    {["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF"].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    name="paymentType"
                    value={form.paymentType}
                    onChange={handleChange}
                    className="form-select p-3"
                    disabled={submitting}
                  >
                    <option value="milestone">Milestone</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>

                {/* ── Project Info ────────────────────────────────────── */}
                <div className="col-12 mt-3">
                  <h6 className="text-secondary mb-0">Project Information</h6>
                </div>

                <div className="col-md-6">
                  <input
                    name="projectTitle"
                    value={form.projectTitle}
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="Project Title *"
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="googleDocUrl"
                    value={form.googleDocUrl}
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="Google Doc URL (optional)"
                    disabled={submitting}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="projectDetails"
                    value={form.projectDetails}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Project Details *"
                    rows={3}
                    required
                    disabled={submitting}
                  />
                </div>

                {/* ── Financial Info ──────────────────────────────────── */}
                <div className="col-12 mt-3">
                  <h6 className="text-secondary mb-0">Financial & Timeline</h6>
                </div>

                <div className="col-md-3">
                  <label className="form-label text-secondary small">
                    Total Budget *
                  </label>
                  <input
                    name="totalBudget"
                    value={form.totalBudget}
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="0"
                    type="number"
                    min="0"
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label text-secondary small">
                    Amount Paid
                  </label>
                  <input
                    name="amountPaid"
                    value={form.amountPaid}
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="0"
                    type="number"
                    min="0"
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label text-secondary small">
                    Start Date *
                  </label>
                  <input
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="form-control p-3"
                    type="date"
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label text-secondary small">
                    End Date *
                  </label>
                  <input
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="form-control p-3"
                    type="date"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label text-secondary small">
                    Progress %
                  </label>
                  <input
                    name="progressPercent"
                    value={form.progressPercent}
                    onChange={handleChange}
                    className="form-control p-3"
                    type="number"
                    min="0"
                    max="100"
                    disabled={submitting}
                  />
                </div>
                <div className="col-md-8">
                  <label className="form-label text-secondary small">
                    Progress Label
                  </label>
                  <input
                    name="progressLabel"
                    value={form.progressLabel}
                    onChange={handleChange}
                    className="form-control p-3"
                    placeholder="Project Progress"
                    disabled={submitting}
                  />
                </div>

                {/* ── Milestone fields ────────────────────────────────── */}
                {form.paymentType === "milestone" && (
                  <>
                    <div className="col-12 mt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="text-secondary mb-0">Milestones</h6>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-light"
                          onClick={addMilestone}
                          disabled={submitting}
                        >
                          + Add Milestone
                        </button>
                      </div>
                    </div>

                    {form.milestones.map((m, i) => (
                      <div
                        key={i}
                        className="col-12"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: 8,
                          padding: 16,
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="row g-2 align-items-end">
                          <div className="col-md-3">
                            <label className="form-label text-secondary small">
                              Title
                            </label>
                            <input
                              className="form-control"
                              placeholder="Milestone title"
                              value={m.title}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  i,
                                  "title",
                                  e.target.value,
                                )
                              }
                              disabled={submitting}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label text-secondary small">
                              Due Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={m.dueDate}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  i,
                                  "dueDate",
                                  e.target.value,
                                )
                              }
                              disabled={submitting}
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label text-secondary small">
                              Amount
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="0"
                              value={m.amount}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  i,
                                  "amount",
                                  e.target.value,
                                )
                              }
                              disabled={submitting}
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label text-secondary small">
                              Status
                            </label>
                            <select
                              className="form-select"
                              value={m.status}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  i,
                                  "status",
                                  e.target.value,
                                )
                              }
                              disabled={submitting}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                          <div className="col-md-2 text-end">
                            {form.milestones.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeMilestone(i)}
                                disabled={submitting}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* ── Hourly fields ───────────────────────────────────── */}
                {form.paymentType === "hourly" && (
                  <>
                    <div className="col-12 mt-3">
                      <h6 className="text-secondary mb-0">Hourly Billing</h6>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label text-secondary small">
                        Hourly Rate ({form.currency})
                      </label>
                      <input
                        name="hourlyRate"
                        value={form.hourlyRate}
                        onChange={handleChange}
                        className="form-control p-3"
                        type="number"
                        min="0"
                        placeholder="0"
                        disabled={submitting}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-secondary small">
                        Total Hours Logged
                      </label>
                      <input
                        name="totalHoursLogged"
                        value={form.totalHoursLogged}
                        onChange={handleChange}
                        className="form-control p-3"
                        type="number"
                        min="0"
                        placeholder="0"
                        disabled={submitting}
                      />
                    </div>

                    <div className="col-12">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-secondary">Hourly Logs</small>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-light"
                          onClick={addHourlyLog}
                          disabled={submitting}
                        >
                          + Add Log Entry
                        </button>
                      </div>
                    </div>

                    {form.hourlyLogs.map((log, i) => (
                      <div
                        key={i}
                        className="col-12"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: 8,
                          padding: 16,
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="row g-2 align-items-end">
                          <div className="col-md-3">
                            <label className="form-label text-secondary small">
                              Week
                            </label>
                            <input
                              className="form-control"
                              placeholder="e.g. Week 1"
                              value={log.week}
                              onChange={(e) =>
                                handleHourlyLogChange(i, "week", e.target.value)
                              }
                              disabled={submitting}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label text-secondary small">
                              Hours
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="0"
                              value={log.hours}
                              onChange={(e) =>
                                handleHourlyLogChange(
                                  i,
                                  "hours",
                                  e.target.value,
                                )
                              }
                              disabled={submitting}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label text-secondary small">
                              Rate Override
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder={form.hourlyRate || "0"}
                              value={log.rate}
                              onChange={(e) =>
                                handleHourlyLogChange(i, "rate", e.target.value)
                              }
                              disabled={submitting}
                            />
                          </div>
                          <div className="col-md-3 text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeHourlyLog(i)}
                              disabled={submitting}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* ── Submit buttons ──────────────────────────────────── */}
                <div className="col-12 mt-3">
                  <button type="submit" className="btn" disabled={submitting}>
                    {submitting
                      ? "Saving..."
                      : editForm
                        ? "Update Client"
                        : "Create Client"}
                  </button>
                  {editForm && (
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={resetForm}
                      disabled={submitting}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {/* ── Client List ───────────────────────────────────────── */}
              <hr className="border-top border-secondary my-5" />
              <h4 className="text-white mb-3">
                All Clients ({clients.length})
              </h4>

              <div className="row">
                {clients.map((client) => {
                  const remaining = client.totalBudget - client.amountPaid;
                  const isExpanded = expandedInvoices === client._id;
                  const invoices = clientInvoices[client._id] || [];

                  return (
                    <div key={client._id} className="col-12 mb-4">
                      <div
                        className="card bg-dark text-white border border-secondary"
                        style={{ overflow: "hidden" }}
                      >
                        <div className="card-body">
                          {/* Header row */}
                          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                            <div className="d-flex align-items-center gap-3">
                              <div
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 12,
                                  background: client.avatarColor || "#e87b2b",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 20,
                                  fontWeight: 700,
                                  flexShrink: 0,
                                }}
                              >
                                {client.avatar}
                              </div>
                              <div>
                                <h5 className="mb-0">{client.name}</h5>
                                <small className="text-secondary">
                                  {client.company} &mdash; {client.projectTitle}
                                </small>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              {statusBadge(client.status)}
                              <Link
                                href={`/clients/${client._id}`}
                                className="btn btn-sm btn-outline-light"
                              >
                                <i className="fa-solid fa-eye me-1" />
                                View
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-info"
                                onClick={() => toggleInvoices(client._id)}
                              >
                                <i className="fa-solid fa-file-invoice-dollar me-1" />
                                Invoices
                              </button>
                              <button
                                className="btn btn-sm btn-outline-warning"
                                onClick={() => openInvoiceModal(client)}
                              >
                                + Invoice
                              </button>
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleClientEdit(client._id)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleClientDelete(client._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          {/* Stats row */}
                          <div
                            className="d-flex flex-wrap gap-4 mt-3 pt-3"
                            style={{
                              borderTop: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <div>
                              <small className="text-secondary d-block">
                                Budget
                              </small>
                              <strong>
                                {fmt(client.totalBudget, client.currency)}
                              </strong>
                            </div>
                            <div>
                              <small className="text-secondary d-block">
                                Paid
                              </small>
                              <strong style={{ color: "#22c55e" }}>
                                {fmt(client.amountPaid, client.currency)}
                              </strong>
                            </div>
                            <div>
                              <small className="text-secondary d-block">
                                Remaining
                              </small>
                              <strong
                                style={{
                                  color: remaining > 0 ? "#ef4444" : "#22c55e",
                                }}
                              >
                                {fmt(
                                  remaining < 0 ? 0 : remaining,
                                  client.currency,
                                )}
                              </strong>
                            </div>
                            <div>
                              <small className="text-secondary d-block">
                                Progress
                              </small>
                              <strong>{client.progressPercent}%</strong>
                            </div>
                            <div>
                              <small className="text-secondary d-block">
                                Type
                              </small>
                              <strong style={{ textTransform: "capitalize" }}>
                                {client.paymentType}
                              </strong>
                            </div>
                            <div>
                              <small className="text-secondary d-block">
                                Timeline
                              </small>
                              <strong>
                                {client.startDate} → {client.endDate}
                              </strong>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="mt-3">
                            <div
                              style={{
                                height: 6,
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: 3,
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${client.progressPercent}%`,
                                  height: "100%",
                                  background:
                                    client.progressPercent === 100
                                      ? "#22c55e"
                                      : "#e87b2b",
                                  borderRadius: 3,
                                  transition: "width 0.3s",
                                }}
                              />
                            </div>
                          </div>

                          {/* Milestones preview */}
                          {client.milestones?.length > 0 && (
                            <div className="mt-3 pt-2">
                              <small className="text-secondary">
                                Milestones ({client.milestones.length}):{" "}
                              </small>
                              <div className="d-flex flex-wrap gap-2 mt-1">
                                {client.milestones.map((m: any, i: number) => (
                                  <span
                                    key={i}
                                    style={{
                                      fontSize: 11,
                                      padding: "3px 8px",
                                      borderRadius: 6,
                                      background:
                                        m.status === "completed"
                                          ? "rgba(34,197,94,0.15)"
                                          : m.status === "in-progress"
                                            ? "rgba(59,130,246,0.15)"
                                            : "rgba(255,255,255,0.05)",
                                      color:
                                        m.status === "completed"
                                          ? "#22c55e"
                                          : m.status === "in-progress"
                                            ? "#3b82f6"
                                            : "#888",
                                      border: `1px solid ${
                                        m.status === "completed"
                                          ? "rgba(34,197,94,0.3)"
                                          : m.status === "in-progress"
                                            ? "rgba(59,130,246,0.3)"
                                            : "rgba(255,255,255,0.1)"
                                      }`,
                                    }}
                                  >
                                    {m.title} — {fmt(m.amount, client.currency)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Created date */}
                          <div
                            className="mt-3 pt-2"
                            style={{
                              borderTop: "1px solid rgba(255,255,255,0.05)",
                            }}
                          >
                            <small className="text-secondary">
                              Created:{" "}
                              {moment(client.createdAt).format("MMMM D, YYYY")}
                            </small>
                          </div>
                        </div>

                        {/* ── Expanded invoices ─────────────────────────── */}
                        {isExpanded && (
                          <div
                            style={{
                              background: "rgba(255,255,255,0.02)",
                              borderTop: "1px solid rgba(255,255,255,0.08)",
                              padding: 20,
                            }}
                          >
                            <h6 className="text-white mb-3">
                              <i className="fa-solid fa-file-invoice-dollar me-2" />
                              Invoices for {client.name}
                            </h6>

                            {invoices.length === 0 ? (
                              <p className="text-secondary mb-0">
                                No invoices yet.
                              </p>
                            ) : (
                              <div className="table-responsive">
                                <table
                                  className="table table-dark table-sm"
                                  style={{ fontSize: 13 }}
                                >
                                  <thead>
                                    <tr>
                                      <th>Invoice #</th>
                                      <th>Date</th>
                                      <th>Due</th>
                                      <th>Amount</th>
                                      <th>Method</th>
                                      <th>Status</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {invoices.map((inv: any) => (
                                      <tr key={inv._id}>
                                        <td>{inv.invoiceNumber}</td>
                                        <td>
                                          {moment(inv.invoiceDate).format(
                                            "MMM D, YY",
                                          )}
                                        </td>
                                        <td>
                                          {moment(inv.dueDate).format(
                                            "MMM D, YY",
                                          )}
                                        </td>
                                        <td>
                                          {fmt(
                                            inv.amount,
                                            inv.currency || client.currency,
                                          )}
                                        </td>
                                        <td
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {inv.paymentMethod?.replace("_", " ")}
                                        </td>
                                        <td>{statusBadge(inv.status)}</td>
                                        <td>
                                          <div className="d-flex gap-1">
                                            {inv.status !== "paid" && (
                                              <button
                                                className="btn btn-sm btn-outline-success"
                                                style={{
                                                  fontSize: 11,
                                                  padding: "2px 8px",
                                                }}
                                                onClick={() =>
                                                  handleMarkPaid(
                                                    inv._id,
                                                    client._id,
                                                  )
                                                }
                                              >
                                                Mark Paid
                                              </button>
                                            )}
                                            <button
                                              className="btn btn-sm btn-outline-danger"
                                              style={{
                                                fontSize: 11,
                                                padding: "2px 8px",
                                              }}
                                              onClick={() =>
                                                handleInvoiceDelete(
                                                  inv._id,
                                                  client._id,
                                                )
                                              }
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {clients.length === 0 && (
                  <div className="col-12 text-center text-secondary py-5">
                    <i className="fa-solid fa-handshake fa-3x mb-3 d-block" />
                    No clients yet. Create your first client above.
                  </div>
                )}
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* INVOICES TAB (all invoices across all clients)                  */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          {activeTab === "invoices" && <AllInvoicesTab />}
        </div>

        {/* ── Invoice Creation Modal ───────────────────────────────────── */}
        {invoiceClient && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeInvoiceModal();
            }}
          >
            <div
              style={{
                background: "#1a1a1a",
                borderRadius: 16,
                maxWidth: 600,
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                padding: 32,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <span
                    style={{
                      background: "#e87b2b",
                      color: "#fff",
                      fontSize: 11,
                      padding: "3px 10px",
                      borderRadius: 4,
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    NEW INVOICE
                  </span>
                  <h5 className="text-white mt-2 mb-0">Create Invoice</h5>
                  <small className="text-secondary">
                    {invoiceClient.name} — {invoiceClient.company}
                  </small>
                </div>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={closeInvoiceModal}
                  disabled={invoiceSubmitting}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleInvoiceSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label text-secondary small">
                      Invoice Number
                    </label>
                    <input
                      name="invoiceNumber"
                      value={invoiceForm.invoiceNumber}
                      onChange={handleInvoiceChange}
                      className="form-control"
                      required
                      disabled={invoiceSubmitting}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-secondary small">
                      Invoice Date
                    </label>
                    <input
                      name="invoiceDate"
                      type="date"
                      value={invoiceForm.invoiceDate}
                      onChange={handleInvoiceChange}
                      className="form-control"
                      required
                      disabled={invoiceSubmitting}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-secondary small">
                      Due Date
                    </label>
                    <input
                      name="dueDate"
                      type="date"
                      value={invoiceForm.dueDate}
                      onChange={handleInvoiceChange}
                      className="form-control"
                      required
                      disabled={invoiceSubmitting}
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="form-label text-secondary small">
                      Description
                    </label>
                    <input
                      name="description"
                      value={invoiceForm.description}
                      onChange={handleInvoiceChange}
                      className="form-control"
                      required
                      disabled={invoiceSubmitting}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-secondary small">
                      Amount ({invoiceClient.currency})
                    </label>
                    <input
                      name="amount"
                      type="number"
                      value={invoiceForm.amount}
                      onChange={handleInvoiceChange}
                      className="form-control"
                      min="0"
                      required
                      disabled={invoiceSubmitting}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-secondary small">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={invoiceForm.paymentMethod}
                      onChange={handleInvoiceChange}
                      className="form-select"
                      disabled={invoiceSubmitting}
                    >
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="paypal">PayPal</option>
                      <option value="stripe">Stripe</option>
                      <option value="wise">Wise</option>
                      <option value="crypto">Crypto</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small">
                      Notes (optional)
                    </label>
                    <input
                      name="notes"
                      value={invoiceForm.notes}
                      onChange={handleInvoiceChange}
                      className="form-control"
                      placeholder="Additional notes..."
                      disabled={invoiceSubmitting}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div
                  className="d-flex flex-wrap gap-4 mt-4 p-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div>
                    <small className="text-secondary d-block">Budget</small>
                    <strong className="text-white">
                      {fmt(invoiceClient.totalBudget, invoiceClient.currency)}
                    </strong>
                  </div>
                  <div>
                    <small className="text-secondary d-block">Paid</small>
                    <strong style={{ color: "#22c55e" }}>
                      {fmt(invoiceClient.amountPaid, invoiceClient.currency)}
                    </strong>
                  </div>
                  <div>
                    <small className="text-secondary d-block">
                      This Invoice
                    </small>
                    <strong style={{ color: "#e87b2b" }}>
                      {fmt(
                        Number(invoiceForm.amount) || 0,
                        invoiceClient.currency,
                      )}
                    </strong>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeInvoiceModal}
                    disabled={invoiceSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    style={{ background: "#e87b2b", color: "#fff" }}
                    disabled={invoiceSubmitting}
                  >
                    {invoiceSubmitting ? "Creating..." : "Create Invoice"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

// ─── All Invoices Tab ─────────────────────────────────────────────────────────

const AllInvoicesTab = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState<any>(null);

  const fetchAllInvoices = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`${API}/invoices?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setInvoices(data.invoices || []);
    } catch {
      toast.error("Error fetching invoices");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API}/invoices/stats/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStats(data);
    } catch {
      // silently fail
    }
  };

  useEffect(() => {
    fetchAllInvoices();
    fetchStats();
  }, [statusFilter]);

  const handleMarkPaid = async (invoiceId: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API}/admin/invoice-paid/${invoiceId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Invoice marked as paid");
        fetchAllInvoices();
        fetchStats();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (invoiceId: string) => {
    if (!window.confirm("Delete this invoice?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API}/admin/delete-invoice/${invoiceId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Invoice deleted");
        setInvoices((prev) => prev.filter((inv) => inv._id !== invoiceId));
        fetchStats();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const statusColors: Record<string, string> = {
    draft: "#888",
    sent: "#3b82f6",
    paid: "#22c55e",
    overdue: "#ef4444",
    cancelled: "#6b7280",
  };

  return (
    <>
      {/* Stats cards */}
      {stats && (
        <div className="row mb-4 g-3">
          {[
            {
              label: "Total",
              count: stats.totalInvoices,
              amount: null,
              color: "#e87b2b",
            },
            {
              label: "Draft",
              count: stats.draft?.count,
              amount: stats.draft?.total,
              color: "#888",
            },
            {
              label: "Sent",
              count: stats.sent?.count,
              amount: stats.sent?.total,
              color: "#3b82f6",
            },
            {
              label: "Paid",
              count: stats.paid?.count,
              amount: stats.paid?.total,
              color: "#22c55e",
            },
            {
              label: "Overdue",
              count: stats.overdue?.count,
              amount: stats.overdue?.total,
              color: "#ef4444",
            },
          ].map((s) => (
            <div className="col-sm-6 col-lg" key={s.label}>
              <div
                className="card bg-dark text-white border-0 h-100"
                style={{ borderLeft: `3px solid ${s.color}` }}
              >
                <div className="card-body py-2 px-3">
                  <small className="text-secondary">{s.label}</small>
                  <h5 className="mb-0">{s.count || 0}</h5>
                  {s.amount != null && (
                    <small style={{ color: s.color }}>
                      {fmt(s.amount || 0)}
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white mb-0">All Invoices</h5>
        <select
          className="form-select form-select-sm"
          style={{ width: "auto" }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p className="text-secondary">Loading invoices...</p>
      ) : invoices.length === 0 ? (
        <div className="text-center text-secondary py-5">
          <i className="fa-solid fa-file-invoice fa-3x mb-3 d-block" />
          No invoices found.
        </div>
      ) : (
        <div className="table-responsive">
          <table
            className="table table-dark table-hover"
            style={{ fontSize: 13 }}
          >
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Date</th>
                <th>Due</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => {
                const clientName =
                  typeof inv.client === "object"
                    ? `${inv.client.name} (${inv.client.company})`
                    : inv.client;

                return (
                  <tr key={inv._id}>
                    <td>
                      <strong>{inv.invoiceNumber}</strong>
                    </td>
                    <td>{clientName}</td>
                    <td>{moment(inv.invoiceDate).format("MMM D, YY")}</td>
                    <td>{moment(inv.dueDate).format("MMM D, YY")}</td>
                    <td>
                      <strong>{fmt(inv.amount, inv.currency || "USD")}</strong>
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {inv.paymentMethod?.replace("_", " ")}
                    </td>
                    <td>
                      <span
                        style={{
                          color: statusColors[inv.status] || "#888",
                          border: `1px solid ${statusColors[inv.status] || "#888"}`,
                          padding: "2px 10px",
                          borderRadius: 12,
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        {inv.status !== "paid" &&
                          inv.status !== "cancelled" && (
                            <button
                              className="btn btn-sm btn-outline-success"
                              style={{ fontSize: 11, padding: "2px 8px" }}
                              onClick={() => handleMarkPaid(inv._id)}
                            >
                              Mark Paid
                            </button>
                          )}
                        <button
                          className="btn btn-sm btn-outline-danger"
                          style={{ fontSize: 11, padding: "2px 8px" }}
                          onClick={() => handleDelete(inv._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AdminClients;
