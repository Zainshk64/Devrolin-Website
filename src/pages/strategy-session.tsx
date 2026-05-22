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

const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
const [activeCard, setActiveCard] = useState(0);
const [loading, setLoading] = useState(true);

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
  const services = [
    {
      title: "AI Integration & Automation Systems",
      description: "Remove repetitive manual workflows using scalable AI-powered systems.",
      icon: "🤖",
    },
    {
      title: "CRM & Revenue Infrastructure",
      description: "Build intelligent pipelines that turn leads into predictable revenue.",
      icon: "📊",
    },
    {
      title: "SaaS / MVP Development",
      description: "Launch market-ready products with battle-tested tech architecture.",
      icon: "🚀",
    },
    {
      title: "Web & Custom Internal Platforms",
      description: "Create tools that make your team 10x more efficient internally.",
      icon: "⚡",
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
                  <span>AI</span>
                  <span className={styles.dot}>•</span>
                  <span>CRM</span>
                  <span className={styles.dot}>•</span>
                  <span>Automation</span>
                  <span className={styles.dot}>•</span>
                  <span>Scaling Systems</span>
                </div>

                <h1 className={styles.headline}>
                  Most companies don't need more people.
                  <br />
                  <span className={styles.highlight}>They need better systems.</span>
                </h1>

                <p className={styles.subtext}>
                  We help scaling businesses eliminate operational bottlenecks through AI
                  systems, automation, CRM infrastructure, SaaS solutions, and custom
                  internal platforms.
                </p>

                <button
                  className={styles.ctaBtn}
                  onClick={() => setIsCalendlyOpen(true)}
                >
                  <span>Schedule Strategy Session</span>
                  <svg
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
                  Trusted by scaling founders, agencies, SaaS teams, and operations-heavy
                  businesses.
                </p>
              </div>

             {/* RIGHT — FLOATING TESTIMONIAL CARDS */}
<div className={styles.heroRight}>
  <div className={styles.testimonialStack}>
    {loading ? (
      [0, 1, 2].map((i) => (
        <div key={i} className={`${styles.testimonialCard} ${i === 0 ? styles.active : i === 1 ? styles.next : styles.hidden}`} style={{ zIndex: 3 - i }}>
          <div className={styles.cardMedia} style={{ background: "rgba(255,255,255,0.05)", borderRadius: "8px", height: "80px", animation: "pulse 1.5s infinite" }} />
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
    ) : (
      testimonials.map((t, i) => (
        <div
          key={i}
          className={`${styles.testimonialCard} ${
            i === activeCard ? styles.active : ""
          } ${i === (activeCard + 1) % testimonials.length ? styles.next : ""} ${
            i === (activeCard + 2) % testimonials.length ? styles.hidden : ""
          }`}
          style={{ zIndex: testimonials.length - i }}
        >
          <div className={styles.cardMedia}>
            <img src={t.image?.url || "/default-avatar.png"} alt={t.image?.alt || t.name} />
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
      ))
    )}
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
            <h2 className={styles.sectionTitle}>What We Help Scaling Teams Fix</h2>
            <div className={styles.serviceGrid}>
              {services.map((service, i) => (
                <div key={i} className={styles.serviceCard}>
                  {/* <div className={styles.serviceIcon}>{service.icon}</div> */}
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* CALENDLY POPUP MODAL */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {isCalendlyOpen && (
          <div className={styles.calendlyBackdrop} onClick={() => setIsCalendlyOpen(false)}>
            <div className={styles.calendlyModal} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeBtn}
                onClick={() => setIsCalendlyOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <InlineWidget
                url="https://calendly.com/your-calendly-link"
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