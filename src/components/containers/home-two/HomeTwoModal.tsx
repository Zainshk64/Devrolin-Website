"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeTwoModal = () => {
  const [videoActive, setVideoActive] = useState(false);
  const [videoData, setVideoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const device_width = window.innerWidth;

    if (
      document.querySelectorAll(".modal-bg").length > 0 &&
      device_width > 576
    ) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".modal-bg",
          start: "center center",
          end: "+=100%",
          scrub: true,
          pin: false,
        },
      });

      tl.to(".modal-bg", {
        opacity: 0,
        scale: 1,
        y: "50%",
        duration: 2,
      });
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
      <div className="video-modal">
        <Image
          src="/devrolin-team.png"
          alt="Image"
          width={1000}
          height={1000}
          className="modal-bg"
        />
        <button
          className="video-frame video-btn"
          onClick={() => setVideoActive(true)}
        >
          <Image
            src="/circle-filled.png"
            width={200}
            height={200}
            alt="Image"
          />
        </button>
      </div>

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

export default HomeTwoModal;