"use client";
import React from "react";
import Link from "next/link";
import { useProjectModal } from "@/components/ProjectModalContext"; // adjust path as needed

interface CtaTwoProps {
  serviceName?: string; // pass the current service name from the page
}

const CtaTwo = ({ serviceName }: CtaTwoProps) => {
  const { openModal } = useProjectModal();

  return (
    <section className="cta-two section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div
              className="cta-two-wrapper bg-img"
              style={{ backgroundImage: "url('/images/cta-two-bg.png')" }}
            >
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="cta-two__content">
                    <span>Hello !</span>
                    <h2 className="title-anim">ready to work with us?</h2>
                    <h5>
                      <Link href="https://wa.me/971522347966">
                        Whatsapp: +971 52 234 7966
                      </Link>
                    </h5>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="text-start text-lg-end">
                    {/* Opens the modal instead of navigating */}
                    <button
                      type="button"
                      className="btn btn--tertiary"
                      onClick={() => openModal(serviceName)}
                    >
                      Get My System Plan
                      <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaTwo;