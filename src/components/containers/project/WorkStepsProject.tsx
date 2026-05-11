import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import YoutubeEmbed from "@/components/youtube/YoutubeEmbed";

// ─── Filter types ────────────────────────────────────────────────
type FilterType =
  | "CRM and Sale System"
  | "AI Automation & Integeration"
  | "SaaS & MVP Development"
  | "Web & Custom Platforms";

const filters: FilterType[] = [
  "CRM and Sale System",
  "AI Automation & Integeration",
  "SaaS & MVP Development",
  "Web & Custom Platforms",
];

const filterIcons: Record<FilterType, string> = {
  "CRM and Sale System":        "fa-chart-line",
  "AI Automation & Integeration":  "fa-robot",
  "SaaS & MVP Development": "fa-gears",
  "Web & Custom Platforms": "fa-code",
};

// ─── Static step data per filter ────────────────────────────────
type Step = {
  percent: string;
  label: string;
  image: string;
  extraClass?: string;
};

const stepsData: Record<FilterType, Step[]> = {
  "CRM and Sale System": [
    {
      percent: "25",
      label: "Funnel & Lead Flow Analysis",
      image: "/CRM & Revenue Systems.png",
    },
    {
      percent: "50",
      label: " CRM Setup & Pipeline Design",
      image: "/CRM & Revenue Systems.png",
      extraClass: "work-two",
    },
    {
      percent: "75",
      label: " Automation & Integrations",
      image: "/CRM & Revenue Systems.png",
      extraClass: "work-three",
    },
    {
      percent: "100",
      label: "Conversion Optimization & Reporting",
      image: "/CRM & Revenue Systems.png",
      extraClass: "work-four",
    },
  ],
  "AI Automation & Integeration": [
    {
      percent: "25",
      label: "AI Use-Case Research",
      image: "/AI Automation & Integration.png",
    },
    {
      percent: "50",
      label: "Workflow & Integration Design",
      image: "/AI Automation & Integration.png",
      extraClass: "work-two",
    },
    {
      percent: "75",
      label: "AI Agent Development & API Connect",
      image: "/AI Automation & Integration.png",
      extraClass: "work-three",
    },
    {
      percent: "100",
      label: "Deploy, Monitor & Optimize Systems",
      image: "/AI Automation & Integration.png",
      extraClass: "work-four",
    },
  ],
  "SaaS & MVP Development": [
    {
      percent: "25",
      label: "Product Strategy & Feature Planning",
      image: "/Saas & MVP Development.png",
    },
    {
      percent: "50",
      label: "UX Design & System Architecture",
      image: "/Saas & MVP Development.png",
      extraClass: "work-two",
    },
    {
      percent: "75",
      label: "Core Development & Integrations",
      image: "/Saas & MVP Development.png",
      extraClass: "work-three",
    },
    {
      percent: "100",
      label: "Launch, Testing & Scaling",
      image: "/Saas & MVP Development.png",
      extraClass: "work-four",
    },
  ],
  "Web & Custom Platforms": [
    {
      percent: "25",
      label: "Business & Conversion Research",
      image: "/Web & Custom Platforms.png",
    },
    {
      percent: "50",
      label: "UI/UX Design & Structure",
      image: "/Web & Custom Platforms.png",
      extraClass: "work-two",
    },
    {
      percent: "75",
      label: "Development & API Integration",
      image: "/Web & Custom Platforms.png",
      extraClass: "work-three",
    },
    {
      percent: "100",
      label: "Optimization, Launch & Support",
      image: "/Web & Custom Platforms.png",
      extraClass: "work-four",
    },
  ],
};

