"use client";
import React, { useState } from "react";
import ConsultFormModal from "./ConsultFormModal";

// ─────────────────────────────────────────────────────────────────────────────
// StartProjectButton
// Drop this anywhere in your app. Clicking it opens the ConsultFormModal.
//
// Props:
//   label    - button text (default: "Start Your Project")
//   variant  - "default" | "ghost" | "sm"  (default: "default")
//   className - optional extra class for positioning
// ─────────────────────────────────────────────────────────────────────────────

interface StartProjectButtonProps {
  label?: string;
  variant?: "default" | "ghost" | "sm";
  className?: string;
}

const StartProjectButton: React.FC<StartProjectButtonProps> = ({
  label = "Start Your Project",
  variant = "default",
  className = "",
}) => {
  const [open, setOpen] = useState(true);

  const btnClass = [
    "cf-trigger-btn",
    variant === "ghost" ? "cf-trigger-btn--ghost" : "",
    variant === "sm"    ? "cf-trigger-btn--sm"    : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <>
      <button className={btnClass} onClick={() => setOpen(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        {label}
      </button>

      {open && <ConsultFormModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default StartProjectButton;