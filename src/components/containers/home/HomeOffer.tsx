import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import blogthumb from "public/images/offer/blog-thumb.png";
import two from "public/images/offer/two.png";
import three from "public/images/offer/three.png";
import four from "public/images/offer/four.png";
import star from "public/images/offer/star.png";
import { toast } from "react-hot-toast";

const HomeOffer = () => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const caseStudyItems = document.querySelectorAll(".offer__cta-single");
      const deviceWidth = window.innerWidth;

      if (deviceWidth > 576) {
        caseStudyItems.forEach((item) => {
          const contentBox = item.getBoundingClientRect();
          const dx = event.clientX - contentBox.x;
          const dy = event.clientY - contentBox.y;
          const thirdChild = item.children[2] as HTMLElement;
          thirdChild.style.transform = `translate(${dx}px, ${dy}px) rotate(10deg)`;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [ourService, setOurServices] = useState<any[]>([]);

  const fetchService = async () => {
    try {
      const recent = await fetch("https://devrolin-backend-production.up.railway.app/api/services").then(
        (res) => res.json(),
      );
      setOurServices(recent.services);
    } catch (err) {
      toast.error("Error fetching Services");
    }
  };
  useEffect(() => {
    fetchService();
  }, []);

  return (
    <section className="section offer fade-wrapper light">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-lg-5">
            <div className="offer__content section__content">
              <span className="sub-title">
                WHAT WE OFFER
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                Solutions That Scale Your Business
              </h2>
              <div className="paragraph">
                <p>
                  We design AI, SaaS, and CRM systems with deep integrations across your tools to automate operations, remove bottlenecks, and create predictable growth.
                </p>
              </div>
              <div className="section__content-cta">
                <Link href="our-services" className="btn btn--secondary">
                  view all systems
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7 col-xl-6 offset-xl-1">
            <div className="offer__cta">
              {/* <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  01
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="service-single">
                    Web
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={blogthumb} alt="Image" />
                </div>
              </div>

              <div className="offer__cta-single fade-top">
                <span className="sub-title">
                  02
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="service-single">
                    Web development
                    <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                  </Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={two} alt="Image" />
                </div>
              </div> */}
              {ourService.map((service) => (
                <>
                  <div className="offer__cta-single fade-top">
                    <span className="sub-title">
                      {service.length}
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                    <h2>
                      <Link href={`/service-single/${service._id}`}>
                        {service.title}
                        <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                      </Link>
                    </h2>
                    <div className="offer-thumb-hover d-none d-md-block">
                      <Image
                        src={service.mainImage.url}
                        width={500}
                        height={500}
                        alt="Image"
                      />
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Image src={star} alt="Image" className="star" />
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

export default HomeOffer;
