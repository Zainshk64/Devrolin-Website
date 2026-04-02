import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import {
  ourServiceSlideAPI,
  type OurServiceSlide,
} from "@/lib/api";

type SlideView = { heading: string; bullets: string[]; _key: string };

const PLACEHOLDER_SLIDES: SlideView[] = [
  {
    _key: "ph-0",
    heading: "Web Development",
    bullets: [
      "Responsive modern design",
      "Fast and secure",
      "SEO optimized",
      "Custom web solutions",
      "Maintenance & support",
    ],
  },
  {
    _key: "ph-1",
    heading: "AI Development",
    bullets: [
      "Smart automation tools",
      "Data-driven insights",
      "Custom AI models",
      "Predictive analytics",
      "Natural language tech",
    ],
  },
  {
    _key: "ph-2",
    heading: "Saas & Business Automation",
    bullets: [
      "Cloud-based solutions",
      "Workflow automation",
      "Scalable platforms",
      "Real-time analytics",
      "Integration with tools",
    ],
  },
  {
    _key: "ph-3",
    heading: "Machine Learning Operations",
    bullets: [
      "Model training & deployment",
      "Automated data pipelines",
      "Performance monitoring",
      "Scalable ML systems",
      "Continuous optimization",
    ],
  },
  {
    _key: "ph-4",
    heading: "Mobile App Development",
    bullets: [
      "Cross-platform apps",
      "Intuitive user interface",
      "High performance code",
      "API & backend integration",
      "App store deployment",
    ],
  },
  {
    _key: "ph-5",
    heading: "UI/UX Design",
    bullets: [
      "User-centered layouts",
      "Interactive prototypes",
      "Modern design systems",
      "Seamless user flow",
      "Brand-focused visuals",
    ],
  },
  {
    _key: "ph-6",
    heading: "Digital Marketing",
    bullets: [
      "Targeted ad campaigns",
      "Performance analytics",
      "Lead generation",
      "Conversion optimization",
      "Brand awareness growth",
    ],
  },
  {
    _key: "ph-7",
    heading: "Social Media Marketing (LinkedIn & IG)",
    bullets: [
      "Content strategy planning",
      "Audience engagement",
      "Post scheduling",
      "Ad campaign management",
      "Profile optimization",
    ],
  },
  {
    _key: "ph-8",
    heading: "SEO & GEO",
    bullets: [
      "Keyword optimization",
      "Local SEO targeting",
      "Backlink building",
      "Content performance tracking",
      "Search visibility boost",
    ],
  },
];

function mapApiToView(slides: OurServiceSlide[]): SlideView[] {
  return slides.map((s) => ({
    _key: s._id,
    heading: s.heading,
    bullets: Array.isArray(s.bullets) ? s.bullets : [],
  }));
}

const ServiceMain = () => {
  const [apiSlides, setApiSlides] = useState<OurServiceSlide[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await ourServiceSlideAPI.getAll();
        if (!cancelled) {
          setApiSlides(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) setApiSlides(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const slidesToRender = useMemo(() => {
    if (apiSlides !== null && apiSlides.length > 0) {
      return mapApiToView(apiSlides);
    }
    return PLACEHOLDER_SLIDES;
  }, [apiSlides]);

  const useLoop = slidesToRender.length > 1;

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
                loop={useLoop}
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
                {slidesToRender.map((slide, index) => (
                  <SwiperSlide key={slide._key}>
                    <div className="service-t-single-wrapper">
                      <div className="service-t__slider-single">
                        <div className="intro">
                          <span className="sub-title">
                            {String(index + 1).padStart(2, "0")}
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                          <h4>{slide.heading}</h4>
                        </div>
                        {slide.bullets.length > 0 && (
                          <ul>
                            {slide.bullets.map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
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
