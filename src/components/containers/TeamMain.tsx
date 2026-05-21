import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import one from "public/images/teams/one.png";
import two from "public/images/teams/two.png";
import three from "public/images/teams/three.png";
import four from "public/images/teams/four.png";
import five from "public/images/teams/five.png";
import six from "public/images/teams/six.png";
import { toast } from "react-hot-toast";

const TeamMain = () => {
  const [members, setMembers] = useState<any[]>([]);

  const fetchMembers = async () => {
    try {
      const res = await fetch("https://devrolin-backend-production.up.railway.app/api/members/");
      const data = await res.json();
      setMembers(data.members || []);
      // console.log(data.members);
    } catch (err) {
      toast.error("Error fetching members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <section className="section team-m fade-wrapper">
      <div className="container">
        <div className="row gaper">
          {members.map((member) => (
            <div className="col-12 col-md-6 col-xl-4">
              <div className="team-m__single fade-top">
                <div className="thumb">
                  <Link href={`/team-single/${member.name}`}>
                    <img
                      src={member.image?.url}
                      alt={member.image?.alt || "Profile"}
                      className="rounded"
                    />
                  </Link>
                  <div className="thumb__content">
                    <div className="info">
                      <p>{member.aboutMe}</p>
                    </div>
                    <h4>
                      <Link href="team-single">{member.name}</Link>
                    </h4>
                    <p>{member.jobTitle}</p>
                    <div className="social-alt">
                      {member.socials.map((social: any, i: number) => (
                        <div className="">
                          <Link
                            href={social.url}
                            target="_blank"
                            aria-label="share us on facebook"
                            className=""
                          >
                            {/* <i className="fa-brands fa-facebook-f"></i> */}
                            <p className="text-capitalize">{social.social}</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!members.length && (
            <p className="text-white text-center mt-4">
              No team members found.
            </p>
          )}

          {/* <div className="col-12 col-md-6 col-xl-4">
            <div className="team-m__single fade-top">
              <div className="thumb">
                <Link href="team-single">
                  <Image src={two} alt="Image" />
                </Link>
                <div
                  className="thumb__content"
                  style={{ backgroundImage: "url('/images/teams/bg.png')" }}
                >
                  <div className="info">
                    <p>
                      “Lorem ipsum dolor sit amet consectetur adipiscing elit
                    </p>
                  </div>
                  <h4>
                    <Link href="team-single">Sana p. Lesh</Link>
                  </h4>
                  <p>Senior engineer</p>
                  <div className="social-alt">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61561865430556"
                      target="_blank"
                      aria-label="share us on facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link
                      href="https://www.twitter.com/"
                      target="_blank"
                      aria-label="share us on twitter"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                    <Link
                      href="https://www.pinterest.com/"
                      target="_blank"
                      aria-label="share us on pinterest"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="team-m__single fade-top">
              <div className="thumb">
                <Link href="team-single">
                  <Image src={three} alt="Image" />
                </Link>
                <div
                  className="thumb__content"
                  style={{ backgroundImage: "url('/images/teams/bg.png')" }}
                >
                  <div className="info">
                    <p>
                      “Lorem ipsum dolor sit amet consectetur adipiscing elit
                    </p>
                  </div>
                  <h4>
                    <Link href="team-single">Sana p. Lesh</Link>
                  </h4>
                  <p>Senior engineer</p>
                  <div className="social-alt">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61561865430556"
                      target="_blank"
                      aria-label="share us on facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link
                      href="https://www.twitter.com/"
                      target="_blank"
                      aria-label="share us on twitter"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                    <Link
                      href="https://www.pinterest.com/"
                      target="_blank"
                      aria-label="share us on pinterest"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="team-m__single fade-top">
              <div className="thumb">
                <Link href="team-single">
                  <Image src={four} alt="Image" />
                </Link>
                <div
                  className="thumb__content"
                  style={{ backgroundImage: "url('/images/teams/bg.png')" }}
                >
                  <div className="info">
                    <p>
                      “Lorem ipsum dolor sit amet consectetur adipiscing elit
                    </p>
                  </div>
                  <h4>
                    <Link href="team-single">Sana p. Lesh</Link>
                  </h4>
                  <p>Senior engineer</p>
                  <div className="social-alt">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61561865430556"
                      target="_blank"
                      aria-label="share us on facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link
                      href="https://www.twitter.com/"
                      target="_blank"
                      aria-label="share us on twitter"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                    <Link
                      href="https://www.pinterest.com/"
                      target="_blank"
                      aria-label="share us on pinterest"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="team-m__single fade-top">
              <div className="thumb">
                <Link href="team-single">
                  <Image src={five} alt="Image" />
                </Link>
                <div
                  className="thumb__content"
                  style={{ backgroundImage: "url('/images/teams/bg.png')" }}
                >
                  <div className="info">
                    <p>
                      “Lorem ipsum dolor sit amet consectetur adipiscing elit
                    </p>
                  </div>
                  <h4>
                    <Link href="team-single">Sana p. Lesh</Link>
                  </h4>
                  <p>Senior engineer</p>
                  <div className="social-alt">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61561865430556"
                      target="_blank"
                      aria-label="share us on facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link
                      href="https://www.twitter.com/"
                      target="_blank"
                      aria-label="share us on twitter"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                    <Link
                      href="https://www.pinterest.com/"
                      target="_blank"
                      aria-label="share us on pinterest"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="team-m__single fade-top">
              <div className="thumb">
                <Link href="team-single">
                  <Image src={six} alt="Image" />
                </Link>
                <div
                  className="thumb__content"
                  style={{ backgroundImage: "url('/images/teams/bg.png')" }}
                >
                  <div className="info">
                    <p>
                      “Lorem ipsum dolor sit amet consectetur adipiscing elit
                    </p>
                  </div>
                  <h4>
                    <Link href="team-single">Sana p. Lesh</Link>
                  </h4>
                  <p>Senior engineer</p>
                  <div className="social-alt">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61561865430556"
                      target="_blank"
                      aria-label="share us on facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link
                      href="https://www.twitter.com/"
                      target="_blank"
                      aria-label="share us on twitter"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                    <Link
                      href="https://www.pinterest.com/"
                      target="_blank"
                      aria-label="share us on pinterest"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="section__content-cta text-center">
              <button className="btn btn--secondary">Load More..</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMain;
