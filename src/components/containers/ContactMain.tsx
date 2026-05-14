import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import phone from "public/images/phone.png";
import mail from "public/images/mail.png";
import location from "public/images/location.png";
import time from "public/images/time.png";
import { ConsultFormModal, StartProjectButton } from "@/components/ConsultForm";

const ContactMain = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activeForm, setActiveForm] = useState<"contact" | "hiring">("contact");
  const [selectedPosition, setSelectedPosition] = useState("");

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Project Manager",
    "Digital Marketing Specialist",
    "Mobile App Developer",
    "DevOps Engineer",
    "Other",
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xqakzkgo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsPopupVisible(true);
        form.reset();
        setSelectedPosition("");
        setTimeout(() => {
          setIsPopupVisible(false);
        }, 3000);
      } else {
        console.error("Form submission error:", response.statusText);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <section className="section contact-m fade-wrapper">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={phone} alt="Image" />
              </div>
              <div className="content">
                <h4>Chat With Us</h4>
                <p>
                  <Link
                    href="https://wa.me/97152347966"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: +971-52347966
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={mail} alt="Image" />
              </div>
              <div className="content">
                <h4>Email Us</h4>
                <p>
                  <Link href="mailto:systems@devrolin.com">systems@devrolin.com</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={location} alt="Image" />
              </div>
              <div className="content">
                <h4>Based In Dubai</h4>
                <p>
                  <Link
                    href="https://www.google.com/maps/@/data=!3m1!4b1!4m3!11m2!2s8S-NwjLkSriany36uZpzxw!4sPHrDUkM-TFI?g_ep=CAISEjI1LjA4LjAuNzI3OTM5NzI3MBgAII-pDCpsLDk0MjU1NDQ1LDk0MjQyNTYyLDk0MjIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0IyUEt3PT0%3D"
                    target="_blank"
                  >
                    Marasi Dr - Business Bay, Dubai, UAE
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={time} alt="Image" />
              </div>
              <div className="content">
                <h4>Office Hour</h4>
                <p>Availability</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="map-wrapper">
              <div className="row gaper">
                <div className="col-12 col-lg-6">
                  <div className="contact__map fade-top">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.519615447834!2d55.27165497427592!3d25.185693532168642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682d8a9468f7%3A0x5eb73dd46aa3b4f!2sMarasi%20Dr%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1740555797775!5m2!1sen!2s"
                      width="100"
                      height="800"
                      style={{ border: "0px" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="contact-form-wrapper fade-top">
                    {/* Tab Switcher */}
                    <div className="form-tab-switcher">
                      <button
                        type="button"
                        className={`tab-btn ${
                          activeForm === "contact" ? "active" : ""
                        }`}
                        onClick={() => setActiveForm("contact")}
                      >
                        <span className="tab-icon">💬</span>
                        Contact Us
                      </button>
                      <button
                        type="button"
                        className={`tab-btn ${
                          activeForm === "hiring" ? "active" : ""
                        }`}
                        onClick={() => setActiveForm("hiring")}
                      >
                        <span className="tab-icon">💼</span>
                        We're Hiring
                      </button>
                    </div>

                    {/* Contact Form */}
                    {activeForm === "contact" && (
                      <div className="form-container">
                        <h3 className="form-title">
                          Let’s Engineer Your Growth Infrastructure
                        </h3>
                        <p className="form-subtitle">
                          We review your operations, identify bottlenecks, and design scalable AI, CRM, SaaS, automation, and custom platform systems built to reduce manual work and improve operational speed.”{" "}
                        </p>
                        <div>
                          <ConsultFormModal
                            onClose={() => setActiveForm("contact")}
                          />
                        </div>
                      </div>
                    )}

                    {/* Hiring Form */}
                    {activeForm === "hiring" && (
                      <div className="form-container hiring-form">
                        <h3 className="form-title">Join Our Team</h3>
                        <p className="form-subtitle">
                          Ready to make an impact? Apply now!
                        </p>

                        <form
                          onSubmit={handleSubmit}
                          className="hiring-application-form"
                        >
                          <input
                            type="hidden"
                            name="form_type"
                            value="hiring"
                          />

                          <div className="form-group">
                            <label htmlFor="full_name">Full Name *</label>
                            <input
                              type="text"
                              id="full_name"
                              name="full_name"
                              required
                              placeholder="John Doe"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              placeholder="johndoe@example.com"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="phone">Phone Number *</label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              placeholder="+971 50 123 4567"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="position">
                              Position Applying For *
                            </label>
                            <select
                              id="position"
                              name="position"
                              required
                              value={selectedPosition}
                              onChange={(e) =>
                                setSelectedPosition(e.target.value)
                              }
                            >
                              <option value="">Select a position</option>
                              {positions.map((pos) => (
                                <option key={pos} value={pos}>
                                  {pos}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label htmlFor="experience">
                              Years of Experience *
                            </label>
                            <input
                              type="number"
                              id="experience"
                              name="experience"
                              required
                              min="0"
                              placeholder="3"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="portfolio">
                              Portfolio/LinkedIn URL
                            </label>
                            <input
                              type="url"
                              id="portfolio"
                              name="portfolio"
                              placeholder="https://linkedin.com/in/yourprofile"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="resume">
                              Upload Resume (PDF) *
                            </label>
                            <input
                              type="file"
                              id="resume"
                              name="resume"
                              accept=".pdf,.doc,.docx"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="cover_letter">Cover Letter</label>
                            <textarea
                              id="cover_letter"
                              name="cover_letter"
                              rows={5}
                              placeholder="Tell us why you'd be a great fit..."
                            ></textarea>
                          </div>

                          <button type="submit" className="submit-btn">
                            Submit Application
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Popup */}
        {isPopupVisible && (
          <div className="popup-message">
            {activeForm === "contact"
              ? "✅ Message sent successfully!"
              : "✅ Application submitted successfully! We'll get back to you soon."}
          </div>
        )}
      </div>

      <style jsx>{`
        .popup-message {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #4caf50;
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          z-index: 1001;
          animation: fadeInOut 3s ease-in-out;
          font-weight: 500;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          10%,
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
};

export default ContactMain;
