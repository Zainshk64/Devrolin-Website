import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import thumbone from "public/images/agency/thumb-one.png";
import star from "public/images/star.png";
import dotlarge from "public/images/agency/dot-large.png";
import { agencySkillAPI, type AgencySkill } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

function SkillBarRow({ title, percent }: { title: string; percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  const pctStr = `${clamped}%`;
  return (
    <div className="skill-bar-single">
      <div className="skill-bar-title">
        <p className="primary-text">{title}</p>
      </div>
      <div className="skill-bar-wrapper" data-percent={pctStr}>
        <div className="skill-bar">
          <div className="skill-bar-percent">
            <span className="percent-value"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

const Agency = () => {
  const [openService, setOpenService] = useState(false);
  const [skills, setSkills] = useState<AgencySkill[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await agencySkillAPI.getAll();
        if (!cancelled && Array.isArray(data)) {
          setSkills(data);
        }
      } catch {
        if (!cancelled) setSkills([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (skills.length === 0) return;

    const section = document.querySelector(".agency");
    if (!section) return;

    const ctx = gsap.context(() => {
      const percentElements = section.querySelectorAll("[data-percent]");

      percentElements.forEach((el) => {
        const skillBarPercent = el.querySelector(
          ".skill-bar-percent",
        ) as HTMLElement | null;
        const percentValue = el.parentNode?.querySelector(
          ".percent-value",
        ) as HTMLElement | null;

        if (skillBarPercent && percentValue) {
          const percent = el.getAttribute("data-percent") || "0%";
          skillBarPercent.style.width = percent;
          percentValue.textContent = percent;
        }
      });

      const axProgressBar = section.querySelectorAll(".skill-bar-single");
      axProgressBar.forEach((element) => {
        const skillBarPercent = element.querySelector(
          ".skill-bar-percent",
        ) as HTMLElement | null;
        const percentValue = element.querySelector(
          ".percent-value",
        ) as HTMLElement | null;

        if (skillBarPercent && percentValue) {
          const target = percentValue.textContent || "0%";

          const axBarTimeline = gsap.timeline({
            defaults: {
              duration: 2,
            },
            scrollTrigger: {
              trigger: element,
            },
          });

          axBarTimeline.fromTo(
            skillBarPercent,
            {
              width: 0,
            },
            {
              width: target,
            },
          );

          axBarTimeline.from(
            percentValue,
            {
              textContent: "0%",
              snap: {
                textContent: 5,
              },
            },
            "<",
          );
        }
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [skills, openService]);

  const primarySkills = skills.slice(0, 3);
  const extraSkills = skills.slice(3);
  const hasMore = extraSkills.length > 0;

  return (
    <section className="section agency">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-6">
            <div className="agency__thumb">
              <Image
                src={thumbone}
                alt="Image"
                className="thumb-one fade-left"
                priority
              />
              <Image
                src="https://res.cloudinary.com/daljxhxzf/image/upload/v1760507566/banner3_ejcjqq.jpg"
                height={400}
                width={400}
                alt="Image"
                className="thumb-two fade-right"
                priority
              />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="agency__content section__content">
              <span className="sub-title">
                WELCOME
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                We are premier software company in Dubai
              </h2>
              <div className="paragraph">
                <p>
                  Bring to the table win-win survival strategies to ensure
                  Game-Changing strategies leading brands toward a smarter,
                  Intelligent Transformation.
                </p>
              </div>
              <div className="skill-wrap">
                {primarySkills.map((s) => (
                  <SkillBarRow
                    key={s._id}
                    title={s.title}
                    percent={s.percent}
                  />
                ))}
              </div>

              {hasMore && (
                <div
                  className={`skill-wrap ${
                    openService ? "visually-visible" : "visually-hidden"
                  }`}
                >
                  {extraSkills.map((s) => (
                    <SkillBarRow
                      key={s._id}
                      title={s.title}
                      percent={s.percent}
                    />
                  ))}
                </div>
              )}

              {hasMore && (
                <div className="section__content-cta">
                  <button
                    onClick={() => setOpenService(!openService)}
                    className="btn btn--primary"
                  >
                    {openService ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Image src={star} alt="Image" className="star" priority />
      <Image src={dotlarge} alt="Image" className="dot-large" priority />
    </section>
  );
};

export default Agency;
