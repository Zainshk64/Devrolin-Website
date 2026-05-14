"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

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
  "All": "fa-layer-group",
  "AI Automation & Integration Systems": "fa-robot",
  "CRM & Revenue Systems": "fa-chart-line",
  "SaaS & MVP Development": "fa-gears",
  "Web & Custom Platforms": "fa-code",
};

const CARD_W = 420;
const CARD_GAP = 24;
const CARD_STEP = CARD_W + CARD_GAP;
const AUTO_SPEED = 0.6; // px per frame

// ── useInfiniteScroll hook ─────────────────────────────────────────────────────
// Drives a single row with RAF auto-scroll + drag override. No CSS animation.
function useInfiniteScroll(
  trackRef: React.RefObject<HTMLDivElement>,
  direction: "ltr" | "rtl", // ltr = moves left (normal), rtl = moves right (reverse)
  itemCount: number,
  enabled: boolean
) {
  const posRef       = useRef(0);
  const rafRef       = useRef<number>(0);
  const dragging     = useRef(false);
  const dragStartX   = useRef(0);
  const dragStartPos = useRef(0);
  const lastX        = useRef(0);
  const velocity     = useRef(0);
  const resumeTimer  = useRef<ReturnType<typeof setTimeout>>();

  const loopWidth = CARD_STEP * itemCount; // width of ONE set

  // Clamp position into [0, loopWidth) for seamless loop
  const normalise = (p: number) => ((p % loopWidth) + loopWidth) % loopWidth;

  const applyPos = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translateX(${-posRef.current}px)`;
  }, [trackRef]);

  // RAF loop
  const tick = useCallback(() => {
    if (!dragging.current && enabled) {
      if (direction === "ltr") {
        posRef.current = normalise(posRef.current + AUTO_SPEED);
      } else {
        posRef.current = normalise(posRef.current - AUTO_SPEED);
      }
    } else if (!dragging.current) {
      // momentum decay after drag
      if (Math.abs(velocity.current) > 0.1) {
        posRef.current = normalise(posRef.current + velocity.current);
        velocity.current *= 0.92;
      }
    }
    applyPos();
    rafRef.current = requestAnimationFrame(tick);
  }, [direction, enabled, applyPos]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // Drag handlers (mouse + touch unified)
  const onDragStart = useCallback((clientX: number) => {
    dragging.current   = true;
    dragStartX.current = clientX;
    dragStartPos.current = posRef.current;
    lastX.current      = clientX;
    velocity.current   = 0;
    clearTimeout(resumeTimer.current);
  }, []);

  const onDragMove = useCallback((clientX: number) => {
    if (!dragging.current) return;
    velocity.current = lastX.current - clientX; // positive = moved left
    lastX.current    = clientX;
    const delta = dragStartX.current - clientX;
    posRef.current = normalise(dragStartPos.current + delta);
  }, []);

  const onDragEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
  }, []);

  return { onDragStart, onDragMove, onDragEnd };
}

// ── Component ──────────────────────────────────────────────────────────────────
const ProjectMain = ({ projects }: { projects: any[] }) => {
  const router  = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<CategoryType>("All");
  const [dropOpen,     setDropOpen]     = useState(false);
  const [hovering1,    setHovering1]    = useState(false);
  const [hovering2,    setHovering2]    = useState(false);

  // ── Filter logic ─────────────────────────────────────────────────────────────
  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p: any) => p.category === activeFilter);

  const row1 = filtered.filter((_: any, i: number) => i % 2 === 0);
  const row2 = filtered.filter((_: any, i: number) => i % 2 === 1);

  // Duplicate for seamless loop (need at least 2 sets so loop is invisible)
  const items1 = row1.length > 0 ? [...row1, ...row1] : [];
  const items2 = row2.length > 0 ? [...row2, ...row2] : [];

  // ── Infinite scroll hooks ─────────────────────────────────────────────────────
  const scroll1 = useInfiniteScroll(track1Ref, "ltr", row1.length, !hovering1);
  const scroll2 = useInfiniteScroll(track2Ref, "rtl", row2.length, !hovering2);

  // ── Close dropdown on outside click ─────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleFilterChange = (cat: CategoryType) => {
    setActiveFilter(cat);
    setDropOpen(false);
  };

  // ── Card click (guard against drag) ─────────────────────────────────────────
  const clickStartX = useRef(0);
  const handleCardMouseDown = (e: React.MouseEvent) => { clickStartX.current = e.clientX; };
  const handleCardClick = (id: string, e: React.MouseEvent) => {
    if (Math.abs(e.clientX - clickStartX.current) < 6) {
      router.push(`/project-single/${id}`);
    }
  };

  // ── Shared drag event wrappers ────────────────────────────────────────────────
  const makeHandlers = (scroll: ReturnType<typeof useInfiniteScroll>) => ({
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault(); // prevent image drag ghost
      scroll.onDragStart(e.clientX);
    },
    onMouseMove: (e: React.MouseEvent) => scroll.onDragMove(e.clientX),
    onMouseUp:   () => scroll.onDragEnd(),
    onMouseLeave:() => scroll.onDragEnd(),
    onTouchStart:(e: React.TouchEvent) => scroll.onDragStart(e.touches[0].clientX),
    onTouchMove: (e: React.TouchEvent) => { e.preventDefault(); scroll.onDragMove(e.touches[0].clientX); },
    onTouchEnd:  () => scroll.onDragEnd(),
  });

  const handlers1 = makeHandlers(scroll1);
  const handlers2 = makeHandlers(scroll2);

  return (
    <>
      <style>{`
        :root {
          --card-w:   420px;
          --card-gap: 24px;
          --accent:   #f97316;
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

        
        /* ── Rows ── */
        .ps-rows { display: flex; flex-direction: column; gap: 20px; }

        .ps-viewport {
          overflow: hidden;
          /* prevent text-select during drag */
          user-select: none;
          -webkit-user-select: none;
        }

        /* Track: no CSS animation — JS controls transform */
        .ps-track {
          display: flex;
          gap: var(--card-gap);
          padding: 10px 60px;
          width: max-content;
          will-change: transform;
          cursor: grab;
        }
        .ps-track:active { cursor: grabbing; }

        /* Prevent browser's native image drag */
        .ps-track img { pointer-events: none; draggable: false; -webkit-user-drag: none; }

        /* ── Card ── */
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
        }
        .ps-card:hover { transform: translateY(-8px) scale(1.015); border-color: var(--accent); }

        .ps-card__thumb { position: relative; width: 100%; height: 400px; overflow: hidden; }
        .ps-card__thumb img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
          pointer-events: none;
          -webkit-user-drag: none;
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
        }
        .ps-card__content { padding: 20px 24px 24px; }
        .ps-card__title {
          font-size: 1.2rem; font-weight: 800; color: var(--text);
          line-height: 1.3; display: block; transition: color 0.2s;
        }
        .ps-card:hover .ps-card__title { color: var(--accent); }
        .ps-card__arrow {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 14px; font-size: 13px; color: var(--accent);
          font-weight: 600; letter-spacing: 0.05em; transition: gap 0.2s;
        }
        .ps-card:hover .ps-card__arrow { gap: 10px; }

        /* Edge fades */
        .ps-section::before,
        .ps-section::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: 80px; z-index: 10; pointer-events: none;
        }
        .ps-section::before { left: 0; background: linear-gradient(to right, var(--bg), transparent); }
        .ps-section::after  { right: 0; background: linear-gradient(to left,  var(--bg), transparent); }

        /* Drag hint cursor */
        .ps-viewport:hover .ps-track { cursor: grab; }
        .ps-viewport:active .ps-track { cursor: grabbing; }

        /* ── Empty state ── */
        .ps-empty {
          text-align: center; padding: 60px 24px;
          color: #555; font-size: 15px; font-family: Georgia, serif;
        }
        .ps-empty strong { display: block; font-size: 2rem; margin-bottom: 12px; color: #333; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          :root { --card-w: 280px; }
          .ps-section { padding: 48px 0 64px; }
          .ps-section::before, .ps-section::after { display: none; }
          .ps-filter-bar { padding: 0 20px; margin-bottom: 28px; }
          .uxp-select-wrap { width: 100%; max-width: 360px; }
          .ps-rows { gap: 14px; }
          .ps-track { padding: 10px 20px; }
          .ps-card__thumb { height: 240px; }
          .ps-card__content { padding: 14px 16px 18px; }
          .ps-card__title { font-size: 1rem; }
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

        {/* ── Rows ── */}
        {filtered.length === 0 ? (
          <div className="ps-empty">
            <strong>( ˘︹˘ )</strong>
            No projects found in this category yet.
          </div>
        ) : (
          <div className="ps-rows">

            {/* Row 1 — scrolls left */}
            {items1.length > 0 && (
              <div
                className="ps-viewport"
                onMouseEnter={() => setHovering1(true)}
                onMouseLeave={() => setHovering1(false)}
              >
                <div
                  ref={track1Ref}
                  className="ps-track"
                  {...handlers1}
                >
                  {items1.map((project: any, i: number) => (
                    <div
                      key={`r1-${project._id}-${i}`}
                      className="ps-card"
                      onMouseDown={handleCardMouseDown}
                      onClick={(e) => handleCardClick(project._id, e)}
                    >
                      <div className="ps-card__thumb">
                        <img
                          src={project.thumbnail?.url}
                          alt={project.thumbnail?.alt || project.title}
                          draggable={false}
                        />
                        {project.category && (
                          <span className="ps-card__badge">{project.category}</span>
                        )}
                      </div>
                      <div className="ps-card__content">
                        <span className="ps-card__title">{project.title}</span>
                        <span className="ps-card__arrow">View Project →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Row 2 — scrolls right */}
            {items2.length > 0 && (
              <div
                className="ps-viewport"
                onMouseEnter={() => setHovering2(true)}
                onMouseLeave={() => setHovering2(false)}
              >
                <div
                  ref={track2Ref}
                  className="ps-track"
                  {...handlers2}
                >
                  {items2.map((project: any, i: number) => (
                    <div
                      key={`r2-${project._id}-${i}`}
                      className="ps-card"
                      onMouseDown={handleCardMouseDown}
                      onClick={(e) => handleCardClick(project._id, e)}
                    >
                      <div className="ps-card__thumb">
                        <img
                          src={project.thumbnail?.url}
                          alt={project.thumbnail?.alt || project.title}
                          draggable={false}
                        />
                        {project.category && (
                          <span className="ps-card__badge">{project.category}</span>
                        )}
                      </div>
                      <div className="ps-card__content">
                        <span className="ps-card__title">{project.title}</span>
                        <span className="ps-card__arrow">View Project →</span>
                      </div>
                    </div>
                  ))}
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