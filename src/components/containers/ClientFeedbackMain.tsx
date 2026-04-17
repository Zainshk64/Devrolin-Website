import React, { useEffect, useState ,useRef } from "react";
import { toast } from "react-hot-toast";

// --- Skeleton Card ---
const SkeletonCard = () => (
  <div className="col-12 col-md-6 col-xl-4">
    <div className="feedback-s__single topy-tilt" style={{ opacity: 0.6 }}>
      <div className="content">
        <div className="quote">
          <i className="fa-solid fa-quote-right"></i>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className="skeleton-line" style={{ height: "14px", borderRadius: "6px", background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", width: "100%" }} />
          <div className="skeleton-line" style={{ height: "14px", borderRadius: "6px", background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", width: "90%" }} />
          <div className="skeleton-line" style={{ height: "14px", borderRadius: "6px", background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", width: "75%" }} />
        </div>
      </div>
      <hr />
      <div className="author">
        <div className="thumb">
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        </div>
        <div className="author-meta" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ height: "12px", width: "100px", borderRadius: "6px", background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
          <div style={{ height: "10px", width: "70px", borderRadius: "6px", background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
        </div>
      </div>
    </div>
  </div>
)
// ── Constants ────────────────────────────────────────────────────────────────
const CHARS_PER_LINE = 30; // approximate chars per line in this layout
const MAX_LINES = 3;
const TRUNCATE_CHARS = CHARS_PER_LINE * MAX_LINES; // ~186 chars = 3 lines

// ── FeedbackText ─────────────────────────────────────────────────────────────
const FeedbackText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  // Count estimated rendered lines
  const estimatedLines = Math.ceil(text.length / CHARS_PER_LINE);
  const needsTruncation = estimatedLines > 3.5 || text.length > TRUNCATE_CHARS * 1.15;

  const getTruncated = () => {
    const words = text.split(" ");
    let charCount = 0;
    let wordIndex = 0;

    // Consume words until we fill ~3 lines
    while (wordIndex < words.length && charCount + words[wordIndex].length < TRUNCATE_CHARS) {
      charCount += words[wordIndex].length + 1;
      wordIndex++;
    }

    // Add first 3 words of the 4th line (the "half line")
    const halfLine = words.slice(wordIndex, wordIndex + 3).join(" ");
    return words.slice(0, wordIndex).join(" ") + (halfLine ? " " + halfLine : "");
  };

  const displayText = !needsTruncation || expanded ? text : getTruncated() + "...";

  return (
    <p style={{ margin: 0, lineHeight: "" }}>
      {displayText}
      {needsTruncation && (
        <span
          onClick={() => setExpanded((v) => !v)}
          style={{
            color: "#f97316",
            fontWeight: 500,
            cursor: "pointer",
            marginLeft: "6px",
            whiteSpace: "nowrap",
          }}
        >
          {expanded ? "See Less" : "See More"}
        </span>
      )}
    </p>
  );
};

// --- Main Component ---
const ClientFeedbackMain = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("https://devrolin.com/api/testimonials/");
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <>
      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section className="section feedback-s fade-wrapper">
        <div className="container">
          <div className="row gaper">
            {loading ? (
              // Skeleton placeholders
              [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            ) : testimonials.length > 0 ? (
              testimonials.map((item) => (
                <div className="col-12 col-md-6 col-xl-4" key={item.id}>
                  <div className="feedback-s__single topy-tilt fade-top">
                    <div className="content">
                      <div className="quote">
                        <i className="fa-solid fa-quote-right"></i>
                      </div>
                      <FeedbackText text={item.feedback} />
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
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientFeedbackMain;