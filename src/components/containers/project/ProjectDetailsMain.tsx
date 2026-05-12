import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import poster from "public/images/projects/poster.png";
import iconone from "public/images/projects/icon-one.png";
import icontwo from "public/images/projects/icon-two.png";
import iconthree from "public/images/projects/icon-three.png";
import done from "public/images/projects/d-one.png";
import dtwo from "public/images/projects/d-two.png";
import dthree from "public/images/projects/d-three.png";
import dfour from "public/images/projects/d-four.png";
import dfive from "public/images/projects/d-five.png";

const ProjectDetailsMain = ({ project }: { project: any }) => {
  return (
    <section className="section project-d">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-lg-6">
            <div className="project-d-group">
              <h3 className="light-title-lg">{project.title}</h3>
              <p>{project.description || " There are many variations of passages of Lorem Ipsum available,but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."}</p>
              
            </div>
          </div>
         
        </div>

        <div className="row">
  <div className="col-12">
    <div className="poster__slider-wrapper">
      <div className="poster__slider-w">
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
            nextEl: ".next-project-d",
            prevEl: ".prev-project-d",
          }}
          className="poster__slider"
        >
          {/* <SwiperSlide>
            <div
              className="poster__slider-single"
              style={{ maxHeight: "70vh", overflow: "hidden", borderRadius: 12 }}
            >
              <img
                src={project.thumbnail?.url}
                alt="Image"
                style={{ width: "100%", height: "100%", maxHeight: "70vh", objectFit: "contain" }}
              />
            </div>
          </SwiperSlide> */}
          <SwiperSlide>
            <div
              className="poster__slider-single"
              style={{ maxHeight: "70vh", overflow: "hidden", borderRadius: 12 }}
            >
              <img
                src={project.mainImage?.url}
                alt="Image"
                style={{ width: "100%", height: "100%", maxHeight: "70vh", objectFit: "contain" }}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="slide-group">
        <button aria-label="previous item" className="slide-btn prev-project-d">
          <i className="fa-light fa-angle-left"></i>
        </button>
        <button aria-label="next item" className="slide-btn next-project-d">
          <i className="fa-light fa-angle-right"></i>
        </button>
      </div>
    </div>
  </div>
</div>

        <div className="row gaper fade-wrapper">
          <div className="col-12 col-sm-6 col-xl-4">
            <div className="project-d-o__single fade-top">
              <div className="content">
                <h5>Sectors</h5>
                <p>{project.sector}</p>
              </div>
              <div className="thumb">
                <Image src={iconone} alt="Image"  />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-4">
            <div className="project-d-o__single fade-top">
              <div className="content">
                <h5>Owner</h5>
                <p>{project.owner?.slice(0,30)}..</p>
              </div>
              <div className="thumb">
                <Image src={icontwo} alt="Image" />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-4">
            <div className="project-d-o__single fade-top">
              <div className="content">
                <h5>Project Date</h5>
                <p>
                  {new Date(project.startDate).toLocaleDateString("en")} -{" "}
                  {new Date(project.endDate).toLocaleDateString("en")}
                </p>
              </div>
              <div className="thumb">
                <Image src={iconthree} alt="Image" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="details-group text-start section__content-cta">
              <h3 className="light-title-lg">Project Description</h3>
              <p>{project.description || 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary'}</p>
              {/* <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don&apos;t look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn&apos;t anything
                embarrassing hidden in the middle of text. All the Lorem Ipsum
                generators on the Internet tend to repeat predefined chunks as
                necessary,
              </p> */}
            </div>
          </div>
        </div>
        {project.testimonial.map((test: any) => (
          <div className="row">
            <div className="col-12">
              <div className="quote-pj">
                <div className="cont">
                  <div className="quote">
                    <i className="fa-solid fa-quote-right"></i>
                  </div>
                  <blockquote className="secondary-text">
                    {test.quote ||
                      "And the day came when the risk to remain tight in a bud wasmore painful than the risk it took to blossom."}
                  </blockquote>
                </div>
                <div className="author">
                  <h4> - {test.client}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="row">
          <div className="col-12">
            <div className="details-group text-start section__content-cta">
              <h3 className="light-title-lg">The Result</h3>
              <p>{project.result || 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary' }</p>
              
            </div>
          </div>
        </div>
      </div>
      <div className="project-d__slider-w section__content-cta">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          slidesPerGroup={1}
          speed={800}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            1400: {
              slidesPerView: 4,
              centeredSlides: true,
            },
            1200: {
              slidesPerView: 4,
            },
            992: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          className="project-d__slider"
        >
          {project.snapshots.map((snap: any) => (
            <SwiperSlide>
              <div className="project-d__slider-single">
                <Image src={snap.url} height={200} width={200} alt={snap.alt} />
              </div>
            </SwiperSlide>
          ))}
          {project.snapshots.map((snap: any) => (
            <SwiperSlide>
              <div className="project-d__slider-single">
                <Image src={snap.url} height={200} width={200} alt={snap.alt} />
              </div>
            </SwiperSlide>
          ))}
          {project.snapshots.map((snap: any) => (
            <SwiperSlide>
              <div className="project-d__slider-single">
                <Image src={snap.url} height={200} width={200} alt={snap.alt} />
              </div>
            </SwiperSlide>
          ))}
          {project.snapshots.map((snap: any) => (
            <SwiperSlide>
              <div className="project-d__slider-single">
                <Image src={snap.url} height={200} width={200} alt={snap.alt} />
              </div>
            </SwiperSlide>
          ))}{project.snapshots.map((snap: any) => (
            <SwiperSlide>
              <div className="project-d__slider-single">
                <Image src={snap.url} height={200} width={200} alt={snap.alt} />
              </div>
            </SwiperSlide>
          ))}
          {project.snapshots.map((snap: any) => (
            <SwiperSlide>
              <div className="project-d__slider-single">
                <Image src={snap.url} height={200} width={200} alt={snap.alt} />
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </section>
  );
};

export default ProjectDetailsMain;
