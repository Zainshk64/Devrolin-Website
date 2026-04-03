import React, { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE } from "@/lib/api";

interface TestimonialRow {
  _id?: string;
  video?: { url?: string };
}

const VideoModal = () => {
  const [sources, setSources] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const loadVideos = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/testimonials/`);
      const data: TestimonialRow[] = await res.json();
      if (!Array.isArray(data)) {
        setSources([]);
        return;
      }
      const urls = data
        .map((t) => (t.video?.url ? String(t.video.url).trim() : ""))
        .filter(Boolean);
      setSources(urls);
    } catch {
      setSources([]);
    }
  }, []);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  useEffect(() => {
    const onFocus = () => loadVideos();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadVideos]);

  useEffect(() => {
    if (currentIndex >= sources.length && sources.length > 0) {
      setCurrentIndex(0);
    }
  }, [sources, currentIndex]);

  const handleEnded = useCallback(() => {
    if (sources.length <= 1) return;
    setCurrentIndex((i) => (i + 1) % sources.length);
  }, [sources.length]);

  const loopSingle = sources.length <= 1;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || sources.length === 0) return;
    el.load();
    const p = el.play();
    if (p !== undefined) p.catch(() => {});
  }, [currentIndex, sources]);

  if (sources.length === 0) {
    return null;
  }

  const src = sources[currentIndex];

  return (
    <div className={"vid-m" + (visible ? " vid-a" : " ")}>
      <div className="vid-c">
        <button
          type="button"
          aria-label="close video popup"
          className="close-v"
          onClick={() => setVisible(false)}
        >
          <i className="fa-light fa-xmark-large"></i>
        </button>
        <video
          ref={videoRef}
          key={src}
          controls
          playsInline
          preload="auto"
          muted
          loop={loopSingle}
          onEnded={handleEnded}
        >
          <source src={src} />
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
