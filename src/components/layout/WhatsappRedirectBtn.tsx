import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const FIRST_DELAY_MS = 15_000;
const COOLDOWN_MS    = 5 * 60_000;
const STORAGE_KEY    = "wa_tooltip_last_shown";

const MESSAGES: Record<string, string> = {
  "/strategy-session":
    "Hey Mudassir, exploring ways to improve operational efficiency and scale systems internally. Thought it made sense to reach out.",
};

const DEFAULT_MESSAGE =
  "Hey DevRolin, I think my business needs better systems and wanted to discuss a potential project with your team";

const WhatsappRedirectBtn = () => {
  const pathname = usePathname();

  const [isVisible,    setIsVisible]    = useState(false);
  const [tooltipState, setTooltipState] = useState<"hidden" | "in" | "shown" | "out">("hidden");

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getDelay = (): number => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return FIRST_DELAY_MS;
      const elapsed   = Date.now() - parseInt(raw, 10);
      const remaining = COOLDOWN_MS - elapsed;
      return remaining > 0 ? remaining : 0;
    };

    const runTooltip = () => {
      sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
      setTooltipState("in");

      const holdTimer = setTimeout(() => {
        setTooltipState("shown");

        const outTimer = setTimeout(() => {
          setTooltipState("out");

          const hideTimer = setTimeout(() => {
            setTooltipState("hidden");
          }, 500);

          return () => clearTimeout(hideTimer);
        }, 4000);

        return () => clearTimeout(outTimer);
      }, 500);

      return () => clearTimeout(holdTimer);
    };

    const showTimer = setTimeout(runTooltip, getDelay());
    return () => clearTimeout(showTimer);
  }, []);

  const handleProgressClick = () => {
    // Pick route-specific message, fall back to default
    const message = MESSAGES[pathname] ?? DEFAULT_MESSAGE;

    window.open(
      `https://wa.me/971522347966?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      <style>
        {`
          .whatsapp-container {
            position: fixed;
            bottom: 30px;
            right: 90px;
            width: 50px;
            height: 50px;
            background-color: #25D366;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            z-index: 1000;
            opacity: 0;
            transform: scale(0.8);
          }

          .whatsapp-container.visible {
            opacity: 1;
            transform: scale(1);
          }

          .whatsapp-icon {
            width: 35px;
            height: 35px;
          }

          .Btn {
            width: 55px;
            height: 55px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background-color: transparent;
            position: relative;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s;
          }

          .Btn:hover .tooltip {
            opacity: 1;
            transform: translateX(0);
            max-width: 220px;
            padding: 5px 10px;
          }

          .svgContainer {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            border-radius: 50%;
            transition: all 0.3s;
          }

          .tooltip {
            position: absolute;
            right: 70px;
            background-color: #25D366;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            white-space: nowrap;
            pointer-events: none;

            opacity: 0;
            max-width: 0;
            overflow: hidden;
            padding-left: 0;
            padding-right: 0;
            transform: translateX(12px);
            transition:
              opacity 0.45s ease,
              transform 0.45s ease,
              max-width 0.45s ease,
              padding 0.45s ease;
          }

          .tooltip--in,
          .tooltip--shown {
            opacity: 1;
            max-width: 220px;
            padding: 5px 10px;
            transform: translateX(0);
          }

          .tooltip--out {
            opacity: 0;
            max-width: 0;
            padding-left: 0;
            padding-right: 0;
            transform: translateX(12px);
          }

          @media (max-width: 768px) {
            .whatsapp-container {
              width: 50px;
              height: 50px;
              bottom: 20px;
              right: 80px;
            }

            .Btn {
              width: 50px;
              height: 50px;
            }

            .tooltip {
              right: 60px;
            }
          }
        `}
      </style>

      <div
        className={`whatsapp-container ${isVisible ? "visible" : ""}`}
        onClick={handleProgressClick}
        title="Contact us on WhatsApp"
      >
        <button className="Btn">
          <span className="svgContainer">
            <svg viewBox="0 0 16 16" height="2.5em" className="svgIcon" fill="white">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
            </svg>
          </span>

          <span className={`tooltip${tooltipState !== "hidden" ? ` tooltip--${tooltipState}` : ""}`}>
            Get Instant Project Guidance
          </span>
        </button>
      </div>
    </>
  );
};

export default WhatsappRedirectBtn;