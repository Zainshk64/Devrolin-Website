import React, { useEffect, useRef, useState } from "react";

type ServiceType =
  | "CRM and Sale System"
  | "AI Integration and Agents"
  | "AI Agent Business Automation";

const services: ServiceType[] = [
  "CRM and Sale System",
  "AI Integration and Agents",
  "AI Agent Business Automation",
];

const processData: Record<ServiceType, { title: string; description: string }[]> = {
  "CRM and Sale System": [
    { title: "Planning & Research", description: "We analyze your sales funnel, customer journey, and CRM requirements. Understanding your lead management and pipeline needs to design a tailored CRM solution." },
    { title: "Design & Prototyping", description: "Creating intuitive dashboards, sales workflows, and customer interaction interfaces. Focus on user-friendly CRM design with seamless navigation." },
    { title: "Development & Integration", description: "Building custom CRM platforms with sales automation, lead tracking, email integration, and third-party tools like payment gateways and analytics." },
    { title: "Testing & Optimization", description: "Rigorous testing of CRM workflows, automation rules, data integrity, and performance under heavy user loads to ensure reliability." },
    { title: "Launch & Marketing", description: "Deploying your CRM system with proper data migration, team training, and marketing campaigns to drive adoption and maximize ROI." },
    { title: "Support & Scaling", description: "Ongoing maintenance, feature updates, scaling infrastructure as your customer base grows, and continuous optimization of sales processes." },
  ],
  "AI Integration and Agents": [
    { title: "Planning & Research", description: "Identifying AI use cases for your business — from chatbots to predictive analytics. We analyze data sources and integration points for AI implementation." },
    { title: "Design & Prototyping", description: "Designing AI agent workflows, conversation flows, and user interfaces. Creating prototypes for chatbots, voice assistants, and intelligent automation." },
    { title: "Development & Integration", description: "Building AI models using NLP, machine learning, and LLMs. Integrating AI agents with your existing systems, APIs, and databases for seamless operation." },
    { title: "Testing & Optimization", description: "Training AI models with real data, A/B testing responses, fine-tuning accuracy, and ensuring ethical AI practices with bias detection." },
    { title: "Launch & Marketing", description: "Deploying AI agents to production environments, monitoring initial interactions, and marketing AI capabilities to enhance customer engagement." },
    { title: "Support & Scaling", description: "Continuous model retraining, performance monitoring, scaling AI infrastructure, and expanding AI capabilities based on user feedback." },
  ],
  "AI Agent Business Automation": [
    { title: "Planning & Research", description: "Mapping business processes suitable for automation — from customer support to data processing. Identifying repetitive tasks AI agents can handle efficiently." },
    { title: "Design & Prototyping", description: "Designing automation workflows, AI decision trees, and process orchestration. Creating prototypes for automated customer service, scheduling, and operations." },
    { title: "Development & Integration", description: "Developing AI-powered automation systems that integrate with CRM, ERP, communication tools, and databases to streamline business operations." },
    { title: "Testing & Optimization", description: "Testing automation accuracy, fallback mechanisms, error handling, and process efficiency. Optimizing AI agent responses and workflow transitions." },
    { title: "Launch & Marketing", description: "Rolling out business automation gradually, training teams on AI collaboration, and showcasing productivity gains through case studies and demos." },
    { title: "Support & Scaling", description: "Monitoring automation performance, expanding to new business processes, updating AI models, and ensuring seamless operation across departments." },
  ],
};

const dotColors = ["#e87c3e", "#c8d450", "#8a8a8a", "#4ecdc4", "#4a90d9", "#f0c040"];

// Small icons per service for a richer dropdown feel
const serviceIcons: Record<ServiceType, string> = {
  "CRM and Sale System": "fa-chart-line",
  "AI Integration and Agents": "fa-robot",
  "AI Agent Business Automation": "fa-gears",
};

const UxProcessTwo = () => {
  const [activeService, setActiveService] = useState<ServiceType>("CRM and Sale System");
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
          {/* Trigger button */}
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

          {/* Options panel */}
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
                    {isActive && (
                      <i className="fa-light fa-check uxp-drop-check"></i>
                    )}
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