"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

const ProjectMain = ({ projects }: { projects: any[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Duplicate items for seamless infinite loop
  const items = [...projects, ...projects];

  const CARD_WIDTH = 420; // px — must match CSS --card-w

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    setCurrentIndex(clamped);
    track.style.transition = "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)";
    track.style.transform = `translateX(-${clamped * CARD_WIDTH}px)`;
    // After manual nav, re-enable auto scroll after 3s
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
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
      `}</style>

      <section className="ps-section">
       

        <div className="ps-viewport">
          {/* 
            CSS variable --item-count drives the animation distance.
            We set it inline so the keyframe math is correct.
          */}
          <div
            className={`ps-track${isPaused ? " paused" : ""}`}
            ref={trackRef}
            style={
              {
                "--item-count": projects.length,
              } as React.CSSProperties
            }
          >
            {/* Render items twice for seamless infinite loop */}
            {items.map((project: any, i: number) => (
              <div key={`${project._id}-${i}`} className="ps-card">
                <div className="ps-card__thumb">
                  <img
                    src={project.thumbnail?.url}
                    alt={project.thumbnail?.alt || project.title}
                  />
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

        {/* Dot indicators */}
        
      </section>
    </>
  );
};

export default ProjectMain;