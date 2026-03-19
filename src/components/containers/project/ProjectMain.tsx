import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const ProjectMain = ({ projects }: { projects: any }) => {
  const slider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ele = slider.current;

    if (window.innerWidth >= 992 && ele) {
      gsap.registerPlugin(ScrollTrigger);

      const rightSections = gsap.utils.toArray(".project-sl__single");

      const pin = gsap.to(rightSections, {
        xPercent: -100 * (rightSections.length - 3),
        ease: "none",
        scrollTrigger: {
          trigger: ele,
          pin: true,
          invalidateOnRefresh: true,
          start: "center center-=100",
          scrub: 1,
          end: () => "+=" + (slider.current?.offsetWidth || 0),
          markers: false,
        },
      });

      return () => {
        pin.kill();
      };
    }
  }, []);

  return (
    <section className="section project-sl" style={{marginTop: '270px'}} ref={slider}>
      {/* {projects.length > 0 ? ( */}
      

      {projects.map((project: any) => (
        <div key={project._id} className="project-sl__single">
          <div className="thumb">
            <Link href={`/project-single/${project._id}`}>
              <img
                src={project.thumbnail?.url}
                className="card-img-top img-fluid"
                alt={project.thumbnail?.alt || "project"}
                style={{objectFit: "cover" }}
              />
            </Link>
          </div>
          <div className="content">
            <h2>
              <Link href={`/project-single/${project._id}`}>
                {project.title}
              </Link>
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectMain;
