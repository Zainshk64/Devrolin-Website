"use client";
import React, { useState, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 — Company
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  country: string;

  // Step 2 — Project
  services: string[];
  projectDesc: string;
  budget: string;
  files: File[];

  // Step 3 — Source
  source: string;
  sourceOther: string;

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
const BUDGET_OPTIONS = [
  "$10K to $25K",
  "$25K to $50K",
  "$50K to $200K",
  "$200K to $500K",
  "$500K+",
  "Not Sure",
];

const SERVICE_OPTIONS = [
  "Web Development",
  "Mobile App",
  "AI / ML Solutions",
  "Blockchain",
  "UI/UX Design",
  "SaaS Product",
  "API Integration",
  "Consulting",
];

const SOURCE_OPTIONS = [
  "Google Search",
  "LinkedIn",
  "Referral",
  "Social Media",
  "Blog / Article",
  "Other",
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

const STEPS = ["Company", "Project", "Source", "Schedule"];

// ─── Calendar Helper ──────────────────────────────────────────────────────────
const getUpcomingDays = (startOffset = 0, count = 7) => {
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Use local date without timezone issues
  const today = new Date();
  today.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues

  let added = 0;
  let offset = startOffset;

  while (added < count) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    const dow = d.getDay();

    if (dow !== 0 && dow !== 6) {
      // Format date as YYYY-MM-DD in local timezone
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
    fullName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    country: "",
    services: [],
    projectDesc: "",
    budget: "",
    files: [],
    source: "",
    sourceOther: "",
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
    set(
      "files",
      form.files.filter((_, idx) => idx !== i),
    );

  // Step validation
  const canProceed = () => {
    if (step === 0)
      return form.fullName.trim() && form.email.trim() && form.company.trim();
    if (step === 1) return form.projectDesc.trim() && form.budget;
    if (step === 2) return form.source;
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
      // Upload files to Cloudinary first
      const uploadedFileUrls: string[] = [];

      for (const file of form.files) {
        const cloudinaryData = new FormData();
        cloudinaryData.append("file", file);
        cloudinaryData.append("upload_preset", "formspree_uploads"); // Your preset name
        cloudinaryData.append("cloud_name", "drdpqf3ns"); // Replace with your cloud name

        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/drdpqf3ns/auto/upload", // Replace YOUR_CLOUD_NAME
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

      // Now send form data with file URLs to Formspree
      const formDataObj = {
        // Step 1 — Company Info
        fullName: form.fullName,
        email: form.email,
        phone: form.phone || "Not provided",
        company: form.company,
        website: form.website || "Not provided",
        country: form.country || "Not provided",

        // Step 2 — Project Info
        services:
          form.services.length > 0 ? form.services.join(", ") : "None selected",
        projectDesc: form.projectDesc || "No description",
        budget: form.budget,

        // File URLs from Cloudinary
        attachments:
          uploadedFileUrls.length > 0
            ? uploadedFileUrls.join("\n")
            : "No attachments",

        // File names for reference
        fileNames:
          form.files.length > 0
            ? form.files.map((f) => f.name).join(", ")
            : "None",

        // Step 3 — Source
        source: form.source,
        sourceOther: form.source === "Other" ? form.sourceOther : "",

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

  // Backdrop click
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
            <h2 className="cf-success__title">You're all set!</h2>
            <p className="cf-success__sub">
              Thanks, <strong>{form.fullName.split(" ")[0]}</strong>! We've
              received your project details. Our team will reach out within 24
              hours to confirm your <strong>{form.selectedSlot}</strong> call on{" "}
              <strong>{form.selectedDay}</strong>.
            </p>
            <a href="/">
              <button className="cf-success__close" onClick={onClose}>
                Back to Home
              </button>
            </a>
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
              <span className="cf-header__eyebrow">Start Your Project</span>
              <h2 className="cf-header__title">Let's Work Together</h2>
              <p className="cf-header__sub">
                Discuss your project, get a quote, or just pick our brains.{" "}
                <br />
                Looking for a job?{" "}
                <a href="/careers" onClick={onClose}>
                  Visit our careers page →
                </a>
              </p>
            </div>
            {/* <button className="cf-header__close" onClick={onClose} aria-label="Close">✕</button> */}
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
          {/* STEP 0 — Company */}
          {step === 0 && (
            <div className="cf-step">
              <p className="cf-step__title">Tell us about your company</p>
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
                    Company Name <span>*</span>
                  </label>
                  <input
                    className="cf-input"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                  />
                </div>
                <div className="cf-group">
                  <label className="cf-label">Phone Number</label>
                  <input
                    className="cf-input"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
              </div>
              <div className="cf-row">
                <div className="cf-group">
                  <label className="cf-label">Website</label>
                  <input
                    className="cf-input"
                    placeholder="https://yoursite.com"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </div>
                <div className="cf-group">
                  <label className="cf-label">Country</label>
                  <select
                    className="cf-select"
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                  >
                    <option value="">Select country...</option>
                    {[
                      "United States",
                      "United Kingdom",
                      "Canada",
                      "Australia",
                      "UAE",
                      "Pakistan",
                      "India",
                      "Germany",
                      "Singapore",
                      "Other",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 — Project */}
          {step === 1 && (
            <div className="cf-step">
              <p className="cf-step__title">Tell us more about your project</p>

              <div className="cf-group" style={{ marginBottom: 16 }}>
                <label className="cf-label">Services Needed</label>
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

              <div className="cf-group" style={{ marginBottom: 16 }}>
                <label className="cf-label">
                  Project Description <span>*</span>
                </label>
                <textarea
                  className="cf-textarea"
                  placeholder="Describe what you want to build, your goals, timeline, and any technical requirements..."
                  value={form.projectDesc}
                  onChange={(e) => set("projectDesc", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="cf-group" style={{ marginBottom: 16 }}>
                <label className="cf-label">
                  Budget Range <span>*</span>
                </label>
                <div className="cf-budget-grid">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`cf-budget-pill${form.budget === b ? " cf-budget-pill--active" : ""}`}
                      onClick={() => set("budget", b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="cf-group">
                <label className="cf-label">Attachments (optional)</label>
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

          {/* STEP 2 — Source */}
          {step === 2 && (
            <div className="cf-step">
              <p className="cf-step__title">Where did you hear about us?</p>
              <div className="cf-source-grid">
                {SOURCE_OPTIONS.map((s) => (
                  <label
                    key={s}
                    className={`cf-source-pill${form.source === s ? " cf-source-pill--active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="source"
                      value={s}
                      checked={form.source === s}
                      onChange={() => set("source", s)}
                    />
                    {s}
                  </label>
                ))}
              </div>
              {form.source === "Other" && (
                <div className="cf-group" style={{ marginTop: 14 }}>
                  <label className="cf-label">Please specify</label>
                  <input
                    className="cf-input"
                    placeholder="Tell us more..."
                    value={form.sourceOther}
                    onChange={(e) => set("sourceOther", e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Schedule */}
          {step === 3 && (
            <div className="cf-step">
              <p className="cf-step__title">
                Schedule a free 30-min tech consultation
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
