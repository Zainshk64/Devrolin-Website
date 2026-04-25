import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import YoutubeEmbed from "@/components/youtube/YoutubeEmbed";

// ─── Filter types ────────────────────────────────────────────────
type FilterType =
  | "CRM and Sale System"
  | "AI Integration and Agents"
  | "AI Agent Business Automation";

const filters: FilterType[] = [
  "CRM and Sale System",
  "AI Integration and Agents",
  "AI Agent Business Automation",
];

const filterIcons: Record<FilterType, string> = {
  "CRM and Sale System":        "fa-chart-line",
  "AI Integration and Agents":  "fa-robot",
  "AI Agent Business Automation": "fa-gears",
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
      label: "Discovery & CRM Audit",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
    },
    {
      percent: "50",
      label: "Pipeline & Workflow Design",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-two",
    },
    {
      percent: "75",
      label: "CRM Build & Integration",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-three",
    },
    {
      percent: "100",
      label: "Launch & Sales Enablement",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-four",
    },
  ],
  "AI Integration and Agents": [
    {
      percent: "25",
      label: "AI Use-Case Research",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
    },
    {
      percent: "50",
      label: "Agent Design & Prototyping",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-two",
    },
    {
      percent: "75",
      label: "Model Training & API Connect",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-three",
    },
    {
      percent: "100",
      label: "Deploy & Monitor Agents",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-four",
    },
  ],
  "AI Agent Business Automation": [
    {
      percent: "25",
      label: "Process Mapping & Audit",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
    },
    {
      percent: "50",
      label: "Automation Flow Design",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-two",
    },
    {
      percent: "75",
      label: "Build & System Integration",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-three",
    },
    {
      percent: "100",
      label: "Go-Live & Scale Automation",
      image: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760936950/workprocess_er0pqd.jpg",
      extraClass: "work-four",
    },
  ],
};

// ─── Component ───────────────────────────────────────────────────
const WorkStepsProject = () => {
  const [hover, setHover]               = useState(1);
  const [videoActive, setVideoActive]   = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("CRM and Sale System");
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