// ─── Component ───────────────────────────────────────────────────
const WorkStepsProject = () => {
  const [hover, setHover]               = useState(1);
  const [videoActive, setVideoActive]   = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("AI Automation & Integeration");
  const [dropOpen, setDropOpen]         = useState(false);
  const dropRef                         = useRef<HTMLDivElement>(null);

  // Mouse-move parallax (unchanged)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (typeof window !== "undefined" && window.innerWidth > 576) {
        const workImgItems = document.querySelectorAll<HTMLElement>(".work-steps__single");
        workImgItems.forEach((item) => {
          const contentBox = item.getBoundingClientRect();
          const dx = event.clientX - contentBox.x;
          if (item.children[2] instanceof HTMLElement) {
            item.children[2].style.transform = `translateX(${dx}px)`;
          }
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setHover(1);
    setDropOpen(false);
  };

  const steps = stepsData[activeFilter];

  return (
    <>
      <section className="section work-steps work-alt fade-wrapper">
        <div className="container">

          {/* ── Header (unchanged) ── */}
          <div className="row">
            <div className="col-12">
              <div className="section__header--secondary">
                <div className="row gaper align-items-center">
                  <div className="col-12 col-lg-5 col-xxl-5">
                    <div className="section__header text-center text-lg-start mb-0">
                      <span className="sub-title">
                        working steps
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                      <h2 className="title title-anim">Our Work Process</h2>
                    </div>
                  </div>
                  <div className="col-12 col-lg-7 col-xxl-5 offset-xxl-2">
                    <div className="text-center text-lg-start">
                      <p>
                        Bring to the table win-win survival strategies to ensure
                        proactive domination. At the end of the day, going
                        forward, a new normal that has evolved from generation
                        on the runway heading towards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Custom Dropdown Filter (same as UxProcessTwo) ── */}
          <div className="uxp-select-wrap" ref={dropRef}>
            <button
              type="button"
              className={`uxp-drop-trigger${dropOpen ? " uxp-drop-trigger--open" : ""}`}
              onClick={() => setDropOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropOpen}
            >
              <span className="uxp-drop-trigger-left">
                <i className={`fa-light ${filterIcons[activeFilter]} uxp-drop-icon`}></i>
                <span>{activeFilter}</span>
              </span>
              <i className={`fa-light fa-chevron-down uxp-drop-chevron${dropOpen ? " uxp-drop-chevron--open" : ""}`}></i>
            </button>

            {dropOpen && (
              <ul className="uxp-drop-menu" role="listbox">
                {filters.map((filter) => {
                  const isActive = filter === activeFilter;
                  return (
                    <li
                      key={filter}
                      role="option"
                      aria-selected={isActive}
                      className={`uxp-drop-option${isActive ? " uxp-drop-option--active" : ""}`}
                      onClick={() => handleFilterChange(filter)}
                    >
                      <span className="uxp-drop-option-left">
                        <i className={`fa-light ${filterIcons[filter]} uxp-drop-icon`}></i>
                        <span>{filter}</span>
                      </span>
                      {isActive && <i className="fa-light fa-check uxp-drop-check"></i>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* ── Steps Grid (unchanged UI, dynamic data) ── */}
          <div className="row" key={activeFilter}>
            {steps.map((step, index) => (
              <div key={index} className="col-12 col-sm-6 col-xl-3">
                <div
                  className={[
                    "work-steps__single fade-top",
                    step.extraClass ?? "",
                    hover === index ? "work-steps__single-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseEnter={() => setHover(index)}
                >
                  <span>
                    {step.percent}
                    <br />%
                  </span>
                  <h5>{step.label}</h5>
                  <div
                    className="work-thumb-hover d-none d-md-block"
                    style={{ backgroundImage: `url('${step.image}')` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Video frame button (unchanged) ── */}
        <button
          className="video-frame video-btn d-none d-md-flex"
          onClick={() => setVideoActive(true)}
        >
          <Image src="/devrolin-team.png" height={500} width={500} alt="Image" />
          <i className="fa-sharp fa-solid fa-play"></i>
        </button>
      </section>

      {/* ── Video backdrop (unchanged) ── */}
      <div
        className={(videoActive ? " video-zoom-in" : " ") + " video-backdrop"}
        onClick={() => setVideoActive(false)}
      >
        <div className="video-inner">
          <div
            className="video-container"
            onClick={(e: any) => e.stopPropagation()}
          >
            {videoActive && <YoutubeEmbed embedId="fSv6UgCkuTU" />}
            <button
              aria-label="close video popup"
              className="close-video-popup"
              onClick={() => setVideoActive(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkStepsProject;