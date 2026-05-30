import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/Company-Logo-Normal-1/1.svg";
import dubaiFlag from "public/images/Company-Logo-Normal-1/UAE-Logo.webp";
import Email from "public/images/Company-Logo-Normal-1/Email-Logo.svg";
import malaysiaFlag from "public/images/Company-Logo-Normal-1/Malysia-Logo.svg";
import whatsapp from "public/images/Company-Logo-Normal-1/Whatsapp-Logo.svg";
import ukFlag from "public/images/Company-Logo-Normal-1/Uk-Logo.webp";
import pakistanFlag from "public/images/Company-Logo-Normal-1/Pakistan-Logo.webp";

const Footer = () => {

  const EMAIL = "systems@devrolin.com"
  const mailtoLink = `mailto:${EMAIL}?subject=Project%20Inquiry&body=Hello%20Devrolin%20Team%2C%0D%0A%0D%0AI%20am%20interested%20in%20discussing%20a%20potential%20project.%20Please%20let%20me%20know%20a%20convenient%20time%20for%20a%20call.%0D%0A%0D%0AThank%20you.%0D%0A`;
  return (
    <footer
      className="footer section pb-0"
      style={{ backgroundImage: "url('/images/footer/footer-bg.png')" }}
    >
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-lg-5 col-xl-6">
            <div className="footer__single">
              <Link href="/" className="logo">
                <Image src={logo} height={78} width={168} alt="Image" priority />
              </Link>
              <div className="footer__single-meta">
                <Link
                  href="https://www.google.com/maps/d/viewer?mid=1UZ57Drfs3SGrTgh6mrYjQktu6uY&hl=en_US&ll=18.672105000000013%2C105.68673800000003&z=17"
                  target="_blank"
               style={{display:"flex", alignItems:"center", gap:'13px'}}
               >
                   <Image src={dubaiFlag} width={45} height={20} alt="Dubai Flag" />
                 Marasi Dr - Business Bay - Dubai - UAE
                </Link>
                <Link href="tel:406-555-0120"  style={{display:"flex", alignItems:"center", gap:'10px'}}>
                <Image src={whatsapp} width={45} height={20} alt="Dubai Flag" />
                 +971-52347966
                </Link>
                <Link href={mailtoLink} style={{display:"flex", alignItems:"center", gap:'13px'}}>
                <Image src={Email} width={35} height={10} alt="Email Logo" />
                  systems@devrolin.com
                </Link>
              </div>
              <div className="footer__cta text-start">
                <Link href="contact-us" className="btn btn--secondary">
                  book a call now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 col-xl-2">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>discover</h5>
              </div>
              <div className="footer__single-content">
                <ul>
                  <li>
                    <Link href="about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="client-feedback">Award Winning</Link>
                  </li>
                  <li>
                    <Link href="blog">News & Blog</Link>
                  </li>
                  <li>
                    <Link href="contact-us">careers</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-xl-4">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>Subscribe our newsletter</h5>
              </div>
              <div className="footer__single-content">
                <p>
Dubai-based firm building AI, SaaS and CRM systems that turn your business into a revenue machine without hiring more people.                </p>
                <div className="footer__single-form">
                  <form action="#" method="post">
                    <div className="input-email">
                      <input
                        type="email"
                        name="subscribe-news"
                        id="subscribeNews"
                        placeholder="Enter Your Email"
                        required
                      />
                      <button type="submit" className="subscribe">
                        <i className="fa-sharp fa-solid fa-paper-plane"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row gaper">
          <div className="col-12 col-lg-6">
            <div className="footer__single" style={{display:"flex", flexDirection:"column", alignItems:"start", gap:'10px'}}>
              <h5 style={{ paddingTop:'30px'}}>Global Development Location</h5>
              <p>
                <Image src={dubaiFlag} width={35} height={20} alt="Dubai Flag" />
                &nbsp; Marasi Dr - Business Bay - Dubai - UAE
              </p>
              <p>
              <Image src={whatsapp} width={45} height={15} alt="Dubai Flag" />
                &nbsp; +971-52347966
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="footer__single" style={{display:"flex", flexDirection:"column", alignItems:"start", gap:'10px'}}>
              <h5 style={{paddingTop:"30px"}}>Regional Locations</h5>             
              <p>
                <Image src={ukFlag} width={35} height={20} alt="UK Flag" />
                &nbsp;  Universal Square, Manchester, United Kingdom
              </p>
              <p>
                <Image src={pakistanFlag} width={35} height={20} alt="Pakistan Flag" />
                &nbsp; Islamabad, Pakistan
              </p>
              <p>
                <Image src={malaysiaFlag} width={35} height={20} alt="Malaysia Flag" />
                &nbsp; Kuala lumpur, Malaysia
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer__copyright">
              <div className="row align-items-center gaper">
                <div className="col-12 col-lg-8">
                  <div className="footer__copyright-text text-center text-lg-start">
                    <p>
                      Copyright &copy;
                      <span id="copyYear">2026</span> DevRolin. All Rights Reserved
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="social justify-content-center justify-content-lg-end">
                    {/* <Link href="https://www.twitter.com/" target="_blank">
                      <i className="fa-brands fa-twitter"></i>
                      </Link> */}
                    <Link href="https://www.linkedin.com/company/devrolin/about/" target="_blank">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                    <Link href="https://www.instagram.com/devrolin.x?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                      <Link href="https://www.facebook.com/profile.php?id=61561865430556" target="_blank">
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
