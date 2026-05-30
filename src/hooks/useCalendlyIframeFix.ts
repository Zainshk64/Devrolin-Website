import { useEffect } from "react";

/**
 * Injects a <style> tag into the Calendly iframe once it loads.
 * Needed because pageSettings cannot control input field text color.
 */
export const useCalendlyIframeFix = (isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen) return;

    const inject = () => {
      const iframes = document.querySelectorAll<HTMLIFrameElement>(
        'iframe[src*="calendly.com"]'
      );

      iframes.forEach((iframe) => {
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!doc || doc.querySelector("#devrolin-calendly-fix")) return;

          const style = doc.createElement("style");
          style.id = "devrolin-calendly-fix";
          style.textContent = `
            /* Input text readable on dark background */
            input,
            textarea,
            select {
              color: #ffffff !important;
              background-color: #1a1a1a !important;
              border-color: rgba(232, 123, 43, 0.35) !important;
              caret-color: #e87b2b !important;
            }

            input::placeholder,
            textarea::placeholder {
              color: rgba(255, 255, 255, 0.35) !important;
            }

            input:focus,
            textarea:focus,
            select:focus {
              border-color: #e87b2b !important;
              outline: none !important;
              box-shadow: 0 0 0 2px rgba(232, 123, 43, 0.2) !important;
            }

            /* Labels */
            label {
              color: #a3a3a3 !important;
            }
          `;

          doc.head.appendChild(style);
        } catch {
          // cross-origin guard — fails silently if iframe is cross-origin
          // Calendly is same-origin embedded so this works
        }
      });
    };

    // Try immediately, then retry a few times while iframe loads
    const timers = [100, 500, 1000, 2000, 3500].map((ms) =>
      setTimeout(inject, ms)
    );

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);
};