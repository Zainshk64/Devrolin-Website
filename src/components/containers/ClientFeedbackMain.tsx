import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatar from "public/images/testimonial/avatar.png";
import { toast } from "react-hot-toast";

const ClientFeedbackMain = () => {
    const [testimonials, setTestimonials] = useState<any[]>([]);
  
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/testimonials/");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        toast.error("Failed to fetch testimonials");
      }
    };
  
    useEffect(() => {
      fetchTestimonials();
    }, []);
  return (
    <section className="section feedback-s fade-wrapper">
      <div className="container">
              
        <div className="row gaper">
              {testimonials.length > 0 ? (
              testimonials.map((item) => (
          <div className="col-12 col-md-6 col-xl-4">
            <div className="feedback-s__single topy-tilt fade-top">
              <div className="content">
                <div className="quote">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
                <p>
                 {item.feedback}
                </p>
              </div>
              <hr />
              <div className="author">
                <div className="thumb">
                  <img src={item.image?.url} alt="Image" />
                </div>
                <div className="author-meta">
                  <h5>{item.name}</h5>
                  <p>{item.job}</p>
                </div>
              </div>
            </div>
          </div>
             ))
            ) : (
              <p className="text-white text-center mt-4">No testimonials found.</p>
            )}
          {/* <div className="col-12 col-md-6 col-xl-4">
            <div className="feedback-s__single topy-tilt fade-top">
              <div className="content">
                <div className="quote">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
                <p>
                  posuere luctus orci. Donec vitae mattis quam, vitae tempor
                  arcu. Aenean non odio porttitor, convallis erat sit amet,
                  facilisis velit.
                </p>
              </div>
              <hr />
              <div className="author">
                <div className="thumb">
                  <Image src={avatar} alt="Image" />
                </div>
                <div className="author-meta">
                  <h5>Daniel Smith</h5>
                  <p>Senior engineer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="feedback-s__single topy-tilt fade-top">
              <div className="content">
                <div className="quote">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
                <p>
                  posuere luctus orci. Donec vitae mattis quam, vitae tempor
                  arcu. Aenean non odio porttitor, convallis erat sit amet,
                  facilisis velit.
                </p>
              </div>
              <hr />
              <div className="author">
                <div className="thumb">
                  <Image src={avatar} alt="Image" />
                </div>
                <div className="author-meta">
                  <h5>Daniel Smith</h5>
                  <p>Senior engineer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="feedback-s__single topy-tilt fade-top">
              <div className="content">
                <div className="quote">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
                <p>
                  posuere luctus orci. Donec vitae mattis quam, vitae tempor
                  arcu. Aenean non odio porttitor, convallis erat sit amet,
                  facilisis velit.
                </p>
              </div>
              <hr />
              <div className="author">
                <div className="thumb">
                  <Image src={avatar} alt="Image" />
                </div>
                <div className="author-meta">
                  <h5>Daniel Smith</h5>
                  <p>Senior engineer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="feedback-s__single topy-tilt fade-top">
              <div className="content">
                <div className="quote">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
                <p>
                  posuere luctus orci. Donec vitae mattis quam, vitae tempor
                  arcu. Aenean non odio porttitor, convallis erat sit amet,
                  facilisis velit.
                </p>
              </div>
              <hr />
              <div className="author">
                <div className="thumb">
                  <Image src={avatar} alt="Image" />
                </div>
                <div className="author-meta">
                  <h5>Daniel Smith</h5>
                  <p>Senior engineer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="feedback-s__single topy-tilt fade-top">
              <div className="content">
                <div className="quote">
                  <i className="fa-solid fa-quote-right"></i>
                </div>
                <p>
                  posuere luctus orci. Donec vitae mattis quam, vitae tempor
                  arcu. Aenean non odio porttitor, convallis erat sit amet,
                  facilisis velit.
                </p>
              </div>
              <hr />
              <div className="author">
                <div className="thumb">
                  <Image src={avatar} alt="Image" />
                </div>
                <div className="author-meta">
                  <h5>Daniel Smith</h5>
                  <p>Senior engineer</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
         

        {/* <div className="row">
          <div className="col-12">
            <div className="section__content-cta text-center">
              <button className="btn btn--secondary">Load More</button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ClientFeedbackMain;
