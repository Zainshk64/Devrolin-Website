import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/Company-Logo-Normal-1/1.svg";
import whatsapp from "public/images/Company-Logo-Normal-1/Whatsapp-Logo.svg";
import dubaiFlag from "public/images/Company-Logo-Normal-1/UAE-Logo.webp";
import Email from "public/images/Company-Logo-Normal-1/Email-Logo.svg";
import gsap from "gsap";
import chroma from "chroma-js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const FooterFive = () => {
  const currentYear = new Date().getFullYear();

  const animatedTextRef = useRef<any>(null);
  const [animatedTextContent, setAnimatedTextContent] = useState("");

  useEffect(() => {
    const animatedChars = document.querySelectorAll(".animated-char");

    if (animatedChars.length > 0) {
      const folksBD = gsap.timeline({
        repeat: -1,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".animated-text",
          start: "bottom 100%-=50px",
        },
      });

      const folksGradient = chroma.scale(["#ff7425", "#ffffff"]);

      animatedChars.forEach((charElement, index) => {
        const delay = index * 0.04;

        folksBD.to(
          charElement,
          {
            duration: 0.5,
            scaleY: 0.6,
            ease: "power3.out",
            transformOrigin: "center bottom",
          },
          delay
        );

        folksBD.to(
          charElement,
          {
            yPercent: -20,
            ease: "elastic",
            duration: 0.8,
          },
          delay + 0.5
        );

        folksBD.to(
          charElement,
          {
            scaleY: 1,
            ease: "elastic.out(2.5, 0.2)",
            duration: 1.5,
          },
          delay + 0.5
        );

        folksBD.to(
          charElement,
          {
            color: () => {
              return folksGradient(index / animatedChars.length).hex();
            },
            ease: "power2.out",
            duration: 0.3,
          },
          delay + 0.5
        );

        folksBD.to(
          charElement,
          {
            yPercent: 0,
            ease: "back",
            duration: 0.8,
          },
          delay + 0.7
        );

        folksBD.to(
          charElement,
          {
            color: "#ffffff",
            duration: 1.4,
          },
          delay + 0.9
        );
      });
    }
  }, [animatedTextContent]);

  useEffect(() => {
    const animatedText = animatedTextRef.current;
    const textContent = animatedTextRef.current?.textContent;
    if (textContent) {
      setAnimatedTextContent(textContent);
      animatedText.innerHTML = "";
    }
  }, []);
  const EMAIL = "systems@devrolin.com"

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=Project%20Inquiry`;
  
  return (
    <footer className="footer-two footer-cmn section pb-0">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-lg-5 col-xl-4">
            <div className="footer-two__left">
              <div className="logo">
                <Link href="/">
                  <Image src={logo} priority alt="Image" />
                </Link>
              </div>
              <div className="paragraph">
                <p>
Dubai-based firm building AI, SaaS and CRM systems that turn your business into a revenue machine without hiring more people.                </p>
              </div>
              <div className="section__content-cta">
                <h2>
                  <Link
                    href={gmailLink}
                    className="folks-text animated-text"
                    ref={animatedTextRef}
                  >
                    systems@devrolin.com
                    {animatedTextContent.split("").map((char, index) => (
                      <span
                        aria-hidden="true"
                        className="animated-char"
                        key={index}
                      >
                        {char}
                      </span>
                    ))}
                  </Link>
                </h2>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7 col-xl-7 offset-xl-1 col-xxl-5 offset-xxl-3">
            <div className="footer-two__right">
              <div className="social justify-content-start justify-content-lg-start">
                <Link href="https://www.linkedin.com/company/devrolin/about/" target="_blank">
                  <i className="fa-brands fa-linkedin-in"></i>
                  <span>Linkedin</span>
                </Link>
                <Link href="https://www.instagram.com/devrolin.x?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                  <i className="fa-brands fa-instagram"></i>
                  <span>Instagram</span>
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=61561865430556" target="_blank">
                  <i className="fa-brands fa-facebook-f"></i>
                  <span>Facebook</span>
                </Link>
                
               
              </div>
              <div className="footer__single-meta section__content-cta">
              <div className="footer__single-meta">
                <Link
                  href="https://www.google.com/maps/d/viewer?mid=1UZ57Drfs3SGrTgh6mrYjQktu6uY&hl=en_US&ll=18.672105000000013%2C105.68673800000003&z=17"
                  target="_blank"
               style={{display:"flex", alignItems:"center", gap:'13px'}}
               >
                   <Image src={dubaiFlag} width={45} height={20} alt="Dubai Flag" />
                 Marasi Dr - Business Bay - Dubai - UAE
                </Link>
                <Link href="https://wa.me/devrolin"  style={{display:"flex", alignItems:"center", gap:'10px'}}>
                <Image src={whatsapp} width={45} height={20} alt="Dubai Flag" />
                 +971-52347966
                </Link>
                <Link href={gmailLink}  style={{display:"flex", alignItems:"center", gap:'13px'}}>
                <Image src={Email} width={35} height={10} alt="Email Logo" />
                  systems@devrolin.com
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__copyright">
        <div className="container">
          <div className="row align-items-center gaper">
            <div className="col-12 col-xl-6">
              <div className="footer__copyright-text text-center text-xl-start">
                <p>
                  Copyright &copy;
                  <span id="copyYear">2026</span> DevRolin.{" "}All Rights Reserved
                </p>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <ul className="justify-content-center justify-content-xl-end">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="about-us">About</Link>
                </li>
                <li>
                  <Link href="our-services">Services</Link>
                </li>
                <li>
                  <Link href="blog">Blog</Link>
                </li>
                <li>
                  <Link href="contact-us">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFive;
