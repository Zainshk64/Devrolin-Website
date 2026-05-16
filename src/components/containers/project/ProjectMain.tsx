"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CategoryType =
  | "All"
  | "AI Automation & Integration Systems"
  | "CRM & Revenue Systems"
  | "SaaS & MVP Development"
  | "Web & Custom Platforms";

const CATEGORIES: CategoryType[] = [
  "All",
  "AI Automation & Integration Systems",
  "CRM & Revenue Systems",
  "SaaS & MVP Development",
  "Web & Custom Platforms",
];

const CATEGORY_ICONS: Record<CategoryType, string> = {
  "All":                                 "fa-layer-group",
  "AI Automation & Integration Systems": "fa-robot",
  "CRM & Revenue Systems":               "fa-chart-line",
  "SaaS & MVP Development":             "fa-gears",
  "Web & Custom Platforms":              "fa-code",
};

const ProjectMain = ({ projects }: { projects: any[] }) => {
  const router   = useRouter();
  const dropRef  = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const [isPaused1, setIsPaused1] = useState(false);
  const [isPaused2, setIsPaused2] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CategoryType>("All");
  const [dropOpen, setDropOpen] = useState(false);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [draggedRow, setDraggedRow] = useState<1 | 2 | null>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p: any) => p.category === activeFilter);

  const row1 = filtered.filter((_: any, i: number) => i % 2 === 0);
  const row2 = filtered.filter((_: any, i: number) => i % 2 === 1);
  const items1 = row1.length > 0 ? [...row1, ...row1] : [];
  const items2 = row2.length > 0 ? [...row2, ...row2] : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFilterChange = (cat: CategoryType) => {
    setActiveFilter(cat);
    setDropOpen(false);
    setIsPaused1(false);
    setIsPaused2(false);
  };

  const handleCardClick = (id: string) => {
    if (!isDragging) {
      router.push(`/project-single/${id}`);
    }
  };

  // ── Simple Button Scroll: scrollLeft approach ─────────────────────────────
  const scrollRow = (row: 1 | 2, direction: 'left' | 'right') => {
    const track = row === 1 ? track1Ref.current : track2Ref.current;
    if (!track) return;

    // Pause animation while scrolling
    if (row === 1) setIsPaused1(true);
    else setIsPaused2(true);

    const cardWidth = 420;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * 2; // 2 cards

    const currentScroll = track.scrollLeft;
    const targetScroll = direction === 'right' 
      ? currentScroll + scrollAmount 
      : currentScroll - scrollAmount;

    // Smooth scroll
    track.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    // Resume animation after scroll
    setTimeout(() => {
      if (row === 1) setIsPaused1(false);
      else setIsPaused2(false);
    }, 800);
  };

  // ── Drag Handlers ─────────────────────────────────────────────────────────
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, row: 1 | 2) => {
    const track = row === 1 ? track1Ref.current : track2Ref.current;
    if (!track) return;

    setIsDragging(true);
    setDraggedRow(row);
    if (row === 1) setIsPaused1(true);
    else setIsPaused2(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setScrollLeft(track.scrollLeft);
    e.preventDefault();
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || draggedRow === null) return;
    const track = draggedRow === 1 ? track1Ref.current : track2Ref.current;
    if (!track) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const walk = (startX - clientX) * 0;
    track.scrollLeft = scrollLeft + walk;
    e.preventDefault();
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    setTimeout(() => {
      if (draggedRow === 1) setIsPaused1(false);
      else if (draggedRow === 2) setIsPaused2(false);
      setDraggedRow(null);
    }, 1500);
  };

  const handleMouseEnter = (row: 1 | 2) => {
    if (!isDragging) {
      if (row === 1) setIsPaused1(true);
      else setIsPaused2(true);
    }
  };

  const handleMouseLeave = (row: 1 | 2) => {
    if (!isDragging) {
      if (row === 1) setIsPaused1(false);
      else setIsPaused2(false);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --card-w:   420px;
          --card-gap: 24px;
          --accent:   #f97316;
          --accent2:  #fb923c;
          --bg:       #0a0a0a;
          --card-bg:  #111;
          --text:     #fff;
        }

        .ps-section {
          background: var(--bg);
          padding: 80px 0 100px;
          overflow: hidden;
          position: relative;
        }

        .ps-header {
          padding: 0 60px;
          margin-bottom: 26px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
        }
        .ps-title-block { display: flex; flex-direction: column; gap: 12px; }
        .ps-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: #888;
          font-family: 'Courier New', monospace; letter-spacing: 0.08em;
        }
        .ps-breadcrumb a { color: #888; text-decoration: none; }
        .ps-breadcrumb span.sep { color: var(--accent); }
        .ps-breadcrumb span.current { color: var(--accent); font-weight: 600; }
        .ps-title {
          font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; color: var(--text);
          font-family: 'Arial Black', 'Impact', sans-serif;
          letter-spacing: -0.02em; line-height: 1; margin: 0; text-transform: uppercase;
        }
        .ps-desc {
          max-width: 420px; color: #aaa; font-size: 15px;
          line-height: 1.7; font-family: Georgia, serif; margin: 0;
        }

        .ps-rows {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ps-row-wrapper {
          position: relative;
        }

        .ps-nav-controls {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          pointer-events: none;
          z-index: 100;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .ps-row-wrapper:hover .ps-nav-controls {
          opacity: 1;
        }

        .ps-nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid #333;
          background: rgba(17, 17, 17, 0.95);
          color: var(--text);
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          pointer-events: auto;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .ps-nav-btn:hover {
          border-color: var(--accent);
          background: var(--accent);
          transform: scale(1.1);
        }

        .ps-nav-btn:active {
          transform: scale(0.95);
        }

        .ps-viewport {
          overflow: hidden;
          position: relative;
        }

        /* ✅ KEY FIX: Use overflow-x auto for scrollLeft to work */
        .ps-track {
          display: flex;
          gap: var(--card-gap);
          padding: 10px 60px;
          width: max-content;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          cursor: grab;
          user-select: none;
          scroll-behavior: smooth;
          /* DO NOT use animation here - let scrollLeft handle it */
        }

        .ps-track::-webkit-scrollbar {
          display: none;
        }

        .ps-track.grabbing {
          cursor: grabbing;
        }

        /* Only use animation when not being manually scrolled */
        .ps-track:not(.scrolling) {
          animation: ps-scroll-ltr 28s linear infinite;
        }

        .ps-track--reverse:not(.scrolling) {
          animation: ps-scroll-rtl 28s linear infinite;
        }

        .ps-track.paused {
          animation-play-state: paused !important;
        }

        .ps-track--reverse.paused {
          animation-play-state: paused !important;
        }

        @keyframes ps-scroll-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * (var(--card-w) + var(--card-gap)) * var(--item-count, 4))); }
        }
        @keyframes ps-scroll-rtl {
          0%   { transform: translateX(calc(-1 * (var(--card-w) + var(--card-gap)) * var(--item-count, 4))); }
          100% { transform: translateX(0); }
        }

        .ps-card {
          flex-shrink: 0;
          width: var(--card-w);
          border-radius: 16px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid #1e1e1e;
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease;
          pointer-events: auto;
        }
        .ps-card:hover { transform: translateY(-8px) scale(1.015); border-color: var(--accent); }

        .ps-card__thumb {
          position: relative; width: 100%; height: 400px; overflow: hidden;
          pointer-events: none;
        }
        .ps-card__thumb img {
          width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;
          pointer-events: none;
        }
        .ps-card:hover .ps-card__thumb img { transform: scale(1.06); }
        .ps-card__thumb::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%);
          pointer-events: none;
        }

        .ps-card__badge {
          position: absolute; top: 16px; left: 16px;
          background: var(--accent); color: #fff; font-size: 11px; font-weight: 700;
          padding: 4px 10px; border-radius: 4px; letter-spacing: 0.08em;
          text-transform: uppercase; z-index: 2;
          pointer-events: none;
        }

        .ps-card__content {
          padding: 20px 24px 24px;
          pointer-events: none;
        }

        .ps-card__title {
          font-size: 1.2rem; font-weight: 800; color: var(--text);
          line-height: 1.3; display: block; transition: color 0.2s;
        }
        .ps-card:hover .ps-card__title { color: var(--accent); }

        .ps-card__arrow {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 14px; font-size: 13px; color: var(--accent);
          font-weight: 600; letter-spacing: 0.05em;
          transition: gap 0.2s;
        }
        .ps-card:hover .ps-card__arrow { gap: 10px; }

        .ps-section::before,
        .ps-section::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: 80px; z-index: 10; pointer-events: none;
        }
        .ps-section::before { left: 0; background: linear-gradient(to right, var(--bg), transparent); }
        .ps-section::after  { right: 0; background: linear-gradient(to left, var(--bg), transparent); }

        .ps-empty {
          text-align: center; padding: 60px 24px;
          color: #555; font-size: 15px; font-family: Georgia, serif;
        }
        .ps-empty strong { display: block; font-size: 2rem; margin-bottom: 12px; color: #333; }

        @media (max-width: 768px) {
          :root { --card-w: 260px; }
          .ps-section { padding: 48px 0 64px; }
          .ps-section::before,
          .ps-section::after { display: none; }
          .ps-filter-bar { padding: 0 20px; margin-bottom: 32px; }
          .ps-rows  { gap: 14px; }
          .ps-track { padding: 20px 20px; gap: 16px; }
          .ps-nav-btn { width: 40px; height: 40px; font-size: 16px; }
          .ps-card           { border-radius: 12px; }
          .ps-card__thumb    { height: 280px; }
          .ps-card__content  { padding: 14px 16px 18px; }
          .ps-card__title    { font-size: 1rem; }
          .ps-card__arrow    { font-size: 12px; margin-top: 10px; }
        }
      `}</style>

      <section className="ps-section">

        {/* Filter */}
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
              <i className={`fa-light fa-chevron-down uxp-drop-chevron${dropOpen ? " uxp-drop-chevron--open" : ""}`}></i>
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

        {filtered.length === 0 ? (
          <div className="ps-empty">
            <strong>( ˘︹˘ )</strong>
            No projects found in this category yet.
          </div>
        ) : (
          <div className="ps-rows">

            {/* Row 1 */}
            {items1.length > 0 && (
              <div className="ps-row-wrapper">
                {/* <div className="ps-nav-controls">
                  <button
                    className="ps-nav-btn"
                    onClick={() => scrollRow(1, 'left')}
                    aria-label="Scroll left"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    className="ps-nav-btn"
                    onClick={() => scrollRow(1, 'right')}
                    aria-label="Scroll right"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div> */}
                <div className="ps-viewport">
                  <div
                    ref={track1Ref}
                    className={`ps-track${isPaused1 ? " paused" : ""}${isDragging && draggedRow === 1 ? " grabbing" : ""}`}
                    style={{ "--item-count": row1.length } as React.CSSProperties}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={() => handleMouseLeave(1)}
                    onMouseDown={(e) => handleDragStart(e, 1)}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onTouchStart={(e) => handleDragStart(e, 1)}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                  >
                    {items1.map((project: any, i: number) => (
                      <div
                        key={`r1-${project._id}-${i}`}
                        className="ps-card"
                        onClick={() => handleCardClick(project._id)}
                      >
                        <div className="ps-card__thumb">
                          <img
                            src={project.thumbnail?.url}
                            alt={project.thumbnail?.alt || project.title}
                            draggable={false}
                          />
                        </div>
                        <div className="ps-card__content">
                          <span className="ps-card__title">{project.title}</span>
                          <span className="ps-card__arrow">View Project →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Row 2 */}
            {items2.length > 0 && (
              <div className="ps-row-wrapper">
                {/* <div className="ps-nav-controls">
                  <button
                    className="ps-nav-btn"
                    onClick={() => scrollRow(2, 'left')}
                    aria-label="Scroll left"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    className="ps-nav-btn"
                    onClick={() => scrollRow(2, 'right')}
                    aria-label="Scroll right"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div> */}
                <div className="ps-viewport">
                  <div
                    ref={track2Ref}
                    className={`ps-track ps-track--reverse${isPaused2 ? " paused" : ""}${isDragging && draggedRow === 2 ? " grabbing" : ""}`}
                    style={{ "--item-count": row2.length } as React.CSSProperties}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={() => handleMouseLeave(2)}
                    onMouseDown={(e) => handleDragStart(e, 2)}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onTouchStart={(e) => handleDragStart(e, 2)}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                  >
                    {items2.map((project: any, i: number) => (
                      <div
                        key={`r2-${project._id}-${i}`}
                        className="ps-card"
                        onClick={() => handleCardClick(project._id)}
                      >
                        <div className="ps-card__thumb">
                          <img
                            src={project.thumbnail?.url}
                            alt={project.thumbnail?.alt || project.title}
                            draggable={false}
                          />
                        </div>
                        <div className="ps-card__content">
                          <span className="ps-card__title">{project.title}</span>
                          <span className="ps-card__arrow">View Project →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </section>
    </>
  );
};

export default ProjectMain;