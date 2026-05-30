import React, { useState } from "react";

const UxProcess = () => {
  const [imgTab, setImgTab] = useState(0);

  return (
    <section className="section ux-process fade-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title">
                Services <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">Our Complete Service Process</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="service-f-wrapper">
              {/* 1 */}
              <div
                className={
                  "service-f-single fade-top " +
                  (imgTab === 0 ? "service-f-single-active" : "")
                }
              >
                <div className="single-item">
                  <div className="intro-btn">
                    <h4>Planning & Research</h4>
                  </div>
                </div>
                <div className="single-item p-single p-sm body-cn">
                  <p>
                    We start by understanding your business goals and target audience. 
                    Whether it’s Web, AI, or SaaS, this phase sets the foundation for all development and marketing strategies.
                  </p>
                </div>
                <button
                  className="toggle-service-f"
                  onClick={() => setImgTab(imgTab === 0 ? -1 : 0)}
                ></button>
              </div>

              {/* 2 */}
              <div
                className={
                  "service-f-single fade-top " +
                  (imgTab === 1 ? "service-f-single-active" : "")
                }
              >
                <div className="single-item">
                  <div className="intro-btn">
                    <h4>Design & Prototyping</h4>
                  </div>
                </div>
                <div className="single-item p-single p-sm body-cn">
                  <p>
                    Our UI/UX experts craft modern, user-centered designs for 
                    web, mobile and SaaS platforms — focusing on usability, brand identity and visual impact.
                  </p>
                </div>
                <button
                  className="toggle-service-f"
                  onClick={() => setImgTab(imgTab === 1 ? -1 : 1)}
                ></button>
              </div>

              {/* 3 */}
              <div
                className={
                  "service-f-single fade-top " +
                  (imgTab === 2 ? "service-f-single-active" : "")
                }
              >
                <div className="single-item">
                  <div className="intro-btn">
                    <h4>Development & Integration</h4>
                  </div>
                </div>
                <div className="single-item p-single p-sm body-cn">
                  <p>
                    We develop scalable Web Apps, Mobile Apps, AI models and SaaS 
                    platforms using the latest tech stack — ensuring secure APIs and smooth integrations across systems.
                  </p>
                </div>
                <button
                  className="toggle-service-f"
                  onClick={() => setImgTab(imgTab === 2 ? -1 : 2)}
                ></button>
              </div>

              {/* 4 */}
              <div
                className={
                  "service-f-single fade-top " +
                  (imgTab === 3 ? "service-f-single-active" : "")
                }
              >
                <div className="single-item">
                  <div className="intro-btn">
                    <h4>Testing & Optimization</h4>
                  </div>
                </div>
                <div className="single-item p-single p-sm body-cn">
                  <p>
                    Every project undergoes performance, usability and A/B testing. 
                    From Machine Learning Operations to SEO, we optimize for both speed and accuracy.
                  </p>
                </div>
                <button
                  className="toggle-service-f"
                  onClick={() => setImgTab(imgTab === 3 ? -1 : 3)}
                ></button>
              </div>

              {/* 5 */}
              <div
                className={
                  "service-f-single fade-top " +
                  (imgTab === 4 ? "service-f-single-active" : "")
                }
              >
                <div className="single-item">
                  <div className="intro-btn">
                    <h4>Launch & Marketing</h4>
                  </div>
                </div>
                <div className="single-item p-single p-sm body-cn">
                  <p>
                    Once everything is ready, we deploy your product to live servers 
                    and power it with Digital Marketing, Social Media (LinkedIn & IG) and SEO/GEO targeting for growth.
                  </p>
                </div>
                <button
                  className="toggle-service-f"
                  onClick={() => setImgTab(imgTab === 4 ? -1 : 4)}
                ></button>
              </div>

              {/* 6 */}
              <div
                className={
                  "service-f-single fade-top " +
                  (imgTab === 5 ? "service-f-single-active" : "")
                }
              >
                <div className="single-item">
                  <div className="intro-btn">
                    <h4>Support & Scaling</h4>
                  </div>
                </div>
                <div className="single-item p-single p-sm body-cn">
                  <p>
                    After launch, we monitor performance, provide updates and scale your 
                    systems — from AI retraining to app enhancements and marketing automation.
                  </p>
                </div>
                <button
                  className="toggle-service-f"
                  onClick={() => setImgTab(imgTab === 5 ? -1 : 5)}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UxProcess;
