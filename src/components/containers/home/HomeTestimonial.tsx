import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import sthumb from "public/images/testimonial/s-thumb.png";
import sthumbtwo from "public/images/testimonial/s-thumb-two.png";
import sthumbthree from "public/images/testimonial/s-thumb-three.png";
import { toast } from "react-hot-toast";

const HomeTestimonial = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [nextSlideIndex, setNextSlideIndex] = useState<number>(1);

  const handleSlideChange = (swiper: any) => {
    const nextIndex = (swiper.realIndex + 1) % testimonials.length;
    setNextSlideIndex(nextIndex);
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/testimonials/"
      );
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);
  return (
    <section className="section testimonial pt-0 position-relative">
      <div className="testimonial__text-slider-w">
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
          className="testimonial__text-slider"
        >
          <SwiperSlide>
            <div className="testimonial__text-slider-single">
              <h2 className="h1">
                <Link href="client-feedback">
                  client&apos;s testimonial
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial__text-slider-single">
              <h2 className="h1">
                <Link href="client-feedback">
                  client&apos;s testimonial
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial__text-slider-single">
              <h2 className="h1">
                <Link href="client-feedback">
                  client&apos;s testimonial
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial__text-slider-single">
              <h2 className="h1">
                <Link href="client-feedback">
                  client&apos;s testimonial
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial__text-slider-single">
              <h2 className="h1">
                <Link href="client-feedback">
                  client&apos;s testimonial
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial__text-slider-single">
              <h2 className="h1">
                <Link href="client-feedback">
                  client&apos;s testimonial
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial__text-slider-single">
              <h2 className="h1">
                <Link href="client-feedback">
                  client&apos;s testimonial
                  <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                </Link>
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="container position-relative">
        <div className="row">
          <div className="col-12 col-xxl-10">
            <div className="testimonial-s__slider-w">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={800}
                loop={true}
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
                onSlideChange={(swiper) => handleSlideChange(swiper)}
                className="testimonial-s__slider"
              >
                {testimonials.length > 0 ? (
                  testimonials.map((item) => (
                    <SwiperSlide>
                      <div className="testimonial-s__slider-single">
                        <div className="row gaper align-items-center">
                          <div className="col-12 col-lg-4 col-xxl-4">
                            <div className="thumb">
                              <img src={item.image?.url} alt="Image" />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="44"
                                height="322"
                                viewBox="0 0 44 322"
                                fill="none"
                                className="d-none d-lg-block"
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
                  <p className="text-white text-center mt-4">
                    No testimonials found.
                  </p>
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
            alt={`Next Slide Preview`}
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
