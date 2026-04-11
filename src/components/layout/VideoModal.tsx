import React, { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_SOURCES = [
  "https://res.cloudinary.com/do9v9l6np/video/upload/v1775834961/Orelio_Review_DevRolin_geedql.mp4",
  "https://res.cloudinary.com/do9v9l6np/video/upload/v1775834972/Mike_Prepare2Swim_tqputd.mp4",
  "https://res.cloudinary.com/do9v9l6np/video/upload/v1775834962/JOE_Video_testimonials_odhxv9.mp4",
];

const VideoModal = () => {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    opacity: hovered ? 1 : 0,
    pointerEvents: hovered ? "auto" : "none",
    transition: "opacity 0.2s ease",
  });

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
          onMouseLeave={() => setHovered(false)}
        >
          {/* Hello! badge — sits above the video top edge */}
          <span
            style={{
              position: "absolute",
              top: -14,
              left: "-15%",
              transform: "translateX(-50%)",
              zIndex: 5,
              background: "#f97316",
              color: "#fff",
              fontSize: 19,
              fontWeight: 600,
              padding: "3px 12px",
              borderRadius: 20,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              letterSpacing: "0.4px",
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