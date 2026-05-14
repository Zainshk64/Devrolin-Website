"use client";
import React, { useState, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 — About Your Business
  fullName: string;
  email: string;
  whatsapp: string;
  company: string;
  website: string;

  // Step 2 — What Do You Need?
  services: string[];
  biggestBottleneck: string;
  currentTools: string;

  // Step 3 — Project Direction
  shortDescription: string;
  timeline: string;
  budget: string;
  files: File[];

  // Step 4 — Schedule
  selectedDay: string;
  selectedSlot: string;
  timezone: string;

  // Consents
  consentSMS: boolean;
  consentMarketing: boolean;
}

interface ConsultFormModalProps {
  onClose: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  "AI Automation Systems",
  "AI Integration",
  "CRM & Revenue Systems",
  "SaaS / MVP Development",
  "Web & Custom Platforms",
  "AI Agents",
  "API Integrations",
  "Dashboard & Internal Tools",
  "Workflow Automation",
  "Lead Management Systems",
  "Client Portals / Platforms",
  "Internal Operations Systems",
  "Not Sure Yet",
];

const BOTTLENECK_OPTIONS = [
  "Too Much Manual Work",
  "Team Repeating Same Tasks",
  "Leads Not Properly Managed",
  "Systems Not Connected",
  "Slow Operations",
  "No Automation Infrastructure",
  "Scaling Problems",
  "Need Better Reporting",
  "Need Faster Execution",
];

const TIMELINE_OPTIONS = [
  "ASAP",
  "1-2 Months",
  "3-6 Months",
  "6+ Months",
  "Just Exploring",
];

const BUDGET_OPTIONS = [
  "$10K to $25K",
  "$25K to $50K",
  "$50K to $200K",
  "$200K to $500K",
  "$500K+",
  "Not Sure",
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const TIMEZONES = [
  "UTC-12:00",
  "UTC-08:00 (PST)",
  "UTC-05:00 (EST)",
  "UTC+00:00 (GMT)",
  "UTC+01:00 (CET)",
  "UTC+03:00 (AST)",
  "UTC+05:00 (PKT)",
  "UTC+05:30 (IST)",
  "UTC+08:00 (CST)",
  "UTC+09:00 (JST)",
  "UTC+10:00 (AEST)",
];

const STEPS = ["About Your Business", "What You Need", "Project Direction", "Next Step"];

// ─── Calendar Helper ──────────────────────────────────────────────────────────
const getUpcomingDays = (startOffset = 0, count = 7) => {
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  let added = 0;
  let offset = startOffset;

  while (added < count) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    const dow = d.getDay();

    if (dow !== 0 && dow !== 6) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      days.push({
        key: dateKey,
        name: dayNames[dow],
        num: d.getDate(),
        month: monthNames[d.getMonth()],
        offset,
      });
      added++;
    }
    offset++;
  }
  return days;
};

