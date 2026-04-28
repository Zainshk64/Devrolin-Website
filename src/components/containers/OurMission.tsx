import React from "react";
import Image from "next/image";

const OurMission = () => {
  return (
    <section className="section mission-s fade-wrapper">
      <div className="container">
        <div className="row gaper align-items-start" style ={{paddingBottom:'20px'}}>
  <div className="col-12 col-lg-5 col-xxl-5">
    <div className="section__header text-center text-lg-start mb-0">
      <span className="sub-title">
        mission & vission
        <i className="fa-solid fa-arrow-right"></i>
      </span>
      <h2 className="title title-anim">Built On Systems. Driven By Results.</h2>
    </div>
  </div>
  <div className="col-12 col-lg-7 col-xxl-5 offset-xxl-2">
    <div className="text-center text-lg-start" style={{ paddingTop: "52px" }}>
      <p>
        We don't just build software. We design AI, SaaS, and CRM systems that solve real business
        problems, remove bottlenecks, and create predictable growth. Every decision we make is
        focused on performance, clarity, and long-term scalability.
      </p>
    </div>
  </div>
</div>
        <div className="row gaper">
          <div className="col-12 col-lg-6">
            <div className="mission-s__single mission-s__single--alt fade-top">
              <h3>We Build What Actually Works</h3>
              <div className="section__content-cta">
                <p className="primary-text">
                 We focus on outcomes not complexity.
Every system is designed to automate operations, integrate seamlessly with your tools, and deliver measurable results without unnecessary overhead.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="mission-s__single fade-top">
              <Image src='/our-story1.png' width={700} height={700} alt="Image" />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="mission-s__single fade-top">
              <Image src='/our-story2.png' 
              width={700} height={700} alt="Image" />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="mission-s__single mission-s__single--alt fade-top">
              <h3>We Build Systems That Create Real Value
</h3>
              <div className="section__content-cta">
                <p className="primary-text">
                 We design AI, SaaS, and CRM systems that remove inefficiencies, connect your tools, and turn operations into measurable growth. Every solution is built to perform, scale, and deliver results in real-world use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
