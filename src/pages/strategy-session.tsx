"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { InlineWidget } from "react-calendly";
import styles from "@/styles/strategy-session.module.scss";
import toast from "react-hot-toast";

const StrategySession = () => {
  interface TestimonialItem {
    _id: string;
    name: string;
    job: string;
    feedback: string;
    image?: { url?: string; alt?: string };
  }

  // FIX 2: Pre-mount Calendly on page load, just toggle visibility
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [calendlyMounted, setCalendlyMounted] = useState(false);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [loading, setLoading] = useState(true);

  // Pre-mount Calendly widget after page loads so it's ready instantly
  useEffect(() => {
    const timer = setTimeout(() => {
      setCalendlyMounted(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("https://devrolin-backend-production.up.railway.app/api/testimonials/");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isCalendlyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCalendlyOpen]);

  const services = [
    {
      title: "AI Integration & Automation Systems",
      description:
        "Eliminate repetitive workflows and operational bottlenecks using scalable AI-powered systems.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: "CRM & Revenue Infrastructure",
      description:
        "Build smarter pipelines, automate follow-ups, and create predictable revenue operations.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      title: "SaaS / MVP Development",
      description:
        "Launch scalable products with production-ready architecture built for real growth.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: "Web & Custom Internal Platforms",
      description:
        "Build internal systems that streamline operations and increase team efficiency.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <Layout header={1} footer={5} video={true}>
      <div className={styles.strategyPage}>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* SECTION 1 — HERO */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>

              {/* LEFT CONTENT */}
              <div className={styles.heroLeft}>
                <div className={styles.badge}>
                  <span>AI Systems</span>
                  <span className={styles.dot}>•</span>
                  <span>CRM Infrastructure</span>
                  <span className={styles.dot}>•</span>
                  <span>Automation</span>
                </div>

                <h1 className={styles.headline}>
                  We build systems
                  <br />
                  <span className={styles.highlight}>That make money</span>
                </h1>

                <p className={styles.subtext}>
                  We build AI, CRM, and automation infrastructure that helps businesses grow faster without hiring larger teams.
                </p>

                {/* FIX 3: Limited sessions urgency text */}
                <div className={styles.urgencyBadge}>
                  <span className={styles.urgencyDot}></span>
                  <span>Limited growth sessions available each week!</span>
                </div>

                <button
                  className={styles.ctaBtn}
                  onClick={() => setIsCalendlyOpen(true)}
                >
                  {/* Left Icon */}
                  <div className={styles.iconWrap}>
                    <i className="fa-light fa-calendar-days"></i>
                  </div>

                  {/* Text Content */}
                  <div className={styles.btnContent}>
                    <span className={styles.mainText}>Schedule Strategy Session</span>
                    <span className={styles.subText}>15 mins • Revenue growth strategy</span>
                  </div>

                  {/* Arrow */}
                  <svg
                    className={styles.arrowIcon}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <p className={styles.trustLine}>
                  ⭐⭐⭐⭐⭐ Trusted by scaling founders and teams streamlining workflows, CRM systems, and 500K+ audience operations through AI and automation.
                </p>
              </div>

              {/* RIGHT — FLOATING TESTIMONIAL CARDS */}
              <div className={styles.heroRight}>
                <div className={styles.testimonialStack}>
                  {loading
                    ? [0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className={`${styles.testimonialCard} ${
                            i === 0 ? styles.active : i === 1 ? styles.next : styles.hidden
                          }`}
                          style={{ zIndex: 3 - i }}
                        >
                          <div
                            className={styles.cardMedia}
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              borderRadius: "8px",
                              height: "80px",
                              animation: "pulse 1.5s infinite",
                            }}
                          />
                          <div className={styles.cardContent}>
                            <div style={{ height: "14px", width: "85%", background: "rgba(255,255,255,0.07)", borderRadius: "6px", marginBottom: "10px", animation: "pulse 1.5s infinite" }} />
                            <div style={{ height: "14px", width: "60%", background: "rgba(255,255,255,0.07)", borderRadius: "6px", marginBottom: "16px", animation: "pulse 1.5s infinite" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div>
                                <div style={{ height: "12px", width: "90px", background: "rgba(255,255,255,0.07)", borderRadius: "4px", marginBottom: "6px", animation: "pulse 1.5s infinite" }} />
                                <div style={{ height: "10px", width: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
                              </div>
                              <div style={{ height: "12px", width: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", animation: "pulse 1.5s infinite" }} />
                            </div>
                          </div>
                        </div>
                      ))
                    : testimonials.map((t, i) => (
                        <div
                          key={i}
                          className={`${styles.testimonialCard} ${
                            i === activeCard ? styles.active : ""
                          } ${
                            i === (activeCard + 1) % testimonials.length ? styles.next : ""
                          } ${
                            i === (activeCard + 2) % testimonials.length ? styles.hidden : ""
                          }`}
                          style={{ zIndex: testimonials.length - i }}
                        >
                          <div className={styles.cardMedia}>
                            <img
                              src={t.image?.url || "/default-avatar.png"}
                              alt={t.image?.alt || t.name}
                            />
                          </div>
                          <div className={styles.cardContent}>
                            <p className={styles.result}>"{t.feedback}"</p>
                            <div className={styles.cardFooter}>
                              <div className={styles.client}>
                                <span className={styles.clientName}>{t.name}</span>
                                <span className={styles.clientRole}>{t.job}</span>
                              </div>
                              <div className={styles.branding}>
                                <span className={styles.brandLogo}>DevRolin</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>

          {/* Animated gradient orbs */}
          <div className={styles.orb} style={{ top: "10%", left: "5%" }}></div>
          <div className={styles.orb} style={{ bottom: "15%", right: "8%" }}></div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* SECTION 2 — VALUE CARDS */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section className={styles.valueSection}>
          <div className="container">
            <div className={styles.sectionLabel}>SYSTEMS • AUTOMATION • INFRASTRUCTURE</div>
            <h2 className={styles.sectionTitle}>What We Help Scaling Teams Fix</h2>
            <div className={styles.serviceGrid}>
              {services.map((service, i) => (
                <div key={i} className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* FIX 1 + 2: CALENDLY POPUP — pre-mounted, close btn OUTSIDE modal */}
        {/* ══════════════════════════════════════════════════════════════ */}

        {/* FIX 2: Pre-render Calendly widget silently in background after 1.5s */}
        {calendlyMounted && !isCalendlyOpen && (
          <div style={{ position: "fixed", top: "-9999px", left: "-9999px", width: "900px", height: "700px", visibility: "hidden", pointerEvents: "none" }}>
            <InlineWidget
              url="https://calendly.com/mudasr/growth-strategy-session"
              styles={{ height: "700px", width: "100%" }}
              pageSettings={{
                backgroundColor: "0a0a0a",
                primaryColor: "E87B2B",
                textColor: "ffffff",
              }}
            />
          </div>
        )}

        {isCalendlyOpen && (
          <div
            className={styles.calendlyBackdrop}
            onClick={() => setIsCalendlyOpen(false)}
          >
            {/* FIX 1: Close button is OUTSIDE the modal, floating top-right of backdrop */}
            {/* This way it never overlaps the Calendly steps */}
            <button
              className={styles.closeBtn}
              onClick={() => setIsCalendlyOpen(false)}
              title="Close booking — your progress will be lost"
              aria-label="Close calendly modal"
            >
              <i className="fa-solid fa-xmark"></i>
              <span className={styles.closeBtnTooltip}>Close &amp; lose progress</span>
            </button>

            <div
              className={styles.calendlyModal}
              onClick={(e) => e.stopPropagation()}
            >
              <InlineWidget
                url="https://calendly.com/mudasr/growth-strategy-session"
                styles={{ height: "700px", width: "100%" }}
                pageSettings={{
                  backgroundColor: "0a0a0a",
                  primaryColor: "E87B2B",
                  textColor: "ffffff",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StrategySession;