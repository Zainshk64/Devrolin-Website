import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { toast } from "react-hot-toast";

const TeamMembers = () => {
  const [members, setMembers] = useState<any[]>([]);

  const fetchMembers = async () => {
    try {
      const res = await fetch(
        "https://devrolin-backend-production.up.railway.app/api/members/"
      );
      const data = await res.json();
      setMembers(data.members || []);
    } catch {
      toast.error("Error fetching members");
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  return (
    <section className="section team-slider-s">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__header--secondary">
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="section__header text-center text-lg-start mb-0">
                    <span className="sub-title">
                      our awesome crew
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                    <h2 className="title title-anim">
                      The People responsible for building your systems
                    </h2>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="text-center text-lg-end">
                    <Link href="our-teams" className="btn btn--primary text-capitalize">
                      view all teams
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-r position-relative">
        <div className="team-s__slider-w">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            slidesPerGroup={1}
            speed={800}
            loop={true}
            centeredSlides={false}
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ nextEl: ".next-team-s", prevEl: ".prev-team-s" }}
            className="team-s__slider"
            breakpoints={{
              768: { slidesPerView: 3, centeredSlides: true },
              576: { slidesPerView: 2 },
            }}
          >
            {members.length > 0 ? (
              members.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="team-s__slider-single">
                    <div className="team-wrap">

                      {/* ── Thumbnail with hover overlay ── */}
                      <div className="thumb">
                        <Link href={`/team-single/${item._id}`}>
                          <img src={item.image?.url} width={400} alt={item.name} />
                        </Link>
                        <div
                          className="thumb__content"
                          style={{ backgroundImage: "url('/images/teams/bg.png')" }}
                        >
                          <div className="info">
                            <p>{item.whatHeDoes}</p>
                          </div>
                          <h4>
                            <Link href={`/team-single/${item._id}`}>{item.name}</Link>
                          </h4>
                          <p>{item.jobTitle}</p>
                          <div className="social-alt">
                            {item.linkedin && (
                              <Link href={item.linkedin} target="_blank" aria-label="LinkedIn">
                                <i className="fa-brands fa-linkedin-in"></i>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ── Card content ── */}
                      <div className="content">
                        <div className="intro">
                          <h5>
                            <Link href={`/team-single/${item._id}`}>{item.name}</Link>
                          </h5>
                          <p>{item.jobTitle}</p>
                        </div>
                        <hr />
                        <div className="inner">
                          <p>{item.description}</p>

                          {/* Impact points as tag pills */}
                          {item.impact?.length > 0 && (
                            <div className="impact-tags mt-3">
                              {item.impact.map((point: string, i: number) => (
                                <span key={i} className="impact-tag">
                                  {point}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Systems worked on */}
                          {item.systemsWorkedOn?.length > 0 && (
                            <div className="systems-wrap mt-3">
                              <p className="systems-label">Systems:</p>
                              <p className="systems-list">
                                {item.systemsWorkedOn.join(" · ")}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* LinkedIn social */}
                        {item.linkedin && (
                          <div className="social mt-4">
                            <Link
                              href={item.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white socialin"
                              title="LinkedIn"
                            >
                              <i className="fa-brands fa-linkedin-in"></i>
                            </Link>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-white text-center mt-4">No team members found.</p>
            )}
          </Swiper>
        </div>

        <div className="slide-group">
          <button aria-label="previous item" className="slide-btn prev-team-s">
            <i className="fa-light fa-angle-left"></i>
          </button>
          <button aria-label="next item" className="slide-btn next-team-s">
            <i className="fa-light fa-angle-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;