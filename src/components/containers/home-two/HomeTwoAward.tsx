import React from "react";
import Image from "next/image";
import Link from "next/link";
import awardthumb from "public/images/award-thumb.png";
import star from "public/images/star.png";
import dotlarge from "public/images/agency/dot-large.png";

const HomeTwoAward = () => {
  return (
    <section className="section award">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-6">
            <div className="award__thumb dir-rtl">
              <Image src='/our-story-hero.png'
              width={800} height={500} alt="Image" className="unset fade-left" />
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xxl-5 offset-xxl-1">
            <div className="award__content section__content">
              <span className="sub-title">
                OUR JOURNEY
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                How We Turn Ideas Into <span>Revenue</span> Sytems
              </h2>
              <div className="paragraph">
                <p>
                 We started with a simple focus building systems that solve real business problems.
Today, we design AI, SaaS, and CRM systems that automate operations, integrate workflows, and drive scalable growth for teams worldwide.


                </p>
              </div>
              <div className="award__content-meta">
                <div className="single">
                  <h4>2021</h4>
                  <h4>Foundation</h4>
                  <p>Started building custom web platforms and automation systems for early-stage clients.
</p>
                </div>
                <div className="single">
                  <h4>2023</h4>
                  <h4>System Expansion</h4>
                  <p>
Expanded into AI automation, CRM systems, and deep integrations across business tools.</p>
                </div>
                <div className="single">
                  <h4>2025</h4>
                  <h4>Scaling Globally</h4>
                  <p>Delivering AI-driven systems used by teams across multiple industries and countries.
</p>
                </div>
              </div>
              <div className="section__content-cta">
                <Link href="about-us" className="btn btn--primary">
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={star} alt="Image" className="star" />
      <Image src={star} alt="Image" className="star-two" />
      <Image src={dotlarge} alt="Image" className="dot" />
      <Image src={dotlarge} alt="Image" className="dot-two" />
    </section>
  );
};

export default HomeTwoAward;
