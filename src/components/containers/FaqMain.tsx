import React, { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "What Results Can You Deliver For My Business?",
    answer:
      "We build AI, SaaS, and CRM systems that automate operations, reduce manual work, and increase conversions. The goal is simple: more efficiency and predictable revenue growth.",
  },
  {
    question: "How Do Your AI & Automation Systems Actually Work?",
    answer:
      "We analyze your workflows, connect your tools, and build AI-driven systems that automate tasks, manage data, and run processes without constant manual input.",
  },
  {
    question: "What Makes DevRolin Different From Other Agencies?",
    answer:
      "We don’t just build software — we build systems that solve real business problems. Every solution is designed for performance, scalability, and measurable outcomes.",
  },
  {
    question: "How Long Does It Take To Build A System Or MVP?",
    answer:
      "Timelines depend on scope, but most MVPs and core systems are delivered within a few weeks. We focus on fast execution without compromising quality.",
  },
  {
    question: "Can You Integrate With Our Existing Tools And CRM?",
    answer:
      "Yes. We specialize in integrating AI systems, CRMs, APIs, and internal tools to create one connected workflow across your business.",
  },
  {
    question: "What Happens After The Project Is Completed?",
    answer:
      "We don’t disappear after delivery. We provide support, optimization, and scaling to ensure your systems continue to perform as your business grows.",
  },
];

const FaqMain = () => {
  const [imgTab, setImgTab] = useState<number | null>(0);

  return (
    <section className="section faq fade-wrapper">
      <div className="container">
        <div className="row gaper">
          
          {/* Image */}
          <div className="col-12 col-lg-6">
            <div className="faq__thumb fade-left">
              <Image
                src="/faq-image.png"
                width={400}
                height={400}
                alt="FAQ Image"
              />
            </div>
          </div>

          {/* Accordion */}
          <div className="col-12 col-lg-6">
            <div className="accordion" id="accordion">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={
                    "accordion-item content__space fade-top" +
                    (imgTab === index ? " faq-one-active" : "")
                  }
                >
                  <h5 className="accordion-header">
                    <button
                      className={
                        (imgTab === index ? "" : "collapsed") +
                        " accordion-button"
                      }
                      onClick={() =>
                        setImgTab(imgTab === index ? null : index)
                      }
                      type="button"
                    >
                      {faq.question}
                    </button>
                  </h5>

                  <div
                    className={`accordion-collapse collapse${
                      imgTab === index ? " show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqMain;