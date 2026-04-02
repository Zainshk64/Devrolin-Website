import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

const ServiceMain = () => {
  return (
    <section className="section service-t">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="service-t__slider-w">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={800}
                loop={true}
                centeredSlides={false}
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  nextEl: ".next-service-t",
                  prevEl: ".prev-service-t",
                }}
                className="service-t__slider"
                breakpoints={{
                  1400: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          01
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                          Web Development
                        </h4>
                      </div>
                      <ul>
                        <li>Responsive modern design</li>
                        <li>Fast and secure</li>
                        <li>SEO optimized</li>
                        <li>Custom web solutions</li>
                        <li>Maintenance & support</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          02
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                          AI Development
                        </h4>
                      </div>
                      <ul>
                        <li>Smart automation tools</li>
                        <li>Data-driven insights</li>
                        <li>Custom AI models</li>
                        <li>Predictive analytics</li>
                        <li>Natural language tech</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          03
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                            Saas & Business Automation
                        </h4>
                      </div>
                      <ul>
                        <li>Cloud-based solutions</li>
                        <li>Workflow automation</li>
                        <li>Scalable platforms</li>
                        <li>Real-time analytics</li>
                        <li>Integration with tools</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          04
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                            Machine Learning Operations
                        </h4>
                      </div>
                      <ul>
                        <li>Model training & deployment</li>
                        <li>Automated data pipelines</li>
                        <li>Performance monitoring</li>
                        <li>Scalable ML systems</li>
                        <li>Continuous optimization</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          05
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                            Mobile App Development
                        </h4>
                      </div>
                      <ul>
                        <li>Cross-platform apps</li>
                        <li>Intuitive user interface</li>
                        <li>High performance code</li>
                        <li>API & backend integration</li>
                        <li>App store deployment</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          06
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                          UI/UX Design
                        </h4>
                      </div>
                      <ul>
                        <li>User-centered layouts</li>
                        <li>Interactive prototypes</li>
                        <li>Modern design systems</li>
                        <li>Seamless user flow</li>
                        <li>Brand-focused visuals</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          07
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                          Digital Marketing
                        </h4>
                      </div>
                      <ul>
                        <li>Targeted ad campaigns</li>
                        <li>Performance analytics</li>
                        <li>Lead generation</li>
                        <li>Conversion optimization</li>
                        <li>Brand awareness growth</li>
                      </ul>
                      
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          08
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                            Social Media Marketing (LinkedIn & IG)
                        </h4>
                      </div>
                      <ul>
                        <li>Content strategy planning</li>
                        <li>Audience engagement</li>
                        <li>Post scheduling</li>
                        <li>Ad campaign management</li>
                        <li>Profile optimization</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="service-t-single-wrapper">
                    <div className="service-t__slider-single">
                      <div className="intro">
                        <span className="sub-title">
                          09
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                        <h4>
                          SEO & GEO
                        </h4>
                      </div>
                      <ul>
                        <li>Keyword optimization</li>
                        <li>Local SEO targeting</li>
                        <li>Backlink building</li>
                        <li>Content performance tracking</li>
                        <li>Search visibility boost</li>
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="slide-group">
        <button aria-label="previous item" className="slide-btn prev-service-t">
          <i className="fa-light fa-angle-left"></i>
        </button>
        <button aria-label="next item" className="slide-btn next-service-t">
          <i className="fa-light fa-angle-right"></i>
        </button>
      </div>
    </section>
  );
};

export default ServiceMain;
