import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import { toast } from "react-hot-toast";

interface TestimonialItem {
  _id: string;
  name: string;
  job: string;
  feedback: string;
  image?: { url?: string; alt?: string };
  videoIframe?: string;
}

function TestimonialVideoEmbed({ raw }: { raw: string }) {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Inject autoplay into any URL or iframe src
  const addAutoplay = (url: string): string => {
    try {
      const u = new URL(url);
      u.searchParams.set("autoplay", "1");
      if (u.hostname.includes("youtube") || u.hostname.includes("youtu.be")) {
        u.searchParams.set("rel", "0");
        u.searchParams.set("enablejsapi", "1");
      }
      if (u.hostname.includes("vimeo")) {
        u.searchParams.set("autoplay", "1");
      }
      return u.toString();
    } catch {
      return url;
    }
  };

  const lower = trimmed.toLowerCase();
  if (lower.includes("<iframe")) {
    // Patch src= inside the raw iframe string
    const patched = trimmed.replace(
      /src=["']([^"']+)["']/i,
      (_, url) => `src="${addAutoplay(url)}"`
    );
    return (
      <div
        className="home-testimonial-video-embed"
        dangerouslySetInnerHTML={{ __html: patched }}
      />
    );
  }

  return (
    <div className="ratio ratio-16x9 w-100">
      <iframe
        src={addAutoplay(trimmed)}
        title="Testimonial video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-100 h-100 border-0"
      />
    </div>
  );
}
const HomeTestimonial = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [nextSlideIndex, setNextSlideIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoRaw, setActiveVideoRaw] = useState<string | null>(null);

  const mainSwiperRef = useRef<SwiperType | null>(null);
  const textSwiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const len = testimonials.length;
    if (len === 0) return;
    const nextIndex = (swiper.realIndex + 1) % len;
    setNextSlideIndex(nextIndex);
  }, [testimonials.length]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/testimonials/");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const stopCarousels = useCallback(() => {
    mainSwiperRef.current?.autoplay?.stop();
    textSwiperRef.current?.autoplay?.stop();
  }, []);

  const startCarousels = useCallback(() => {
    mainSwiperRef.current?.autoplay?.start();
    textSwiperRef.current?.autoplay?.start();
  }, []);

  useEffect(() => {
    if (videoModalOpen) {
      stopCarousels();
      document.body.style.overflow = "hidden";
    } else {
      startCarousels();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [videoModalOpen, stopCarousels, startCarousels]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && videoModalOpen) closeVideoModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoModalOpen]);

  const openVideoModal = (raw: string) => {
    setActiveVideoRaw(raw);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setActiveVideoRaw(null);
  };

  const hasVideo = (item: TestimonialItem) =>
    Boolean(item.videoIframe && String(item.videoIframe).trim());

  return (
    <section className="section testimonial pt-0 position-relative">
      <style>{`
        @keyframes home-testimonial-play-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.45);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.06);
            box-shadow: 0 0 0 12px rgba(255, 255, 255, 0);
          }
        }
        .home-testimonial-thumb-wrap {
          position: relative;
          display: inline-block;
          width: 100%;
        }
        .home-testimonial-play-hit {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 90px;
          height: 90px;
          border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.6);   /* visible ring */
          padding: 0;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          z-index: 2;
          transition: background 0.2s ease, color 0.2s ease;
          animation: home-testimonial-play-pulse 2s ease-in-out infinite;
        }
        .home-testimonial-play-hit:hover {
        background: rgba(249, 115, 22, 0.95);   /* orange #f97316 */
  border-color: #f97316;
  color: #fff;
  animation: none;
        }
        .home-testimonial-play-hit i {
          margin-left: 4px;
        }
        .home-testimonial-video-embed iframe {
          position: absolute;
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          border: 0;
        }
        .home-testimonial-video-embed {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 8px;
          background: #000;
        }
      `}</style>

      {videoModalOpen && activeVideoRaw && (
        <div
          className="home-testimonial-video-modal position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            zIndex: 1080,
            background: "rgba(10, 8, 8, 0.88)",
            backdropFilter: "blur(4px)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Video testimonial"
          onClick={closeVideoModal}
        >
          <div
            className="position-relative w-100"
            style={{ maxWidth: 960 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="btn btn-light position-absolute rounded-circle p-0 d-flex align-items-center justify-content-center border-0 shadow"
              style={{
                top: -12,
                right: -12,
                width: 44,
                height: 44,
                zIndex: 2,
              }}
              aria-label="Close video"
              onClick={closeVideoModal}
            >
              <i className="fa-solid fa-xmark fs-5" aria-hidden="true" />
            </button>
            <TestimonialVideoEmbed raw={activeVideoRaw} />
          </div>
        </div>
      )}

      <div className="testimonial__text-slider-w">
        <Swiper
          onSwiper={(s) => {
            textSwiperRef.current = s;
          }}
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
          className="testimonial__text-slider"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <SwiperSlide key={`tt-${i}`}>
              <div className="testimonial__text-slider-single">
                <h2 className="h1">
                  <Link href="client-feedback">
                    client&apos;s testimonial
                    <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                  </Link>
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="container position-relative">
        <div className="row">
          <div className="col-12 col-xxl-10">
            <div className="testimonial-s__slider-w">
              <Swiper
                onSwiper={(s) => {
                  mainSwiperRef.current = s;
                }}
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={800}
                loop={testimonials.length > 1}
                roundLengths={false}
                centeredSlides={false}
                centeredSlidesBounds={false}
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                navigation={{
                  nextEl: ".next-testimonial-three",
                  prevEl: ".prev-testimonial-three",
                }}
                onSlideChange={handleSlideChange}
                className="testimonial-s__slider"
              >
                {testimonials.length > 0 ? (
                  testimonials.map((item) => (
                    <SwiperSlide key={item._id}>
                      <div className="testimonial-s__slider-single">
                        <div className="row gaper align-items-center">
                          <div className="col-12 col-lg-4 col-xxl-4">
                            <div className="thumb home-testimonial-thumb-wrap">
                              <img src={item.image?.url} alt="Image" />
                              {hasVideo(item) && (
                                <button
                                  type="button"
                                  className="home-testimonial-play-hit"
                                  aria-label="Play testimonial video"
                                  onClick={() =>
                                    openVideoModal(item.videoIframe as string)
                                  }
                                >
                                  <i
                                    className="fa-solid fa-play"
                                    aria-hidden="true"
                                  />
                                </button>
                              )}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="44"
                                height="322"
                                viewBox="0 0 44 322"
                                fill="none"
                                className="d-none d-lg-block"
                                style={{ pointerEvents: "none" }}
                              >
                                <path
                                  d="M43 -0.000976562V151.999L2 192.999H43V321.999"
                                  stroke="#414141"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="col-12 col-lg-7 offset-lg-1 col-xxl-7 offset-xxl-1">
                            <div className="testimonial-s__content">
                              <div className="quote">
                                <i className="fa-solid fa-quote-right"></i>
                              </div>
                              <div className="content">
                                <h4>{item.feedback}</h4>
                              </div>
                              <div className="content-cta">
                                <h5>{item.name}</h5>
                                <p>{item.job}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <p className="text-white text-center mt-4">
                      No testimonials found.
                    </p>
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="slide-group justify-content-start">
          <button
            aria-label="previous item"
            style={{ border: "2px solid #594c48", color: "white" }}
            className="slide-btn  prev-testimonial-three"
          >
            <i className="fa-light fa-angle-left"></i>
          </button>
          <button
            aria-label="next item"
            className="slide-btn next-testimonial-three"
            style={{ border: "2px solid #594c48", color: "white" }}
          >
            <i className="fa-light fa-angle-right"></i>
          </button>
        </div>
      </div>
      {testimonials.length > 0 && (
        <div className="other-section">
          <img
            className="other-section-image"
            src={testimonials[nextSlideIndex]?.image?.url}
            alt="Next slide preview"
          />
        </div>
      )}
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

export default HomeTestimonial;
