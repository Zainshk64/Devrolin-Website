import React, { useEffect, useRef, useState } from "react";

type ServiceType =
  | "AI Automation & Integration Systems"
  | "CRM & Revenue Systems"
  | "SaaS & MVP Development"
  | "Web & Custom Platforms";

const services: ServiceType[] = [
  "AI Automation & Integration Systems",
  "CRM & Revenue Systems",
  "SaaS & MVP Development",
  "Web & Custom Platforms",
];

const processData: Record<ServiceType, { title: string; description: string }[]> = {
  "AI Automation & Integration Systems": [
    { title: "Workflow & Bottleneck Audit",       description: "We map your current processes, identify manual work, delays, and integration gaps across your tools." },
    { title: "Automation Architecture Design",     description: "We design AI-driven workflows, integrations, and system logic tailored to your operations." },
    { title: "AI Agent & Integration Setup",       description: "We build AI agents and connect your tools, APIs, and internal systems into one unified flow." },
    { title: "Testing & Optimization",             description: "We test real scenarios, refine logic, and ensure accuracy, speed, and stability." },
    { title: "Deployment & Team Adoption",         description: "We deploy systems and ensure your team can use them effectively without friction." },
    { title: "Scaling & Continuous Improvement",   description: "We optimize performance and expand automation as your business grows." },
  ],
  "CRM & Revenue Systems": [
    { title: "Funnel & Pipeline Analysis",         description: "We analyze your lead flow, sales process, and identify where conversions are lost." },
    { title: "CRM Strategy & Structure",           description: "We design pipelines, stages, and automation aligned with your sales process." },
    { title: "CRM Setup & Integration",            description: "We build and connect CRM with your tools (email, ads, forms, APIs)." },
    { title: "Automation & Follow-ups",            description: "We automate lead capture, nurturing, and follow-ups (Email, SMS, workflows)." },
    { title: "Testing & Conversion Optimization",  description: "We test flows and optimize for faster response and higher close rates." },
    { title: "Reporting & Revenue Tracking",       description: "We implement dashboards to track performance, leads, and revenue growth." },
  ],
  "SaaS & MVP Development": [
    { title: "Product Strategy & Validation",      description: "We define your idea, features, and validate what needs to be built first." },
    { title: "UX & System Design",                 description: "We design user flows, architecture, and scalable system structure." },
    { title: "MVP Development",                    description: "We build your product fast with core features and clean backend." },
    { title: "Integrations & Core Features",       description: "We integrate payments, APIs, AI, and essential product functionalities." },
    { title: "Testing & Launch Preparation",       description: "We test performance, fix issues, and prepare for real users." },
    { title: "Launch & Scaling",                   description: "We deploy and help you scale with improvements and new features." },
  ],
  "Web & Custom Platforms": [
    { title: "Business & Conversion Analysis",     description: "We understand your goals, audience, and conversion strategy." },
    { title: "UI/UX & Structure Design",           description: "We design layouts focused on clarity, engagement, and conversion." },
    { title: "Development & Integration",          description: "We build fast, secure websites and integrate APIs and systems." },
    { title: "Performance & SEO Optimization",     description: "We optimize speed, structure, and technical SEO." },
    { title: "Testing & Go-Live",                  description: "We test across devices and launch smoothly." },
    { title: "Maintenance & Growth Support",       description: "We ensure performance, updates, and scalability over time." },
  ],
};

const dotColors = ["#e87c3e", "#c8d450", "#8a8a8a", "#4ecdc4", "#4a90d9", "#f0c040"];

const serviceIcons: Record<ServiceType, string> = {
  "AI Automation & Integration Systems": "fa-gears",
  "CRM & Revenue Systems":               "fa-chart-line",
  "SaaS & MVP Development":              "fa-rocket",
  "Web & Custom Platforms":              "fa-globe",
};

const UxProcessTwo = () => {
  const [activeService, setActiveService] = useState<ServiceType>("AI Automation & Integration Systems");
  const [openIndex, setOpenIndex]         = useState<number>(-1);
  const [dropOpen, setDropOpen]           = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

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

  const handleTabChange = (service: ServiceType) => {
    setActiveService(service);
    setOpenIndex(-1);
    setDropOpen(false);
  };

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="uxp-section">
      <div className="uxp-container">

        {/* ── Header ── */}
        <div className="uxp-header">
          <span className="uxp-subtitle">
            Services <i className="fa-solid fa-arrow-right"></i>
          </span>
          <h2 className="uxp-title">Our Complete Service Process</h2>
        </div>

        {/* ── Custom Dropdown ── */}
        <div className="uxp-select-wrap" ref={dropRef}>
          <button
            type="button"
            className={`uxp-drop-trigger${dropOpen ? " uxp-drop-trigger--open" : ""}`}
            onClick={() => setDropOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={dropOpen}
          >
            <span className="uxp-drop-trigger-left">
              <i className={`fa-light ${serviceIcons[activeService]} uxp-drop-icon`}></i>
              <span>{activeService}</span>
            </span>
            <i className={`fa-light fa-chevron-down uxp-drop-chevron${dropOpen ? " uxp-drop-chevron--open" : ""}`}></i>
          </button>

          {dropOpen && (
            <ul className="uxp-drop-menu" role="listbox">
              {services.map((service) => {
                const isActive = service === activeService;
                return (
                  <li
                    key={service}
                    role="option"
                    aria-selected={isActive}
                    className={`uxp-drop-option${isActive ? " uxp-drop-option--active" : ""}`}
                    onClick={() => handleTabChange(service)}
                  >
                    <span className="uxp-drop-option-left">
                      <i className={`fa-light ${serviceIcons[service]} uxp-drop-icon`}></i>
                      <span>{service}</span>
                    </span>
                    {isActive && <i className="fa-light fa-check uxp-drop-check"></i>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ── Accordion ── */}
        <div className="uxp-accordion" key={activeService}>
          {processData[activeService].map((process, index) => (
            <div
              key={index}
              className={`uxp-accordion-item${openIndex === index ? " uxp-accordion-item--open" : ""}`}
            >
              <button
                className="uxp-accordion-trigger"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
              >
                <div className="uxp-accordion-left">
                  <span className="uxp-dot" style={{ background: dotColors[index] }} />
                  <h4 className="uxp-accordion-title">{process.title}</h4>
                </div>
                <span className="uxp-accordion-icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="uxp-accordion-body">
                  <p>{process.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UxProcessTwo;