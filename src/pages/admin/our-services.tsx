import AdminLayout from "@/components/layout/AdminLayout";
import { ourServiceSlideAPI, type OurServiceSlide } from "@/lib/api";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const MAX_SLIDES = 9;
const MAX_BULLETS = 5;

export default function OurServicesAdminPage() {
  useAdminAuth();
  const [slides, setSlides] = useState<OurServiceSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState("");
  const [bullets, setBullets] = useState(["", "", "", "", ""]);
  const [sortOrder, setSortOrder] = useState(0);

  const fetchSlides = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ourServiceSlideAPI.getAll();
      setSlides(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load slides");
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slides.length >= MAX_SLIDES) {
      toast.error(`Maximum ${MAX_SLIDES} slides`);
      return;
    }
    const h = heading.trim();
    if (!h) {
      toast.error("Heading is required");
      return;
    }
    const cleaned = bullets
      .map((b) => b.trim())
      .filter(Boolean)
      .slice(0, MAX_BULLETS);
    try {
      await ourServiceSlideAPI.create({
        heading: h,
        bullets: cleaned,
        sortOrder,
      });
      toast.success("Slide added");
      setHeading("");
      setBullets(["", "", "", "", ""]);
      setSortOrder(0);
      fetchSlides();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await ourServiceSlideAPI.delete(id);
      toast.success("Slide removed");
      setSlides((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const atLimit = slides.length >= MAX_SLIDES;

  return (
    <>
      <Head>
        <title>Admin Our Services</title>
      </Head>
      <AdminLayout>
        <div className="container my-4">
          <h4 className="text-white mb-2">Our services carousel</h4>
          <p className="text-secondary mb-4">
            Up to {MAX_SLIDES} slides. Heading plus up to {MAX_BULLETS}{" "}
            bullets. Numbers on the site are index plus one (01, 02, …).
          </p>
          <form onSubmit={handleSubmit} className="mb-5">
            <fieldset disabled={atLimit} className="row g-3">
              <div className="col-12">
                <label className="form-label text-white">Heading</label>
                <input
                  type="text"
                  className="form-control p-3"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </div>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="col-12 col-md-6">
                  <label className="form-label text-white">
                    Bullet {i + 1}
                  </label>
                  <input
                    type="text"
                    className="form-control p-3"
                    value={bullets[i]}
                    onChange={(e) => {
                      const n = [...bullets];
                      n[i] = e.target.value;
                      setBullets(n);
                    }}
                  />
                </div>
              ))}
              {/* <div className="col-md-4">
                <label className="form-label text-white">Sort order</label>
                <input
                  type="number"
                  className="form-control p-3"
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(Number(e.target.value) || 0)
                  }
                />
              </div> */}
              <div className="col-12">
                <button className="btn" type="submit">
                  Add slide
                </button>
                {atLimit && (
                  <span className="text-warning ms-3">Limit reached.</span>
                )}
              </div>
            </fieldset>
          </form>
          <h4 className="text-white mb-3">Current slides</h4>
          {loading ? (
            <p className="text-white-50">Loading</p>
          ) : slides.length === 0 ? (
            <p className="text-white-50">None yet. Site uses placeholders.</p>
          ) : (
            <div className="row g-3">
              {slides.map((s, idx) => (
                <div key={s._id} className="col-12 col-lg-6">
                  <div className="card bg-dark border-secondary h-100 position-relative">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                      onClick={() => handleDelete(s._id)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                    <div className="card-body pt-4">
                      <p className="text-secondary small mb-1">
                        #{String(idx + 1).padStart(2, "0")}
                      </p>
                      <h5 className="text-white">{s.heading}</h5>
                      {s.bullets?.length > 0 && (
                        <ul className="text-white-50 small mb-0">
                          {s.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}
