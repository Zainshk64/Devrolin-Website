import React, { useEffect, useRef, useState } from "react";

const metrics = [
  {
    number: 70,
    suffix: "+",
    label: "Systems Delivered",
    sub: "AI, CRM & SaaS projects",
    icon: "fa-layer-group",
    highlight: true,
  },
  {
    number: 35,
    suffix: "+",
    label: "Countries Served",
    sub: "Global client base",
    icon: "fa-globe",
    highlight: false,
  },
  {
    number: 500,
    suffix: "K+",
    label: "Users Impacted",
    sub: "Across platforms built",
    icon: "fa-users",
    highlight: false,
  },
  {
    number: 0,
    suffix: "",
    label: "End-to-End",
    sub: "From idea to deployment",
    icon: "fa-rocket",
    staticText: "Automation\nBuilt",
    highlight: false,
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const MetricCard = ({
  metric,
  index,
  inView,
}: {
  metric: (typeof metrics)[0];
  index: number;
  inView: boolean;
}) => {
  const count = useCountUp(metric.number, 2000, inView);

  return (
    <div
      className={`acv-card${metric.highlight ? " acv-card--hl" : ""}`}
      style={{ animationDelay: `${index * 140}ms` }}
    >
      {/* Top row: icon + decorative line */}
      <div className="acv-card__top">
        <span className="acv-card__icon-wrap">
          <i className={`fa-light ${metric.icon}`}></i>
        </span>
        <div className="acv-card__line" />
      </div>

      {/* Number */}
      <div className="acv-card__num">
        {metric.staticText ? (
          metric.staticText.split("\n").map((line, i) => (
            <span key={i} className="acv-card__static-line">{line}</span>
          ))
        ) : (
          <>
            <span className="acv-card__digit">{inView ? count : 0}</span>
            <span className="acv-card__suffix">{metric.suffix}</span>
          </>
        )}
      </div>

      {/* Label + sub */}
      <p className="acv-card__label">{metric.label}</p>
      <p className="acv-card__sub">{metric.sub}</p>

      {/* Bottom accent bar */}
      <div className="acv-card__bar" />
    </div>
  );
};

const OurAchievement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section acv-section" ref={sectionRef}>
      {/* Radial spotlight */}
      <div className="acv-spotlight" aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title">
                Results <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">What We've Delivered</h2>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className={`acv-grid${inView ? " acv-grid--visible" : ""}`}>
          {metrics.map((m, i) => (
            <MetricCard key={i} metric={m} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievement;