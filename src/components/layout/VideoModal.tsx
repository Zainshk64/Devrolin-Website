import React, { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_SOURCES = [
  // "https://res.cloudinary.com/do9v9l6np/video/upload/v1775834961/Orelio_Review_DevRolin_geedql.mp4",
  // "https://res.cloudinary.com/do9v9l6np/video/upload/v1775834972/Mike_Prepare2Swim_tqputd.mp4",
  // "https://res.cloudinary.com/do9v9l6np/video/upload/v1775834962/JOE_Video_testimonials_odhxv9.mp4",

  // "https://res.cloudinary.com/drdpqf3ns/video/upload/v1776804873/2_xd656g.mp4",
  // "https://res.cloudinary.com/drdpqf3ns/video/upload/v1776804417/3_bg8rxq.mp4",
  // "https://res.cloudinary.com/drdpqf3ns/video/upload/v1776804370/1_aofjqm.mp4",


  "https://res.cloudinary.com/drdpqf3ns/video/upload/v1776868272/1_1_gwiq5n.mp4",
  "https://res.cloudinary.com/drdpqf3ns/video/upload/v1776868278/3_1_bntfct.mp4",
  "https://res.cloudinary.com/drdpqf3ns/video/upload/v1776868284/2_1_qoujde.mp4",
];

const VideoModal = () => {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
const [showControls, setShowControls] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const total = VIDEO_SOURCES.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((index + total) % total);
    },
    [total]
  );

  const handleEnded = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.load();
    const p = el.play();
    if (p !== undefined) p.catch(() => {});
  }, [currentIndex]);

  if (!visible) return null;

  const src = VIDEO_SOURCES[currentIndex];

  const navBtnStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute",
    [side]: 8,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 4,
    background: "rgba(0,0,0,0.55)",
    border: "1.5px solid rgba(255,255,255,0.3)",
    color: "#fff",
    width: 34,
    height: 34,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
opacity: hovered || showControls ? 1 : 0,
pointerEvents: hovered || showControls ? "auto" : "none",
    transition: "opacity 0.2s ease",
  });

  const handleVideoClick = () => {
  if (isMobile) {
    setShowControls(true);

    // auto hide after 3 sec
    setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }
};

  return (
    <div className="vid-m vid-a">
      <div className="vid-c">

        {/* Close button */}
        <button
          type="button"
          aria-label="Close video popup"
          className="close-v"
          onClick={() => setVisible(false)}
        >
          <i className="fa-light fa-xmark-large"></i>
        </button>

        {/* Video + overlaid nav */}
        <div
          style={{ position: "relative", width: "100%" }}
          onMouseEnter={() => setHovered(true)}
          onFocus={() => setHovered(true)}
        
          onMouseLeave={() => setHovered(false)}
        >
          <span
            style={{
              position: "absolute",
              left: "-37%",
              top: "26%",
              transform: "translateY(-50%)",
              zIndex: 5,
              background: "#f97316",
              color: "#fff",
              fontSize: 18,
              fontWeight: 400,
              fontFamily: "inherit",
              padding: "5px 16px",
   borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    borderBottomLeftRadius: "50px",
    borderBottomRightRadius: "0px",
                  pointerEvents: "none",
              whiteSpace: "nowrap",
              letterSpacing: "0.3px",
              // chat-bubble tail pointing right toward video
              boxShadow: "2px 2px 8px rgba(249,115,22,0.4)",
            }}
          >
            Hello!
          </span>

          <video
            ref={videoRef}
            key={src}
            controls
            playsInline
            preload="auto"
            muted
            loop={total === 1}
            onEnded={handleEnded}
              onClick={handleVideoClick}

            style={{ width: "100%", display: "block", borderRadius: "8px" }}
          >
            <source src={src} />
          </video>

          {/* 1 / 3 counter */}
          {total > 1 && (
            <span
              style={{
                position: "absolute",
                top: 8,
                left: 10,
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 500,
                padding: "2px 8px",
                borderRadius: 20,
                pointerEvents: "none",
                zIndex: 4,
                letterSpacing: "0.3px",
              }}
            >
              {currentIndex + 1} / {total}
            </span>
          )}

          {/* Prev button */}
          {total > 1 && (
            <button
              type="button"
              aria-label="Previous video"
              onClick={() => goTo(currentIndex - 1)}
              style={navBtnStyle("left")}
            >
              <i className="fa-light fa-angle-left"></i>
            </button>
          )}

          {/* Next button */}
          {total > 1 && (
            <button
              type="button"
              aria-label="Next video"
              onClick={() => goTo(currentIndex + 1)}
              style={navBtnStyle("right")}
            >
              <i className="fa-light fa-angle-right"></i>
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default VideoModal;