// ─── Main Modal Component ─────────────────────────────────────────────────────
const ConsultFormModal: React.FC<ConsultFormModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calOffset, setCalOffset] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const [form, setForm] = useState<FormData>({
    // Step 1
    fullName: "",
    email: "",
    whatsapp: "",
    company: "",
    website: "",

    // Step 2
    services: [],
    biggestBottleneck: "",
    currentTools: "",

    // Step 3
    shortDescription: "",
    timeline: "",
    budget: "",
    files: [],

    // Step 4
    selectedDay: "",
    selectedSlot: "",
    timezone: "UTC+05:00 (PKT)",

    consentSMS: false,
    consentMarketing: false,
  });

  const set = (key: keyof FormData, value: any) =>
    setForm((p) => ({ ...p, [key]: value }));

  const toggleArr = (key: "services", val: string) =>
    set(
      key,
      form[key].includes(val)
        ? form[key].filter((v) => v !== val)
        : [...form[key], val],
    );

  // File handling
  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles).slice(0, 5 - form.files.length);
    set("files", [...form.files, ...arr]);
  };

  const removeFile = (i: number) =>
    set("files", form.files.filter((_, idx) => idx !== i));

  // Step validation
  const canProceed = () => {
    if (step === 0)
      return form.fullName.trim() && form.email.trim() && form.whatsapp.trim();
    if (step === 1)
      return form.services.length > 0 && form.biggestBottleneck;
    if (step === 2)
      return form.shortDescription.trim();
    if (step === 3)
      return form.selectedDay && form.selectedSlot && form.consentSMS;
    return true;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Upload files to Cloudinary
      const uploadedFileUrls: string[] = [];

      for (const file of form.files) {
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", file);
        cloudinaryData.append("upload_preset", "formspree_uploads");
        cloudinaryData.append("cloud_name", "drdpqf3ns");

        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/drdpqf3ns/auto/upload",
          {
            method: "POST",
            body: cloudinaryData,
          },
        );

        if (cloudinaryRes.ok) {
          const cloudinaryJson = await cloudinaryRes.json();
          uploadedFileUrls.push(cloudinaryJson.secure_url);
        }
      }

      // Send to Formspree
      const formDataObj = {
        // Step 1 — About Your Business
        fullName: form.fullName,
        email: form.email,
        whatsapp: form.whatsapp,
        company: form.company || "Not provided",
        website: form.website || "Not provided",

        // Step 2 — What Do You Need?
        services: form.services.join(", "),
        biggestBottleneck: form.biggestBottleneck,
        currentTools: form.currentTools || "Not provided",

        // Step 3 — Project Direction
        shortDescription: form.shortDescription,
        timeline: form.timeline || "Not specified",
        budget: form.budget || "Not specified",

        // File URLs
        attachments:
          uploadedFileUrls.length > 0
            ? uploadedFileUrls.join("\n")
            : "No attachments",

        fileNames:
          form.files.length > 0
            ? form.files.map((f) => f.name).join(", ")
            : "None",

        // Step 4 — Schedule
        selectedDay: form.selectedDay,
        selectedSlot: form.selectedSlot,
        timezone: form.timezone,

        // Consents
        consentSMS: form.consentSMS ? "Yes" : "No",
        consentMarketing: form.consentMarketing ? "Yes" : "No",

        // Metadata
        submittedAt: new Date().toLocaleString(),
      };

      const res = await fetch("https://formspree.io/f/mdawppow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataObj),
      });

      if (!res.ok) {
        throw new Error("Form submission failed");
      }

      console.log("Form submitted successfully");
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const days = getUpcomingDays(calOffset, 5);

  // ─── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="cf-backdrop" onClick={handleBackdrop}>
        <div className="cf-modal">
          <div className="cf-success">
            <div className="cf-success__icon">✓</div>
            <h2 className="cf-success__title">Your project request has been received.</h2>
            <p className="cf-success__sub">
              Our team reviews every inquiry manually to identify the fastest and highest-impact solution path. 
              Expect a response within a few hours.
            </p>
            
            {/* WhatsApp Quick Action */}
            <div className="cf-success__whatsapp">
              <p className="cf-success__whatsapp-title">Need faster communication?</p>
              <a
                href={`https://wa.me/971522347966?text=${encodeURIComponent(`Hi DevRolin, I just submitted a project inquiry. My name is ${form.fullName}. Looking forward to connecting!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cf-success__whatsapp-btn"
              >
                <i className="fa-brands fa-whatsapp"></i>
                Continue on WhatsApp
              </a>
            </div>

            <button className="cf-success__close" onClick={onClose}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cf-backdrop" onClick={handleBackdrop}>
      <div className="cf-modal">
        {/* ── Header ── */}
        <div className="cf-header">
          <div className="cf-header__top">
            <div className="cf-header__text">
              <span className="cf-header__eyebrow">Start Your System</span>
              <h2 className="cf-header__title">Let's Build Your System</h2>
              <p className="cf-header__sub">
                Share your operational challenge. We'll design the right solution and show you exactly how to build it.
                <br />
                Looking for a job?{" "}
                <a href="/careers" onClick={onClose}>
                  Visit our careers page →
                </a>
              </p>
            </div>
          </div>

          {/* Step indicators */}
          <div className="cf-steps">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className={`cf-step-item${
                  i === step
                    ? " cf-step-item--active"
                    : i < step
                      ? " cf-step-item--done"
                      : ""
                }`}
              >
                <div className="cf-step-item__dot">
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="cf-step-item__label">{label}</span>
                {i < STEPS.length - 1 && <div className="cf-step-item__line" />}
              </div>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="cf-body">
          {/* STEP 0 — About Your Business */}
          {step === 0 && (
            <div className="cf-step">
              <p className="cf-step__title">About Your Business</p>
              <div className="cf-row">
                <div className="cf-group">
                  <label className="cf-label">
                    Full Name <span>*</span>
                  </label>
                  <input
                    className="cf-input"
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </div>
                <div className="cf-group">
                  <label className="cf-label">
                    Email Address <span>*</span>
                  </label>
                  <input
                    className="cf-input"
                    type="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="cf-row">
                <div className="cf-group">
                  <label className="cf-label">
                    WhatsApp Number <span>*</span>
                  </label>
                  <input
                    className="cf-input"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                  />
                </div>
                <div className="cf-group">
                  <label className="cf-label">Company Name (Optional)</label>
                  <input
                    className="cf-input"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="cf-group">
                <label className="cf-label">Website (Optional)</label>
                <input
                  className="cf-input"
                  placeholder="https://yoursite.com"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 1 — What Do You Need? */}
          {step === 1 && (
            <div className="cf-step">
              <p className="cf-step__title">What Do You Need?</p>

              <div className="cf-group" style={{ marginBottom: 20 }}>
                <label className="cf-label">
                  Service Needed <span>*</span>
                </label>
                <div className="cf-service-grid">
                  {SERVICE_OPTIONS.map((s) => (
                    <label
                      key={s}
                      className={`cf-service-check${form.services.includes(s) ? " cf-service-check--active" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={form.services.includes(s)}
                        onChange={() => toggleArr("services", s)}
                      />
                      <div className="cf-service-check__box">
                        {form.services.includes(s) ? "✓" : ""}
                      </div>
                      <span className="cf-service-check__label">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="cf-group" style={{ marginBottom: 20 }}>
                <label className="cf-label">
                  Biggest Bottleneck <span>*</span>
                </label>
                <div className="cf-source-grid">
                  {BOTTLENECK_OPTIONS.map((b) => (
                    <label
                      key={b}
                      className={`cf-source-pill${form.biggestBottleneck === b ? " cf-source-pill--active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="bottleneck"
                        value={b}
                        checked={form.biggestBottleneck === b}
                        onChange={() => set("biggestBottleneck", b)}
                      />
                      {b}
                    </label>
                  ))}
                </div>
              </div>

              <div className="cf-group">
                <label className="cf-label">Current Tools Used (Optional)</label>
                <input
                  className="cf-input"
                  placeholder="e.g. HubSpot, Zapier, ClickUp..."
                  value={form.currentTools}
                  onChange={(e) => set("currentTools", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 2 — Project Direction */}
          {step === 2 && (
            <div className="cf-step">
              <p className="cf-step__title">Project Direction</p>

              <div className="cf-group" style={{ marginBottom: 20 }}>
                <label className="cf-label">
                  Short Description <span>*</span>
                </label>
                <textarea
                  className="cf-textarea"
                  placeholder="Describe what you want to achieve, main pain points, and what success looks like for you..."
                  value={form.shortDescription}
                  onChange={(e) => set("shortDescription", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="cf-row">
                <div className="cf-group">
                  <label className="cf-label">Timeline (Optional)</label>
                  <select
                    className="cf-select"
                    value={form.timeline}
                    onChange={(e) => set("timeline", e.target.value)}
                  >
                    <option value="">Select timeline...</option>
                    {TIMELINE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="cf-group">
                  <label className="cf-label">Budget (Optional)</label>
                  <select
                    className="cf-select"
                    value={form.budget}
                    onChange={(e) => set("budget", e.target.value)}
                  >
                    <option value="">Select budget...</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* File Upload */}
              <div className="cf-group">
                <label className="cf-label">File Upload (Optional)</label>
                <div
                  className={`cf-upload${dragOver ? " cf-upload--drag" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    addFiles(e.dataTransfer.files);
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                  <span className="cf-upload__icon">📎</span>
                  <p className="cf-upload__text">
                    <strong>Click to browse</strong> or drag & drop files
                  </p>
                  <p className="cf-upload__hint">
                    PNG, JPG, PDF, DOC — max 5 files
                  </p>
                  {form.files.length > 0 && (
                    <div
                      className="cf-upload__files"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {form.files.map((f, i) => (
                        <div key={i} className="cf-upload__file-chip">
                          {f.name}
                          <button onClick={() => removeFile(i)}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Schedule */}
          {step === 3 && (
            <div className="cf-step">
              <p className="cf-step__title">
                Schedule a free 30-min consultation
              </p>

              <div className="cf-calendar">
                <div className="cf-calendar__header">
                  <button
                    className="cf-calendar__nav"
                    onClick={() => setCalOffset((o) => Math.max(0, o - 5))}
                  >
                    ‹
                  </button>
                  <span className="cf-calendar__month">
                    {days[0]?.month} —{" "}
                    {days[days.length - 1]?.month || days[0]?.month}
                  </span>
                  <button
                    className="cf-calendar__nav"
                    onClick={() => setCalOffset((o) => o + 5)}
                  >
                    ›
                  </button>
                </div>

                <div className="cf-calendar__days">
                  {days.map((d) => (
                    <div
                      key={d.key}
                      className={`cf-day${form.selectedDay === d.key ? " cf-day--active" : ""}`}
                      onClick={() => set("selectedDay", d.key)}
                    >
                      <span className="cf-day__name">{d.name}</span>
                      <span className="cf-day__num">{d.num}</span>
                      <span className="cf-day__month">{d.month}</span>
                    </div>
                  ))}
                </div>

                {form.selectedDay && (
                  <div className="cf-calendar__slots">
                    {TIME_SLOTS.map((slot) => (
                      <div
                        key={slot}
                        className={`cf-slot${form.selectedSlot === slot ? " cf-slot--active" : ""}`}
                        onClick={() => set("selectedSlot", slot)}
                      >
                        {slot}
                      </div>
                    ))}
                  </div>
                )}

                <div className="cf-tz-row">
                  <span className="cf-tz-label">Timezone</span>
                  <select
                    className="cf-tz-select"
                    value={form.timezone}
                    onChange={(e) => set("timezone", e.target.value)}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Consents */}
              <div className="cf-consents" style={{ marginTop: 20 }}>
                <label
                  className={`cf-consent${form.consentSMS ? " cf-consent--checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={form.consentSMS}
                    onChange={() => set("consentSMS", !form.consentSMS)}
                  />
                  <div className="cf-consent__box">
                    {form.consentSMS ? "✓" : ""}
                  </div>
                  <span className="cf-consent__text">
                    I agree to receive conversational text messages from
                    Devrolin. Message & data rates may apply. Reply STOP to
                    unsubscribe. <span style={{ color: "#e87b2b" }}>*</span>
                  </span>
                </label>
                <label
                  className={`cf-consent${form.consentMarketing ? " cf-consent--checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={form.consentMarketing}
                    onChange={() =>
                      set("consentMarketing", !form.consentMarketing)
                    }
                  />
                  <div className="cf-consent__box">
                    {form.consentMarketing ? "✓" : ""}
                  </div>
                  <span className="cf-consent__text">
                    I agree to receive marketing updates. By clicking Submit you
                    accept our{" "}
                    <a href="/privacy" target="_blank">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="cf-footer">
          <button
            className="cf-footer__back"
            onClick={handleBack}
            disabled={step === 0}
          >
            ← Back
          </button>

          <span className="cf-footer__step-count">
            Step {step + 1} of {STEPS.length}
          </span>

          {step < STEPS.length - 1 ? (
            <button
              className="cf-footer__next"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Continue
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              className="cf-footer__next"
              onClick={handleSubmit}
              disabled={!canProceed() || loading}
            >
              {loading ? (
                <>
                  Submitting… <div className="cf-spinner" />
                </>
              ) : (
                <>
                  Submit Request
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultFormModal;