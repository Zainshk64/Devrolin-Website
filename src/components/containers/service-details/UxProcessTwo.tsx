import React, { useEffect, useRef, useState } from "react";

const dotColors = ["#e87c3e", "#c8d450", "#8a8a8a", "#4ecdc4", "#4a90d9", "#f0c040"];

const UxProcessTwo = ({ mainService }: { mainService: any }) => {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  if (!mainService?.ourProcess?.length) {
    return null;
  }

  return (
    <section className="uxp-section">
      <div className="uxp-container">
        {/* Header */}
        <div className="uxp-header">
          <span className="uxp-subtitle">
            Process <i className="fa-solid fa-arrow-right"></i>
          </span>
          <h2 className="uxp-title">Our Process</h2>
        </div>

        {/* Accordion */}
        <div className="uxp-accordion">
          {mainService.ourProcess.map((process: any, index: number) => (
            <div
              key={index}
              className={`uxp-accordion-item${
                openIndex === index ? " uxp-accordion-item--open" : ""
              }`}
            >
              <button
                className="uxp-accordion-trigger"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndex === index}
              >
                <div className="uxp-accordion-left">
                  <span
                    className="uxp-dot"
                    style={{ background: dotColors[index % dotColors.length] }}
                  />
                  <h4 className="uxp-accordion-title">{process.question}</h4>
                </div>
                <span className="uxp-accordion-icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="uxp-accordion-body">
                  <p>{process.answer}</p>
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