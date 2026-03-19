import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import phone from "public/images/phone.png";
import mail from "public/images/mail.png";
import location from "public/images/location.png";
import time from "public/images/time.png";
import { StartProjectButton } from "@/components/ConsultForm";
import { ConsultFormModal} from "@/components/ConsultForm"

const ContactMain = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
        setTimeout(() => {
          setIsPopupVisible(false);
        }, 3000); // Hide the popup after 3 seconds
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
              {/* <StartProjectButton label="Work With Us" />             */}

        <div className="row gaper">

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <Image src={phone} alt="Image" />
              </div>
              <div className="content">
                <h4>Whatsapp</h4>
                <p>
                  <Link href="tel:197-90-56-780">Mobile : +971-52347966</Link>
                </p>
                <p>
                  <Link href="tel:197-90-56-780">Fax : +44-208-1234567</Link>
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
                <h4>Mail Address</h4>
                <p>
                  <Link href="mailto:info@devrolin.com">
                    info@devrolin.com
                  </Link>
                </p>
                <p>
                  <Link href="mailto:info.company@gmail.com">
                    Info.company@yahoo.com
                  </Link>
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
                <h4>Our Location</h4>
                <p>
                  <Link
                    href="https://www.google.com/maps/@/data=!3m1!4b1!4m3!11m2!2s8S-NwjLkSriany36uZpzxw!4sPHrDUkM-TFI?g_ep=CAISEjI1LjA4LjAuNzI3OTM5NzI3MBgAII-pDCpsLDk0MjU1NDQ1LDk0MjQyNTYyLDk0MjI0ODI1LDk0MjI3MjQ3LDk0MjI3MjQ4LDQ3MDcxNzA0LDQ3MDY5NTA4LDk0MjE4NjQxLDk0MjAzMDE5LDQ3MDg0MzA0LDk0MjA4NDU4LDk0MjA4NDQ3QgJQSw%3D%3D"
                    target="_blank"
                  >
                     Marasi Dr - Business Bay - Dubai - United Arab Emirates
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
                <p>Sun - Thu 09 am - 06pm</p>
                <p>Fri - Sat 4 pm - 10pm</p>
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
                  <ConsultFormModal/>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .popup-message {
          position: relative;
          top: 20px;
          right: 20px;
          background-color: #4caf50;
          color: white;
          padding: 15px;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          z-index: 1001;
          animation: fadeInOut 3s ease-in-out;
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
