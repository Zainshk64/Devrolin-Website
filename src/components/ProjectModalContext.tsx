"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

// ─── Context ──────────────────────────────────────────────────────────────────
interface ProjectModalContextType {
  openModal:  (serviceName?: string) => void;
  closeModal: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextType>({
  openModal:  () => {},
  closeModal: () => {},
});

export const useProjectModal = () => useContext(ProjectModalContext);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const ProjectModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open,        setOpen]        = useState(false);
  const [serviceName, setServiceName] = useState<string>("");

  const openModal  = useCallback((name?: string) => {
    setServiceName(name || "");
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <ProjectModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {open && <ProjectModal serviceName={serviceName} onClose={closeModal} />}
    </ProjectModalContext.Provider>
  );
};

// ─── Modal Component ──────────────────────────────────────────────────────────
interface ProjectModalProps {
  serviceName: string;
  onClose:     () => void;
}

const WA_NUMBER = "971522347966";
const EMAIL     = "systems@devrolin.com";

const ProjectModal = ({ serviceName, onClose }: ProjectModalProps) => {
  const waMessage = serviceName
    ? `Hey DevRolin, I was checking your ${serviceName} page and wanted to discuss my project.`
    : ` Hey DevRolin, I think my business needs better systems and wanted to discuss a potential project with your team`;

  const waLink     = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;
  const mailtoLink = `mailto:${EMAIL}?subject=Project%20Inquiry&body=${encodeURIComponent(waMessage)}`;
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=Project%20Inquiry&body=${encodeURIComponent(waMessage)}`;

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>{`
        /* ── Backdrop ── */
        .pm-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: pm-fade-in 0.25s ease;
          overflow-y: auto; /* ✅ Allow scroll on backdrop */
        }

        @keyframes pm-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Modal box ── */
        .pm-box {
          background: #111111;
          border: 1px solid #222;
          border-radius: 20px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh; /* ✅ Limit height to 90% of viewport */
          padding: 40px 36px 36px;
          position: relative;
          animation: pm-slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(249,115,22,0.08);
          overflow-y: auto; /* ✅ Enable vertical scroll inside modal */
          margin: auto; /* ✅ Center vertically when scrolling */
        }

        /* ✅ Custom scrollbar for modal */
        .pm-box::-webkit-scrollbar {
          width: 6px;
        }
        .pm-box::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 10px;
        }
        .pm-box::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .pm-box::-webkit-scrollbar-thumb:hover {
          background: #f97316;
        }

        @keyframes pm-slide-up {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* ── Close ── */
        .pm-close {
          position: sticky; /* ✅ Make close button sticky */
          top: 18px;
          right: 18px;
          margin-left: auto; /* ✅ Push to right */
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #2a2a2a;
          background: #1a1a1a;
          color: #888;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          z-index: 10; /* ✅ Ensure it stays above content */
          margin-bottom: 12px; /* ✅ Spacing below button */
        }
        .pm-close:hover { border-color: #f97316; color: #f97316; background: rgba(249,115,22,0.08); }

        /* ── Header ── */
        .pm-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.25);
          color: #f97316;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 16px;
        }

        .pm-title {
          font-size: 1.65rem;
          font-weight: 900;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 6px;
          font-family: 'Arial Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .pm-subtitle {
          font-size: 13.5px;
          color: #777;
          margin: 0 0 28px;
          line-height: 1.6;
        }

        /* ── Divider ── */
        .pm-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .pm-divider::before,
        .pm-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #222;
        }
        .pm-divider span {
          font-size: 11px;
          color: #444;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── Options ── */
        .pm-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Base card */
        .pm-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          border-radius: 14px;
          border: 1px solid #222;
          background: #161616;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.22s ease, background 0.22s ease, transform 0.18s ease;
          position: relative;
          overflow: hidden;
        }
        .pm-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.22s ease;
          border-radius: inherit;
        }
        .pm-card:hover { transform: translateY(-2px); }
        .pm-card:hover::before { opacity: 1; }

        /* ── WhatsApp (primary) ── */
        .pm-card--wa {
          border-color: rgba(37,211,102,0.25);
          background: rgba(37,211,102,0.05);
        }
        .pm-card--wa::before {
          background: rgba(37,211,102,0.07);
        }
        .pm-card--wa:hover { border-color: rgba(37,211,102,0.55); }

        .pm-card__icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 22px;
        }

        .pm-card--wa .pm-card__icon-wrap {
          background: rgba(37,211,102,0.12);
          color: #25D366;
        }
        .pm-card--form .pm-card__icon-wrap {
          background: rgba(249,115,22,0.12);
          color: #f97316;
        }
        .pm-card--mail .pm-card__icon-wrap {
          background: rgba(99,102,241,0.12);
          color: #818cf8;
        }

        .pm-card__body { flex: 1; min-width: 0; }

        .pm-card__head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 3px;
        }

        .pm-card__label {
          font-size: 14.5px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
        }

        .pm-card__badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 20px;
        }

        .pm-card--wa .pm-card__badge {
          background: rgba(37,211,102,0.15);
          color: #25D366;
          border: 1px solid rgba(37,211,102,0.3);
        }

        .pm-card__desc {
          font-size: 12.5px;
          color: #666;
          line-height: 1.5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pm-card__arrow {
          color: #333;
          font-size: 14px;
          flex-shrink: 0;
          transition: color 0.2s, transform 0.2s;
        }
        .pm-card:hover .pm-card__arrow { color: #fff; transform: translate(2px, -2px); }

        /* ── Form card hover ── */
        .pm-card--form:hover { border-color: rgba(249,115,22,0.45); }
        .pm-card--form::before { background: rgba(249,115,22,0.05); }

        /* ── Mail card hover ── */
        .pm-card--mail:hover { border-color: rgba(99,102,241,0.45); }
        .pm-card--mail::before { background: rgba(99,102,241,0.05); }

        /* ── Footer note ── */
        .pm-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 12px;
          color: #444;
        }
        .pm-footer a { color: #f97316; text-decoration: none; }
        .pm-footer a:hover { text-decoration: underline; }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .pm-box {
            padding: 32px 22px 28px;
            border-radius: 16px;
            max-height: 85vh; /* ✅ Slightly smaller on mobile */
          }
            .pm-card__badge{
            display:none;
            }
          .pm-title { font-size: 1.35rem; }
          .pm-card  { padding: 15px 16px; gap: 13px; }
          .pm-card__icon-wrap { width: 42px; height: 42px; font-size: 19px; }
          .pm-card__label     { font-size: 13.5px; }
          .pm-card__desc      { font-size: 12px; }
        }

        /* ✅ Extra small screens */
        @media (max-height: 700px) {
          .pm-box {
            max-height: 80vh;
            padding: 24px 20px 20px;
          }
          .pm-title { font-size: 1.3rem; }
          .pm-subtitle { font-size: 12.5px; margin-bottom: 20px; }
        }
      `}</style>

      <div className="pm-backdrop" onClick={handleBackdrop}>
        <div className="pm-box" role="dialog" aria-modal="true" aria-label="Start your project">

          {/* Close */}
          <button className="pm-close" onClick={onClose} aria-label="Close modal">
            <i className="fa-light fa-xmark"></i>
          </button>

          {/* Header */}
          <div className="pm-tag">
            <i className="fa-light fa-bolt"></i>
            Get Your System Plan
          </div>
          <h2 className="pm-title">How would you<br />like to connect?</h2>
          <p className="pm-subtitle">
            Choose the fastest way to start — we'll tailor a plan for your business.
          </p>

          {/* Options */}
          <div className="pm-options">

            {/* ── WhatsApp (Primary) ── */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pm-card pm-card--wa"
            >
              <div className="pm-card__icon-wrap">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="pm-card__body">
                <div className="pm-card__head">
                  <span className="pm-card__label">WhatsApp</span>
                  <span className="pm-card__badge">Fastest Response</span>
                </div>
                <p className="pm-card__desc">Best for quick discussions and instant replies.</p>
              </div>
              <i className="fa-light fa-arrow-up-right pm-card__arrow"></i>
            </a>

            <div className="pm-divider">
              <span>or choose another way</span>
            </div>

            {/* ── Project Form ── */}
            <a
              href="/contact-us"
              className="pm-card pm-card--form"
            >
              <div className="pm-card__icon-wrap">
                <i className="fa-light fa-file-lines"></i>
              </div>
              <div className="pm-card__body">
                <div className="pm-card__head">
                  <span className="pm-card__label">Project Form</span>
                </div>
                <p className="pm-card__desc">Best for accurate scope, timeline &amp; pricing.</p>
              </div>
              <i className="fa-light fa-arrow-up-right pm-card__arrow"></i>
            </a>

            {/* ── Email ── */}
            <a
              href={gmailLink}
              target="_blank"
              className="pm-card pm-card--mail"
            >
              <div className="pm-card__icon-wrap">
                <i className="fa-light fa-envelope"></i>
              </div>
              <div className="pm-card__body">
                <div className="pm-card__head">
                  <span className="pm-card__label">Email Us</span>
                </div>
                <p className="pm-card__desc">For enterprise discussions or attachments.</p>
              </div>
              <i className="fa-light fa-arrow-up-right pm-card__arrow"></i>
            </a>

          </div>

          {/* Footer */}
          <p className="pm-footer">
            Prefer a call? Reach us on WhatsApp at{" "}
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
              +971 52 234 7966
            </a>
          </p>

        </div>
      </div>
    </>
  );
};