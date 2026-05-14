import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "public/images/Company-Logo-Normal-1/1.svg";
import logoLight from "public/images/logo-light.png";
import Offcanvas from "./Offcanvas";

import { useProjectModal } from "@/components/ProjectModalContext";
//  1. Import the hook at the top of your navbar file:
//
// 2. Inside the component function, add:
interface HeaderProps {
  openNav: boolean;
  setOpenNav: (value: boolean) => void;
  handleNav: () => void;
}

const HeaderTwo = ({ openNav, handleNav, setOpenNav }: HeaderProps) => {
  const { openModal } = useProjectModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const defaultClasses = "primary-navbar cmn-nav";

  const combinedClasses = `${
    scrolled ? " navbar-active" : " "
  } ${defaultClasses}`;

  let logoSrc = logo;

  const router = useRouter();
  if (router.pathname === "/index-two-light") {
    logoSrc = logoLight;
  }

  return (
    <>
      <header className="header">
        <div className={combinedClasses}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar p-0">
                  <div className="navbar__logo">
                    <Link href="/" aria-label="go to home">
                      <Image src={logoSrc} height={78} width={168} alt="Image" priority  />
                    </Link>
                  </div>
                  <div className="navbar__menu">
                    <ul>
                      {/* <li className="navbar__item navbar__item--has-children nav-fade">
                        <button
                          aria-label="dropdown menu"
                          className="navbar__dropdown-label"
                        >
                          Home
                        </button>
                        <ul className="navbar__sub-menu navbar__sub-menu--lg">
                          <li>
                            <Link href="/">Creative Agency</Link>
                          </li>
                          <li>
                            <Link href="index-light">
                              Creative Agency Light
                            </Link>
                          </li>
                          <li>
                            <Link href="index-two">Digital Agency</Link>
                          </li>
                          <li>
                            <Link href="index-two-light">
                              Digital Agency Light
                            </Link>
                          </li>
                          <li>
                            <Link href="index-three">It Solution</Link>
                          </li>
                          <li>
                            <Link href="index-three-light">
                              It Solution Light
                            </Link>
                          </li>
                          <li>
                            <Link href="index-four">Personal Portfolio</Link>
                          </li>
                          <li>
                            <Link href="index-four-light">
                              Personal Portfolio Light
                            </Link>
                          </li>
                          <li>
                            <Link href="index-five">Interactive Portfolio</Link>
                          </li>
                          <li>
                            <Link href="index-five-light">
                              Interactive Portfolio Light
                            </Link>
                          </li>
                        </ul>
                      </li> */}
                      <li className="navbar__item  nav-fade">
                        <Link href="/" className="mx-3" >HOME</Link>

                      </li>
                       <li className="navbar__item nav-fade">
                        <Link href="/about-us">ABOUT US</Link>
                      </li>
                      
                      <li className="navbar__item navbar__item--has-children nav-fade">
                        <Link
                        href={'/our-services'}
                          aria-label="dropdown menu"
                          className="mx-3"
                        >
                          SERVICES
                        </Link>
                       
                      </li>
                      <li className="navbar__item  nav-fade">
                        <Link href="/our-projects">PROJECTS</Link>


                        {/* <button
                          aria-label="dropdown menu"
                          className="navbar__dropdown-label"
                        >
                          Projects
                        </button>
                        <ul className="navbar__sub-menu">
                          <li>
                            <Link href="our-projects">Our Projects</Link>
                          </li>
                          <li>
                            <Link href="project-single">Project Details</Link>
                          </li>
                        </ul> */}
                      </li>
                      <li className="navbar__item navbar__item--has-children nav-fade">
                        <button
                          aria-label="dropdown menu"
                          className="navbar__dropdown-label"
                        >
                          Pages
                        </button>
                        <ul className="navbar__sub-menu">
                          <li>
                            <Link href="faq">FAQ</Link>
                          </li>
                          <li>
                            <Link href="our-story">Our Story</Link>
                          </li>
                          {/* <li>
                            <Link href="portfolio">Portfolio</Link>
                          </li> */}
                          <li className="navbar__item navbar__item--has-children">
                                <Link href="/our-teams" className="" >Our Teams</Link>

                            {/* <button
                              aria-label="dropdown menu"
                              className="navbar__dropdown-label navbar__dropdown-label-sub"
                            >
                              Team
                            </button>
                            <ul className="navbar__sub-menu navbar__sub-menu__nested">
                              <li>
                                <Link href="our-teams">Our Teams</Link>
                              </li>
                              <li>
                                <Link href="team-single">Team Details</Link>
                              </li>
                            </ul> */}
                          </li>
                          <li>
                            <Link href="/client-feedback">Testimonials</Link>
                          </li>
                          <li>
                            <Link href="/contact-us">Contact Us</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="navbar__item navbar__item--has-children nav-fade">
                            <Link href="/blog">BLOG</Link>

                        {/* <button
                          aria-label="dropdown menu"
                          className="navbar__dropdown-label"
                        >
                          Blog
                        </button>
                        <ul className="navbar__sub-menu">
                          <li>
                            <Link href="blog">Blog</Link>
                          </li>
                          <li>
                            <Link href="blog-single">Blog Details</Link>
                          </li>
                        </ul> */}
                      </li>
                    </ul>
                  </div>
                  <div className="navbar__options">
                    <div className="navbar__mobile-options d-none d-sm-flex">
                       {/* Changed: button instead of Link, calls openModal() */}
    <button
      type="button"
      className="btn btn--secondary"
      onClick={() => openModal()}   // no serviceName on navbar — generic message
    >
      Get Your Systems Plan
    </button>
                    </div>
                    <button
                      className="open-mobile-menu d-flex d-xl-none"
                      aria-label="toggle mobile menu"
                      onClick={handleNav}
                    >
                      <i className="fa-light fa-bars-staggered"></i>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Offcanvas openNav={openNav} setOpenNav={setOpenNav} />
    </>
  );
};

export default HeaderTwo;
