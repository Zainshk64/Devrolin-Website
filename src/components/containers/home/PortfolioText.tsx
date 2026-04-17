import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import one from "public/images/portfolio/one.png";
import two from "public/images/portfolio/two.png";
import three from "public/images/portfolio/three.png";
import four from "public/images/portfolio/four.png";
import five from "public/images/portfolio/five.png";
import six from "public/images/portfolio/six.png";
import seven from "public/images/portfolio/seven.png";
import dot from "public/images/portfolio/dot.png";
import toast from "react-hot-toast";

const PortfolioSkeleton = () => (
  <>
    <style>{`
      @keyframes pk-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      .pk-skel {
        background: linear-gradient(90deg, #1a1a1a 25%, #262626 50%, #1a1a1a 75%);
        background-size: 200% 100%;
        animation: pk-shimmer 1.4s ease-in-out infinite;
        border-radius: 6px;
        display: block;
      }
    `}</style>
    {Array.from({ length: 4 }).map((_, i) => (
      <div className="col-12 col-sm-6 col-xl-3" key={i}>
        <div className="portfolio__single">
          {/* image placeholder */}
          <span className="pk-skel" style={{ width: "100%", height: 320 }} />
          {/* title placeholder */}
          <div className="portfolio__single-content" style={{ pointerEvents: "none" }}>
            <span className="pk-skel" style={{ width: "60%", height: 14, marginTop: 10 }} />
          </div>
        </div>
      </div>
    ))}
  </>
);

const PortfolioText = () => {
  const [hover, setHover] = useState(1);
  const [portfolio, setportfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchportfolio = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("https://devrolin.com/api/projects/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setportfolio(data.projects || []);
      } else {
        toast.error(data.message || "Failed to load portfolio");
      }
    } catch (err) {
      toast.error("Server error while fetching portfolio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchportfolio();
  }, []);

  return (
    <section className="section portfolio pb-0 fade-wrapper position-relative">
      <div className="portfolio__text-slider-w">
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          speed={5000}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          className="portfolio__text-slider"
        >
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="container-fluid">
        <div className="row gaper">
          {loading ? (
            <PortfolioSkeleton />
          ) : (
            portfolio.map((portfo: any) => (
              <div className="col-12 col-sm-6 col-xl-3" key={portfo._id}>
                <div
                  className={
                    "portfolio__single topy-tilt fade-top" +
                    (hover === 0 ? " portfolio__single-active" : " ")
                  }
                  onMouseEnter={() => setHover(hover + 1)}
                >
                  <Link href={`/project-single/${portfo._id}`}>
                    <Image
                      src={portfo.thumbnail?.url}
                      width={400}
                      height={300}
                      alt="Image"
                    />
                  </Link>
                  <div className="portfolio__single-content">
                    <Link href={`/project-single/${portfo._id}`}>
                      <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                    </Link>
                    <h4>
                      <Link href={`/project-single/${portfo._id}`}>
                        Explore Our Work
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="lines d-none d-lg-flex">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </section>
  );
};

export default PortfolioText;