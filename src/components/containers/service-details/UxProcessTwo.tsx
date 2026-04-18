import React, { useState } from "react";

const UxProcessTwo = () => {
  const [imgTab, setImgTab] = useState(-1);
  const [activeService, setActiveService] = useState("CRM and Sale System");

  // Service data structure
  const services = [
    "CRM and Sale System",
    "AI Integration and Agents",
    "AI Agent Business Automation"
  ];

  // Process steps data for each service
  const processData = {
    "CRM and Sale System": [
      {
        title: "Planning & Research",
        description: "We analyze your sales funnel, customer journey, and CRM requirements. Understanding your lead management and pipeline needs to design a tailored CRM solution."
      },
      {
        title: "Design & Prototyping",
        description: "Creating intuitive dashboards, sales workflows, and customer interaction interfaces. Focus on user-friendly CRM design with seamless navigation."
      },
      {
        title: "Development & Integration",
        description: "Building custom CRM platforms with sales automation, lead tracking, email integration, and third-party tools like payment gateways and analytics."
      },
      {
        title: "Testing & Optimization",
        description: "Rigorous testing of CRM workflows, automation rules, data integrity, and performance under heavy user loads to ensure reliability."
      },
      {
        title: "Launch & Marketing",
        description: "Deploying your CRM system with proper data migration, team training, and marketing campaigns to drive adoption and maximize ROI."
      },
      {
        title: "Support & Scaling",
        description: "Ongoing maintenance, feature updates, scaling infrastructure as your customer base grows, and continuous optimization of sales processes."
      }
    ],
    "AI Integration and Agents": [
      {
        title: "Planning & Research",
        description: "Identifying AI use cases for your business — from chatbots to predictive analytics. We analyze data sources and integration points for AI implementation."
      },
      {
        title: "Design & Prototyping",
        description: "Designing AI agent workflows, conversation flows, and user interfaces. Creating prototypes for chatbots, voice assistants, and intelligent automation."
      },
      {
        title: "Development & Integration",
        description: "Building AI models using NLP, machine learning, and LLMs. Integrating AI agents with your existing systems, APIs, and databases for seamless operation."
      },
      {
        title: "Testing & Optimization",
        description: "Training AI models with real data, A/B testing responses, fine-tuning accuracy, and ensuring ethical AI practices with bias detection."
      },
      {
        title: "Launch & Marketing",
        description: "Deploying AI agents to production environments, monitoring initial interactions, and marketing AI capabilities to enhance customer engagement."
      },
      {
        title: "Support & Scaling",
        description: "Continuous model retraining, performance monitoring, scaling AI infrastructure, and expanding AI capabilities based on user feedback."
      }
    ],
    "AI Agent Business Automation": [
      {
        title: "Planning & Research",
        description: "Mapping business processes suitable for automation — from customer support to data processing. Identifying repetitive tasks AI agents can handle efficiently."
      },
      {
        title: "Design & Prototyping",
        description: "Designing automation workflows, AI decision trees, and process orchestration. Creating prototypes for automated customer service, scheduling, and operations."
      },
      {
        title: "Development & Integration",
        description: "Developing AI-powered automation systems that integrate with CRM, ERP, communication tools, and databases to streamline business operations."
      },
      {
        title: "Testing & Optimization",
        description: "Testing automation accuracy, fallback mechanisms, error handling, and process efficiency. Optimizing AI agent responses and workflow transitions."
      },
      {
        title: "Launch & Marketing",
        description: "Rolling out business automation gradually, training teams on AI collaboration, and showcasing productivity gains through case studies and demos."
      },
      {
        title: "Support & Scaling",
        description: "Monitoring automation performance, expanding to new business processes, updating AI models, and ensuring seamless operation across departments."
      }
    ]
  };
 return (
    <section className="section ux-process fade-wrapper">
      <div className="container">

        {/* Header */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title">
                Services <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                Our Complete Service Process
              </h2>

              {/* ✅ FILTER MOVED HERE */}
              {/* <div className="service-filter-wrapper">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className={`service-filter-btn ${
                      activeService === service ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveService(service);
                      setImgTab(-1);
                    }}
                  >
                    {service}
                  </button>
                ))}
              </div> */}

            </div>
          </div>
        </div>

        {/* Accordion Section */}
        <div className="row">
          <div className="col-12">
            <div className="service-f-wrapper">
              {processData[activeService].map((process, index) => (
                <div
                  key={index}
                  className={
                    "service-f-single fade-top " +
                    (imgTab === index ? "service-f-single-active" : "")
                  }
                >
                  <div className="single-item">
                    <div className="intro-btn">
                      <h4>{process.title}</h4>
                    </div>
                  </div>

                  <div className="single-item p-single p-sm body-cn">
                    <p>{process.description}</p>
                  </div>

                  <button
                    className="toggle-service-f"
                    onClick={() =>
                      setImgTab(imgTab === index ? -1 : index)
                    }
                  ></button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default UxProcessTwo;