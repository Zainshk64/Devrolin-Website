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
}

// ── Shimmer block ────────────────────────────────────────────────────────────
function Skel({
  w = "100%",
  h,
  radius = 6,
  style = {},
}: {
  w?: string | number;
  h: number;
  radius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        display: "block",
        width: w,
        height: h,
        borderRadius: radius,
        background: "linear-gradient(90deg,#1a1a1a 25%,#272727 50%,#1a1a1a 75%)",
        backgroundSize: "200% 100%",
        animation: "ht-shimmer 1.4s ease-in-out infinite",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

// ── Skeleton slide ───────────────────────────────────────────────────────────
function TestimonialSkeleton() {
  return (
    <>
      <style>{`
        @keyframes ht-shimmer {
          0%   { background-position:  200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div className="testimonial-s__slider-single">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-4 col-xxl-4">
            <div className="thumb">
              <Skel h={340} radius={8} />
            </div>
          </div>
          <div className="col-12 col-lg-7 offset-lg-1 col-xxl-7 offset-xxl-1">
            <div className="testimonial-s__content">
              <div className="quote">
                <Skel w={38} h={32} radius={4} />
              </div>
              <div className="content" style={{ marginTop: 16 }}>
                <Skel w="100%" h={18} radius={5} style={{ marginBottom: 10 }} />
                <Skel w="90%"  h={18} radius={5} style={{ marginBottom: 10 }} />
                <Skel w="72%"  h={18} radius={5} />
              </div>
              <div className="content-cta" style={{ marginTop: 24 }}>
                <Skel w="36%" h={18} radius={5} style={{ marginBottom: 8 }} />
                <Skel w="52%" h={14} radius={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── See more / less logic ────────────────────────────────────────────────────
// Threshold: words that fill ~3.5 lines. We use 30 words as the cutoff.
// If feedback has more than 30 words → show first 30 words + "..." + See more button.
const WORD_LIMIT = 30;

function FeedbackText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const words = text.trim().split(/\s+/);
  const isLong = words.length > WORD_LIMIT;

  const displayed =
    isLong && !expanded
      ? words.slice(0, WORD_LIMIT).join(" ") + "…"
      : text;

  return (
    <h4>
      {displayed}
      {isLong && (
        <>
          {" "}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "#f97316",
              fontSize: "inherit",
              fontWeight: 600,
              fontFamily: "inherit",
              lineHeight: "inherit",
              display: "inline",
            }}
          >
            {expanded ? "See less" : "See more"}
          </button>
        </>
      )}
    </h4>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
const HomeTestimonial = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [nextSlideIndex, setNextSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const mainSwiperRef = useRef<SwiperType | null>(null);
  const textSwiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const len = testimonials.length;
      if (len === 0) return;
      setNextSlideIndex((swiper.realIndex + 1) % len);
    },
    [testimonials.length]
  );

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("https://devrolin.com/api/testimonials/");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section className="section testimonial pt-10 position-relative">

      <div className="testimonial__text-slider-w">
        <Swiper
          onSwiper={(s) => { textSwiperRef.current = s; }}
          slidesPerView="auto"
          spaceBetween={40}
          speed={5000}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          autoplay={{ delay: 1, disableOnInteraction: false, pauseOnMouseEnter: true }}
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

              {loading ? (
                <TestimonialSkeleton />
              ) : (
                <Swiper
                  onSwiper={(s) => { mainSwiperRef.current = s; }}
                  slidesPerView={1}
                  spaceBetween={30}
                  slidesPerGroup={1}
                  speed={800}
                  loop={testimonials.length > 1}
                  roundLengths={false}
                  centeredSlides={false}
                  centeredSlidesBounds={false}
                  modules={[Autoplay, Navigation]}
                  autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
                              <div className="thumb">
                                <img src={item.image?.url} alt={item.image?.alt || item.name} />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="44" height="322" viewBox="0 0 44 322" fill="none"
                                  className="d-none d-lg-block"
                                  style={{ pointerEvents: "none" }}
                                >
                                  <path d="M43 -0.000976562V151.999L2 192.999H43V321.999" stroke="#414141" />
                                </svg>
                              </div>
                            </div>
                            <div className="col-12 col-lg-7 offset-lg-1 col-xxl-7 offset-xxl-1">
                              <div className="testimonial-s__content">
                                <div className="quote">
                                  <i className="fa-solid fa-quote-right"></i>
                                </div>
                                {/* ↓ only this line changed from {item.feedback} */}
                                <div className="content">
                                  <FeedbackText text={item.feedback} />
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
                      <p className="text-white text-center mt-4">No testimonials found.</p>
                    </SwiperSlide>
                  )}
                </Swiper>
              )}

            </div>
          </div>
        </div>

        <div className="slide-group justify-content-start">
          <button
            aria-label="previous item"
            style={{ border: "2px solid #594c48", color: "white" }}
            className="slide-btn prev-testimonial-three"
          >
            <i className="fa-light fa-angle-left"></i>
          </button>
          <button
            aria-label="next item"
            style={{ border: "2px solid #594c48", color: "white" }}
            className="slide-btn next-testimonial-three"
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