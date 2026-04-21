import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
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
          <span className="pk-skel" style={{ width: "100%", height: 320 }} />
          <div className="portfolio__single-content" style={{ pointerEvents: "none" }}>
            <span className="pk-skel" style={{ width: "60%", height: 14, marginTop: 10 }} />
          </div>
        </div>
      </div>
    ))}
  </>
);

const DESKTOP_MAX = 8;
const MOBILE_STEP = 3;

const PortfolioText = () => {
  const [hover, setHover] = useState(1);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mobile-only: how many cards are currently visible
  const [mobileVisible, setMobileVisible] = useState(MOBILE_STEP);

  // Detect mobile (< 768px). Re-evaluated on resize.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fetchPortfolio = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("https://devrolin.com/api/projects/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setPortfolio(data.projects || []);
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
    fetchPortfolio();
  }, []);

  // ─── Derived display lists ──────────────────────────────────────────────────

  // Desktop: cap at 8
  const desktopProjects = portfolio.slice(0, DESKTOP_MAX);
  const hasMoreDesktop = portfolio.length > DESKTOP_MAX;

  // Mobile: show up to mobileVisible
  const mobileProjects = portfolio.slice(0, mobileVisible);
  const canShowMore = mobileVisible < portfolio.length;
  const canShowLess = mobileVisible > MOBILE_STEP;

  // Which list to render depends on breakpoint
  const visibleProjects = isMobile ? mobileProjects : desktopProjects;

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleShowMore = () =>
    setMobileVisible((prev) => Math.min(prev + MOBILE_STEP, portfolio.length));

  const handleShowLess = () =>
    setMobileVisible((prev) => Math.max(prev - MOBILE_STEP, MOBILE_STEP));

  return (
    <section className="section portfolio pb-0 fade-wrapper position-relative">
      {/* ── Text slider ──────────────────────────────────────────────────── */}
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
          {[...Array(7)].map((_, i) => (
            <SwiperSlide key={i}>
              <div className="portfolio__text-slider-single">
                <h2 className={`h1${i % 2 !== 0 ? " str" : ""}`}>
                  Systems built
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Cards grid ───────────────────────────────────────────────────── */}
      <div className="container-fluid">
        <div className="row gaper">
          {loading ? (
            <PortfolioSkeleton />
          ) : (
            visibleProjects.map((portfo: any) => (
              <div className="col-12 col-sm-6 col-xl-3" key={portfo._id}>
                <div
                  className={
                    "portfolio__single topy-tilt fade-top" +
                    (hover === 0 ? " portfolio__single-active" : " ")
                  }
                  onMouseEnter={() => setHover((h) => h + 1)}
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

        {/* ── Desktop: "View All Projects" button ──────────────────────── */}
        {!loading && !isMobile && hasMoreDesktop && (
          <div className="text-center mt-4 d-none d-sm-block">
            <Link href="/our-projects" className="cmn-btn">
              View All Projects
            </Link>
          </div>
        )}

        {/* ── Mobile: Show More / Show Less buttons ────────────────────── */}
        {!loading && isMobile && (canShowMore || canShowLess) && (
          <div
            className="d-flex d-sm-none justify-content-center gap-3 mt-4"
            style={{ gap: "12px" }}
          >
            {canShowLess && (
              <button
                className="cmn-btn cmn-btn--secondary"
                onClick={handleShowLess}
              >
                Show Less
              </button>
            )}
            {canShowMore && (
              <button className="cmn-btn" onClick={handleShowMore}>
                Show More
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Background lines ─────────────────────────────────────────────── */}
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