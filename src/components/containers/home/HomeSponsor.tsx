import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { homeSponsorAPI, type HomeSponsorLogo } from "@/lib/api";

/** Default carousel logos (same Cloudinary set as before) when API returns none */
const FALLBACK_SPONSOR_LOGOS: {
  src: string;
  width: number;
  height: number;
  alt: string;
}[] = [
  {
    src: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760885359/openAi_logo_ek4tjh.png",
    width: 130,
    height: 130,
    alt: "OpenAI",
  },
  {
    src: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760879770/react_x9eaze.png",
    width: 130,
    height: 130,
    alt: "React",
  },
  {
    src: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760879769/python_jmdsit.png",
    width: 150,
    height: 150,
    alt: "Python",
  },
  {
    src: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760883280/nextjs_sfch5z.png",
    width: 150,
    height: 150,
    alt: "Next.js",
  },
  {
    src: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760883292/flutter_pvfpsk.png",
    width: 150,
    height: 150,
    alt: "Flutter",
  },
  {
    src: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760883534/web3_trvl1w.png",
    width: 150,
    height: 150,
    alt: "Web3",
  },
  {
    src: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760885358/figma_ujh0hq.png",
    width: 150,
    height: 150,
    alt: "Figma",
  },
  {
    src: "https://res.cloudinary.com/daljxhxzf/image/upload/v1760885359/gemini_ml3rsa.png",
    width: 150,
    height: 150,
    alt: "Gemini",
  },
];

const MIN_SLIDES_FOR_LOOP = 12;

function repeatForCarousel<T>(items: T[], minCount: number): T[] {
  if (items.length === 0) return items;
  const out: T[] = [];
  let i = 0;
  while (out.length < minCount) {
    out.push(items[i % items.length]);
    i += 1;
  }
  return out;
}

const HomeSponsor = () => {
  const [apiLogos, setApiLogos] = useState<HomeSponsorLogo[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await homeSponsorAPI.getAll();
        if (!cancelled) {
          setApiLogos(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) setApiLogos(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const slides = useMemo(() => {
    if (apiLogos && apiLogos.length > 0) {
      const mapped = apiLogos.map((s) => ({
        key: s._id,
        src: s.image.url,
        width: 150,
        height: 150,
        alt: s.image.alt || "Sponsor",
      }));
      return repeatForCarousel(mapped, MIN_SLIDES_FOR_LOOP);
    }
    const mapped = FALLBACK_SPONSOR_LOGOS.map((item, i) => ({
      key: `fallback-${i}`,
      ...item,
    }));
    return repeatForCarousel(mapped, MIN_SLIDES_FOR_LOOP);
  }, [apiLogos]);

  return (
    <div className="sponsor section pb-0">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="sponsor__slider-w">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={1200}
                loop={true}
                roundLengths={true}
                centeredSlides={true}
                centeredSlidesBounds={false}
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  1400: {
                    slidesPerView: 6,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                }}
                className="sponsor__slider"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={`${slide.key}-${index}`}>
                    <div className="sponsor__slider-item">
                      <Image
                        src={slide.src}
                        width={slide.width}
                        height={slide.height}
                        alt={slide.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="lines d-none d-lg-flex">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default HomeSponsor;
