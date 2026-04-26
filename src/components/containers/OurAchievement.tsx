import React, { useEffect, useRef, useState } from "react";

const metrics = [
  {
    number: "70",
    suffix: "+",
    label: "Systems Delivered",
    sub: "AI, CRM & SaaS projects",
    highlight: true,
  },
  {
    number: "35",
    suffix: "+",
    label: "Countries Served",
    sub: "Global client base",
    highlight: false,
  },
  {
    number: "100",
    suffix: "K+",
    label: "Users Impacted",
    sub: "Across platforms built",
    highlight: false,
  },
  {
    number: "",
    suffix: "",
    label: "End-to-End",
    sub: "From idea to deployment",
    staticText: "Automation Built",
    highlight: false,
  },
];

// Count-up hook
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
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
  const numericTarget = parseInt(metric.number || "0", 10);
  const count = useCountUp(numericTarget, 1800, inView);

  return (
    <div
      className={`ach-card${metric.highlight ? " ach-card--highlight" : ""}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="ach-card__glow" />
      <div className="ach-card__inner">
        <div className="ach-card__number">
          {metric.staticText ? (
            <span className="ach-card__static">{metric.staticText}</span>
          ) : (
            <>
              {inView ? count : 0}
              <span className="ach-card__suffix">{metric.suffix}</span>
            </>
          )}
        </div>
        <p className="ach-card__label">{metric.label}</p>
        <p className="ach-card__sub">{metric.sub}</p>
      </div>
      <div className="ach-card__border" />
    </div>
  );
};

const OurAchievement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section ach-section" ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title">
                Results
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">What We've Delivered</h2>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className={`ach-grid${inView ? " ach-grid--visible" : ""}`}>
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurAchievement;