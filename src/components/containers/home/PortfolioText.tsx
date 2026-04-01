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

const PortfolioText = () => {
  const [hover, setHover] = useState(1);
  const [portfolio, setportfolio] = useState([]);

  const fetchportfolio = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        "https://devrolin.com/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setportfolio(data.projects || []);
      } else {
        toast.error(data.message || "Failed to load portfolio");
      }
    } catch (err) {
      toast.error("Server error while fetching portfolio");
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
                {/* <Link href="portfolio"> */}
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                {/* </Link> */}
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                {/* <Link href="portfolio"> */}
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                {/* </Link> */}
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                {/* <Link href="portfolio"> */}
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                {/* </Link> */}
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                {/* <Link href="portfolio"> */}
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                {/* </Link> */}
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                {/* <Link href="portfolio"> */}
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                {/* </Link> */}
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1 str">
                {/* <Link href="portfolio"> */}
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                {/* </Link> */}
              </h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="portfolio__text-slider-single">
              <h2 className="h1">
                {/* <Link href="portfolio"> */}
                Project Highlights
                <i className="fa-sharp fa-solid fa-arrow-down-right"></i>
                {/* </Link> */}
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="container-fluid">
        <div className="row gaper">
          {portfolio.map((portfo: any) => (
            <div className="col-12 col-sm-6 col-xl-3">
              <div
                className={
                  "portfolio__single topy-tilt fade-top" +
                  (hover === 0 ? " portfolio__single-active" : " ")
                }
                onMouseEnter={() => setHover(hover+1)}
              >
                <Link  href={`/project-single/${portfo._id}`}>
                {/* <Image src={one} alt="Image" /> */}
                  <Image src={portfo.thumbnail?.url} width={200} height={100} alt="Image" />
                </Link>
                <div className="portfolio__single-content">
                  <Link href={`/project-single/${portfo._id}`}>
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                  <h4>
                    <Link href={`/project-single/${portfo._id}`}>Explore Our Work</Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 1 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(1)}
            >
              <Link href="portfolio">
                <Image src={two} alt="Image" />
              </Link>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <Link href="portfolio">Explore Our Work</Link>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 2 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(2)}
            >
              <Link href="portfolio">
                <Image src={three} alt="Image" />
              </Link>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <Link href="portfolio">Explore Our Work</Link>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 3 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(3)}
            >
              <Link href="portfolio">
                <Image src={four} alt="Image" />
              </Link>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <Link href="portfolio">Explore Our Work</Link>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 4 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(4)}
            >
              <Link href="portfolio">
                <Image src={five} alt="Image" />
              </Link>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <Link href="portfolio">Explore Our Work</Link>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 5 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(5)}
            >
              <Link href="portfolio">
                <Image src={six} alt="Image" />
              </Link>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <Link href="portfolio">Explore Our Work</Link>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="portfolio__single-alt-wrapper fade-top">
              <div className="portfolio__single-alt topy-tilt">
                <h4>
                  <Link href="portfolio">view all work</Link>
                </h4>
                <Link href="portfolio" className="arr">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <Image src={dot} alt="Image" className="dot-one" />
                <Image src={dot} alt="Image" className="dot-two" />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div
              className={
                "portfolio__single topy-tilt fade-top" +
                (hover === 6 ? " portfolio__single-active" : " ")
              }
              onMouseEnter={() => setHover(6)}
            >
              <Link href="portfolio">
                <Image src={seven} alt="Image" />
              </Link>
              <div className="portfolio__single-content">
                <Link href="portfolio">
                  <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                </Link>
                <h4>
                  <Link href="portfolio">Explore Our Work</Link>
                </h4>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className="container-fluid">
        <div className="row gaper">
          <div className="col-12 col-sm-6 col-xl-3">
            {portfolio.map((portfo: any) => (
              <div
                className={
                  "portfolio__single topy-tilt fade-top" +
                  (hover === 0 ? " portfolio__single-active" : " ")
                }
                onMouseEnter={() => setHover(0)}
              >
                <Link href="portfolio">
                  <Image src={one} alt="Image" />
                </Link>
                <div className="portfolio__single-content">
                  <Link href="portfolio">
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                  <h4>
                    <Link href="portfolio">Explore Our Work</Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
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
