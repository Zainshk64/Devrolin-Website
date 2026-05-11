"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
type CategoryType =
  | "All"
  | "AI Automation & Integration Systems"
  | "CRM & Revenue Systems"
  | "SaaS & MVP Development"
  | "Web & Custom Platforms";

// ── Constants ──────────────────────────────────────────────────────────────────
const CATEGORIES: CategoryType[] = [
  "All",
  "AI Automation & Integration Systems",
  "CRM & Revenue Systems",
  "SaaS & MVP Development",
  "Web & Custom Platforms",
];

const CATEGORY_ICONS: Record<CategoryType, string> = {
  "All":                               "fa-layer-group",
  "AI Automation & Integration Systems": "fa-robot",
  "CRM & Revenue Systems":             "fa-chart-line",
  "SaaS & MVP Development":            "fa-gears",
  "Web & Custom Platforms":            "fa-code",
};

// ── Component ──────────────────────────────────────────────────────────────────
const ProjectMain = ({ projects }: { projects: any[] }) => {
  const trackRef        = useRef<HTMLDivElement>(null);
  const dropRef         = useRef<HTMLDivElement>(null);
  const [isPaused,      setIsPaused]      = useState(false);
  const [activeFilter,  setActiveFilter]  = useState<CategoryType>("All");
  const [dropOpen,      setDropOpen]      = useState(false);

  // ── Filter logic ─────────────────────────────────────────────────────────────
  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p: any) => p.category === activeFilter);

  // Duplicate for seamless infinite loop (need ≥2 items)
  const items = filtered.length > 0 ? [...filtered, ...filtered] : [];

  // ── Close dropdown on outside click ─────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Reset track scroll when filter changes ───────────────────────────────────
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform  = "translateX(0)";
    }
  }, [activeFilter]);

  const handleFilterChange = (cat: CategoryType) => {
    setActiveFilter(cat);
    setDropOpen(false);
    setIsPaused(false);
  };

  return (
    <>
      <style>{`
        :root {
          --card-w: 420px;
          --card-gap: 24px;
          --accent: #f97316;
          --accent2: #fb923c;
          --bg: #0a0a0a;
          --card-bg: #111;
          --text: #fff;
        }

        .ps-section {
          background: var(--bg);
          padding: 80px 0 100px;
          overflow: hidden;
          position: relative;
        }

        .ps-header {
          padding: 0 60px;
          margin-bottom: 56px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }

        .ps-title-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ps-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #888;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.08em;
        }

        .ps-breadcrumb a { color: #888; text-decoration: none; }
        .ps-breadcrumb span.sep { color: var(--accent); }
        .ps-breadcrumb span.current { color: var(--accent); font-weight: 600; }

        .ps-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--text);
          font-family: 'Arial Black', 'Impact', sans-serif;
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0;
          text-transform: uppercase;
        }

        .ps-desc {
          max-width: 420px;
          color: #aaa;
          font-size: 15px;
          line-height: 1.7;
          font-family: Georgia, serif;
          margin: 0;
        }

        /* ── Slider controls ── */
        .ps-controls {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
        }

        .ps-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid #333;
          background: transparent;
          color: var(--text);
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
        }

        .ps-btn:hover {
          border-color: var(--accent);
          background: var(--accent);
          transform: scale(1.08);
        }

        /* ── Scroll viewport ── */
        .ps-viewport {
          overflow: hidden;
          cursor: grab;
        }
        .ps-viewport:active { cursor: grabbing; }

        /* ── Auto-scroll track ── */
        .ps-track {
          display: flex;
          gap: var(--card-gap);
          padding: 0 60px;
          /* infinite scroll animation */
          animation: ps-scroll 28s linear infinite;
          width: max-content;
        }

        .ps-track.paused {
          animation-play-state: paused;
        }

        .ps-track:hover {
          animation-play-state: paused;
        }

        @keyframes ps-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * (var(--card-w) + var(--card-gap)) * var(--item-count, 4))); }
        }

        /* ── Card ── */
        .ps-card {
          flex-shrink: 0;
          width: var(--card-w);
          border-radius: 16px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid #1e1e1e;
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .ps-card:hover {
          transform: translateY(-8px) scale(1.015);
          border-color: var(--accent);
        }

        .ps-card__thumb {
          position: relative;
          width: 100%;
          hei
          overflow: hidden;
        }

        .ps-card__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .ps-card:hover .ps-card__thumb img {
          transform: scale(1.06);
        }

        /* Orange gradient overlay at bottom of thumb */
        .ps-card__thumb::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%);
          pointer-events: none;
        }

        .ps-card__badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--accent);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 4px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          z-index: 2;
        }

        .ps-card__content {
          padding: 20px 24px 24px;
        }

        .ps-card__title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text);
          text-decoration: none;
          line-height: 1.3;
          display: block;
          transition: color 0.2s;
        }

        .ps-card__title:hover { color: var(--accent); }

        .ps-card__arrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          font-size: 13px;
          color: var(--accent);
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: gap 0.2s;
        }
        .ps-card__arrow:hover { gap: 10px; }

        /* ── Dot indicators ── */
        .ps-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 40px;
        }

        .ps-dot {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: #333;
          transition: width 0.3s, background 0.3s;
          cursor: pointer;
          border: none;
        }

        .ps-dot.active {
          width: 28px;
          background: var(--accent);
        }

        /* Scrollbar edge fade */
        .ps-section::before,
        .ps-section::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 10;
          pointer-events: none;
        }
        .ps-section::before {
          left: 0;
          background: linear-gradient(to right, var(--bg), transparent);
        }
        .ps-section::after {
          right: 0;
          background: linear-gradient(to left, var(--bg), transparent);
        }

        @media (max-width: 768px) {
          .ps-header { padding: 0 24px; flex-direction: column; align-items: flex-start; }
          .ps-track { padding: 0 24px; }
          :root { --card-w: 300px; }
        }

         /* ── Mobile ── */
        @media (max-width: 768px) {
          :root {
            --card-w: 260px;
          }
 
          .ps-section {
            padding: 48px 0 64px;
          }
 
          /* Hide edge fades on mobile so next card is visible */
          .ps-section::before,
          .ps-section::after {
            display: none;
          }
 
          .ps-filter-bar {
            padding: 0 20px;
            margin-bottom: 32px;
          }
 
       
 
          .ps-track {
            padding: 0 20px;
            gap: 16px;
          }
 
          .ps-card {
            border-radius: 12px;
          }
 
          // .ps-card__thumb {
          //   height: 380px;
          // }
 
          .ps-card__content {
            padding: 14px 16px 18px;
          }
 
          .ps-card__title {
            font-size: 1rem;
          }
 
          .ps-card__arrow {
            font-size: 12px;
            margin-top: 10px;
          }
        }
      `}</style>

      <section className="ps-section">

        {/* ── Filter Dropdown ── */}
        <div className="ps-filter-bar">
          <div className="uxp-select-wrap" ref={dropRef}>
            <button
              type="button"
              className={`uxp-drop-trigger${dropOpen ? " uxp-drop-trigger--open" : ""}`}
              onClick={() => setDropOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropOpen}
            >
              <span className="uxp-drop-trigger-left">
                <i className={`fa-light ${CATEGORY_ICONS[activeFilter]} uxp-drop-icon`}></i>
                <span>{activeFilter}</span>
              </span>
              <i
                className={`fa-light fa-chevron-down uxp-drop-chevron${
                  dropOpen ? " uxp-drop-chevron--open" : ""
                }`}
              ></i>
            </button>

            {dropOpen && (
              <ul className="uxp-drop-menu" role="listbox">
                {CATEGORIES.map((cat) => {
                  const isActive = cat === activeFilter;
                  return (
                    <li
                      key={cat}
                      role="option"
                      aria-selected={isActive}
                      className={`uxp-drop-option${isActive ? " uxp-drop-option--active" : ""}`}
                      onClick={() => handleFilterChange(cat)}
                    >
                      <span className="uxp-drop-option-left">
                        <i className={`fa-light ${CATEGORY_ICONS[cat]} uxp-drop-icon`}></i>
                        <span>{cat}</span>
                      </span>
                      {isActive && <i className="fa-light fa-check uxp-drop-check"></i>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* ── Slider ── */}
        {filtered.length === 0 ? (
          <div className="ps-empty">
            <strong>( ˘︹˘ )</strong>
            No projects found in this category yet.
          </div>
        ) : (
          <div className="ps-viewport">
            <div
              className={`ps-track${isPaused ? " paused" : ""}`}
              ref={trackRef}
              style={
                {
                  "--item-count": filtered.length,
                } as React.CSSProperties
              }
            >
              {items.map((project: any, i: number) => (
                <div key={`${project._id}-${i}`} className="ps-card">
                  <div className="ps-card__thumb">
                    <img
                      src={project.thumbnail?.url}
                      alt={project.thumbnail?.alt || project.title}
                    />
                    {project.category && (
                      <span className="ps-card__badge">{project.category}</span>
                    )}
                  </div>
                  <div className="ps-card__content">
                    <Link
                      href={`/project-single/${project._id}`}
                      className="ps-card__title"
                    >
                      {project.title}
                    </Link>
                    <Link
                      href={`/project-single/${project._id}`}
                      className="ps-card__arrow"
                    >
                      View Project →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </>
  );
};

export default ProjectMain;