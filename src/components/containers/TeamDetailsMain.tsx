import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const TeamDetailsMain = ({ member }: { member: any }) => {
  return (
    <section className="section pb-0 team-det fade-wrapper">
      <div className="container">

        {/* ── Top row: image + main info ── */}
        <div className="row gaper">

          {/* Left: Photo + LinkedIn */}
          <div className="col-12 col-lg-5 col-xxl-4">
            <div className="team-det__thumb fade-top">
              <Image
                src={member.image?.url}
                width={345}
                height={317}
                alt={member.name}
                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              />
              {member.linkedin && (
                <div className="social-alt mt-3">
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                    <span style={{ marginLeft: 8, fontSize: 14 }}>LinkedIn</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right: Name, role, what he does, description, hire me */}
          <div className="col-12 col-lg-7 col-xxl-8">
            <div className="team-det__content fade-top">

              {/* Intro row */}
              <div className="intro">
                <div className="intro-left">
                  <h4>{member.name}</h4>
                  <p>{member.jobTitle}</p>
                </div>
                <div className="intro-right">
                  <Link href="/contact-us" className="btn btn--primary">
                    Hire Me
                    <i className="fa-sharp fa-solid fa-paper-plane"></i>
                  </Link>
                </div>
              </div>

              {/* What He Does */}
              <div className="content mt-4">
                <h5>What He Does</h5>
                <p>{member.whatHeDoes}</p>
              </div>

              {/* Description */}
              <div className="content mt-3">
                <h5>About</h5>
                <p>{member.description}</p>
              </div>

            </div>
          </div>
        </div>

        {/* ── Impact Points ── */}
        {member.impact?.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <div className="team-det__info fade-top">
                <h4>Key Impact</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {member.impact.map((point: string, i: number) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        marginBottom: "12px",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "15px",
                        lineHeight: "1.6",
                      }}
                    >
                      <i
                        className="fa-light fa-circle-check"
                        style={{ color: "#e87c3e", marginTop: "3px", flexShrink: 0 }}
                      ></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── Systems Worked On ── */}
        {member.systemsWorkedOn?.length > 0 && (
          <div className="row mt-4 mb-5">
            <div className="col-12">
              <div className="team-det__info fade-top">
                <h4>Systems Worked On</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
                  {member.systemsWorkedOn.map((sys: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        padding: "7px 18px",
                        borderRadius: "100px",
                        border: "1.5px solid rgba(232,124,62,0.4)",
                        background: "rgba(232,124,62,0.08)",
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "13px",
                        fontWeight: 500,
                        letterSpacing: "0.3px",
                      }}
                    >
                      {sys}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TeamDetailsMain;