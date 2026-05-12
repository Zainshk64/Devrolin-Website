"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import banneronethumb from "public/images/banner/hero-section4.png";
import star from "public/images/star.png";

gsap.registerPlugin(ScrollTrigger);

interface VideoData {
  videoUrl: string;
  title?: string;
  _id?: string;
}

const HomeOneBanner = () => {
  const [videoActive, setVideoActive] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const device_width = window.innerWidth;

      if (
        document.querySelectorAll(".g-ban-one").length > 0 &&
        device_width > 576
      ) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".banner",
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: false,
          },
        });

        tl.set(".g-ban-one", {
          y: "-10%",
        });

        tl.to(".g-ban-one", {
          opacity: 0,
          scale: 2,
          y: "100%",
          zIndex: -1,
          duration: 2,
        });
      }
    }
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          "https://devrolin-backend-production.up.railway.app/api/admin/play-video"
        );
        const data = await res.json();

        if (data.exists && data.video?.videoUrl) {
          setVideoData(data.video);
          setHasVideo(true);
        } else {
          setHasVideo(false);
        }
      } catch (err) {
        console.error("Failed to load video:", err);
        setHasVideo(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, []);

  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="banner__content">
                <h1 className="text-uppercase text-start fw-9 mb-0 title-anim">
                  We build <span className="text-stroke"> systems</span>
                  <span className="interval">
                    <i className="icon-arrow-top-right"></i> that make money
                  </span>
                </h1>
                <div className="banner__content-inner">
                  <p>
                    Dubai-based firm building AI, SaaS, and CRM systems that
                    turn your business into a revenue machine without hiring
                    more people.
                  </p>
                  <div className="cta section__content-cta">
                    <div className="single">
                      <h5 className="fw-7">12+</h5>
                      <p className="fw-5">years of experience</p>
                    </div>
                    <div className="single">
                      <h5 className="fw-7">2500+</h5>
                      <p className="fw-5">success stories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Image
          src={banneronethumb}
          alt="Image"
          className="banner-one-thumb d-none d-sm-block g-ban-one"
        />

        <Image src={star} alt="Image" className="star" />

        <div className="banner-left-text banner-social-text d-none d-md-flex">
          <Link href="mailto:info@devrolin.com">mail : info@devrolin.com</Link>
          <Link href="tel:+971522347966">Whatsapp : +971-522347966</Link>
        </div>

        <div className="banner-right-text banner-social-text d-none d-md-flex">
          <Link
            href="https://www.facebook.com/profile.php?id=61561865430556"
            target="_blank"
          >
            facebook
          </Link>
          <Link
            href="https://www.instagram.com/devrolin.x?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
          >
            instagram
          </Link>
          <Link
            href="https://www.linkedin.com/company/devrolin/about/"
            target="_blank"
          >
            Linkedin
          </Link>
        </div>

        <button
          className="video-frame video-btn"
          onClick={() => setVideoActive(true)}
        >
          <Image
            src="/circle.png"
            alt="Image"
            width={500}
            height={200}
            priority
          />
        </button>

        <div className="lines d-none d-lg-flex">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </section>

      {/* Video Modal */}
      <div
        className={
          (videoActive ? " video-zoom-in" : " ") + " video-backdrop"
        }
        onClick={() => setVideoActive(false)}
      >
        <div className="video-inner">
          <div
            className="video-container"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* ✅ Show Video if exists */}
            {videoActive && hasVideo && videoData?.videoUrl && (
              <video
                src={videoData.videoUrl}
                autoPlay
                controls
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
                onLoadedData={() => {
                  const loader = document.querySelector(".video-loader");
                  if (loader) loader.remove();
                }}
              />
            )}

            {/* ✅ Show Loader while video is loading */}
            {videoActive && isLoading && (
              <div
                className="video-loader"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 300,
                }}
              >
                <div
                  className="spinner-border text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* ✅ Show Coming Soon ONLY if NO video exists */}
            {!hasVideo && (
              <div className="coming-soon-inner">
                <div className="coming-soon-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p className="coming-soon-eyebrow">
                  Something Extraordinary
                </p>
                <h2 className="coming-soon-title">
                  <span>Coming</span>
                  <span>Soon</span>
                </h2>
                <p className="coming-soon-sub">
                  We&apos;re crafting something remarkable. Stay tuned.
                </p>
                <div className="coming-soon-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              aria-label="close video popup"
              className="close-video-popup"
              onClick={() => setVideoActive(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeOneBanner;