import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import star from "public/images/star.png";
import dotlarge from "public/images/agency/dot-large.png";
import { agencySkillAPI, type AgencySkill } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

// ─── Skeleton components matched to dark/orange theme ───────────────────────

function SkeletonPulse({ width = "100%", height = 16, radius = 6, style = {} }: {
  width?: string | number;
  height?: number;
  radius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        display: "block",
        width,
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)",
        backgroundSize: "200% 100%",
        animation: "sk-shimmer 1.4s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function SkillBarSkeleton() {
  return (
    <div className="skill-bar-single" style={{ marginBottom: 20 }}>
      <div className="skill-bar-title" style={{ marginBottom: 8 }}>
        <SkeletonPulse width="45%" height={14} />
      </div>
      <SkeletonPulse width="100%" height={8} radius={4} />
    </div>
  );
}

// ─── Real skill bar ──────────────────────────────────────────────────────────

function SkillBarRow({ title, percent }: { title: string; percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  const pctStr = `${clamped}%`;
  return (
    <div className="skill-bar-single">
      <div className="skill-bar-title">
        <p className="primary-text">{title}</p>
      </div>
      <div className="skill-bar-wrapper" data-percent={pctStr}>
        <div className="skill-bar">
          <div className="skill-bar-percent">
            <span className="percent-value"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Image Slider ────────────────────────────────────────────────────────────

const SLIDE_IMAGES = [
  "/home-premier1.png",
  "/home-premier2.png",
];

function AgencyImageSlider() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = SLIDE_IMAGES.length;

  const goTo = (next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((next + total) % total);
      setAnimating(false);
    }, 300);
  };

  // Auto-slide every 3.5s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo(index + 1);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, animating]);

  const btnBase: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.65)",
    border: "1.5px solid rgba(249,115,22,0.5)",
    color: "#f97316",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    transition: "background 0.2s, border-color 0.2s",
  };

  return (
    <div
      className="agency__thumb"
      style={{ position: "relative", overflow: "hidden", borderRadius: 12 }}
    >
      {/* Slide image */}
      <div
        style={{
          opacity: animating ? 0 : 1,
          transition: "opacity 0.3s ease",
          width: "75%",
        }}
      >
        <Image
          src={SLIDE_IMAGES[index]}
          alt={`Slide ${index + 1}`}
          width={500}
          height={500}
          style={{ width: "100%", height: "90%", display: "block", borderRadius: 12 }}
          priority
        />
      </div>

      {/* Prev arrow */}
      {/* <button
        type="button"
        aria-label="Previous image"
        style={{ ...btnBase, left: 10 }}
        onClick={() => goTo(index - 1)}
      >
        <i className="fa-light fa-angle-left"></i>
      </button>

      <button
        type="button"
        aria-label="Next image"
        style={{ ...btnBase, right: 10 }}
        onClick={() => goTo(index + 1)}
      >
        <i className="fa-light fa-angle-right"></i>
      </button> */}

      {/* Dot indicators */}
      {/* <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          zIndex: 10,
        }}
      >
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: i === index ? 20 : 8,
              height: 8,
              borderRadius: 4,
              background: i === index ? "#f97316" : "rgba(255,255,255,0.35)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div> */}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const Agency = () => {
  const [openService, setOpenService] = useState(false);
  const [skills, setSkills] = useState<AgencySkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await agencySkillAPI.getAll();
        if (!cancelled && Array.isArray(data)) {
          setSkills(data);
        }
      } catch {
        if (!cancelled) setSkills([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (skills.length === 0) return;

    const section = document.querySelector(".agency");
    if (!section) return;

    const ctx = gsap.context(() => {
      const percentElements = section.querySelectorAll("[data-percent]");
      percentElements.forEach((el) => {
        const skillBarPercent = el.querySelector(".skill-bar-percent") as HTMLElement | null;
        const percentValue = el.parentNode?.querySelector(".percent-value") as HTMLElement | null;
        if (skillBarPercent && percentValue) {
          const percent = el.getAttribute("data-percent") || "0%";
          skillBarPercent.style.width = percent;
          percentValue.textContent = percent;
        }
      });

      const axProgressBar = section.querySelectorAll(".skill-bar-single");
      axProgressBar.forEach((element) => {
        const skillBarPercent = element.querySelector(".skill-bar-percent") as HTMLElement | null;
        const percentValue = element.querySelector(".percent-value") as HTMLElement | null;
        if (skillBarPercent && percentValue) {
          const target = percentValue.textContent || "0%";
          const axBarTimeline = gsap.timeline({
            defaults: { duration: 2 },
            scrollTrigger: { trigger: element },
          });
          axBarTimeline.fromTo(skillBarPercent, { width: 0 }, { width: target });
          axBarTimeline.from(percentValue, { textContent: "0%", snap: { textContent: 5 } }, "<");
        }
      });
    }, section);

    ScrollTrigger.refresh();
    return () => { ctx.revert(); };
  }, [skills, openService]);

  const primarySkills = skills.slice(0, 3);
  const extraSkills = skills.slice(3);
  const hasMore = extraSkills.length > 0;

  return (
    <section className="section agency">
      {/* Skeleton shimmer keyframe injected once */}
      <style>{`
        @keyframes sk-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="container">
        <div className="row gaper align-items-center">

          {/* Left: image slider */}
          <div className="col-12 col-lg-6">
            <AgencyImageSlider />
          </div>

          {/* Right: content + skill bars */}
          <div className="col-12 col-lg-6">
            <div className="agency__content section__content">
              <span className="sub-title">
                WELCOME
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                We are premier software company in Dubai
              </h2>
              <div className="paragraph">
                <p>
                 AI, SaaS, and CRM systems with cross-platform integrations that replace manual work, eliminate bottlenecks, and turn your operations into scalable revenue.
                </p>
              </div>

              {/* Skill bars — skeleton while loading, real bars after */}
              <div className="skill-wrap">
                {loading ? (
                  <>
                    <SkillBarSkeleton />
                    <SkillBarSkeleton />
                    <SkillBarSkeleton />
                  </>
                ) : (
                  primarySkills.map((s) => (
                    <SkillBarRow key={s._id} title={s.title} percent={s.percent} />
                  ))
                )}
              </div>

              {!loading && hasMore && (
                <div
                  className={`skill-wrap ${openService ? "visually-visible" : "visually-hidden"}`}
                >
                  {extraSkills.map((s) => (
                    <SkillBarRow key={s._id} title={s.title} percent={s.percent} />
                  ))}
                </div>
              )}

              {!loading && hasMore && (
                <div className="section__content-cta">
                  <button
                    onClick={() => setOpenService(!openService)}
                    className="btn btn--primary"
                  >
                    {openService ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <Image src={star} alt="Image" className="star" priority />
      {/* <Image src={dotlarge} alt="Image" className="dot-large" priority /> */}
    </section>
  );
};

export default Agency;