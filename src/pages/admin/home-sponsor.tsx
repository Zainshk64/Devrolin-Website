import AdminLayout from "@/components/layout/AdminLayout";
import { homeSponsorAPI, type HomeSponsorLogo } from "@/lib/api";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function HomeSponsorAdminPage() {
  useAdminAuth();

  const [sponsors, setSponsors] = useState<HomeSponsorLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const fetchSponsors = useCallback(async () => {
    try {
      setLoading(true);
      const data = await homeSponsorAPI.getAll();
      setSponsors(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load sponsor logos");
      setSponsors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setAlt("");
    setSortOrder(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Choose a logo image");
      return;
    }

    const fd = new FormData();
    fd.append("image", image);
    if (alt.trim()) fd.append("alt", alt.trim());
    fd.append("sortOrder", String(sortOrder));

    try {
      await homeSponsorAPI.create(fd);
      toast.success("Logo saved");
      resetForm();
      fetchSponsors();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await homeSponsorAPI.delete(id);
      toast.success("Logo removed");
      setSponsors((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <>
      <Head>
        <title>Admin — Home sponsor logos</title>
      </Head>

      <AdminLayout>
        <div className="container my-4">
          <h4 className="text-white mb-2">Home sponsor logos</h4>
          <p className="text-secondary mb-4">
            Logos appear in the home page sponsor carousel. Uploads use your
            server Cloudinary environment variables (CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).
          </p>

          <form onSubmit={handleSubmit} className="row g-3 mb-5">
            <div className="col-md-6">
              <label className="form-label text-white">Logo image</label>
              <input
                type="file"
                className="form-control p-3"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
              />
              {preview && (
                <div className="mt-3 p-3 border border-secondary rounded bg-black d-inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxHeight: 120, maxWidth: 200, objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
            <div className="col-md-3">
              <label className="form-label text-white">Alt text (optional)</label>
              <input
                type="text"
                className="form-control p-3"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="e.g. React"
              />
            </div>
            {/* <div className="col-md-2">
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
            <div className="col-md-1 d-flex align-items-end">
              <button className="btn w-100" type="submit">
                Save
              </button>
            </div>
          </form>

          <h4 className="text-white mb-3">Uploaded logos</h4>
          {loading ? (
            <p className="text-white-50">Loading…</p>
          ) : sponsors.length === 0 ? (
            <p className="text-white-50">
              No logos yet. Until you add some, the site uses default sponsor
              images on the home page.
            </p>
          ) : (
            <div className="row g-3">
              {sponsors.map((s) => (
                <div key={s._id} className="col-6 col-md-4 col-lg-3">
                  <div className="card bg-dark border-secondary h-100 position-relative">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                      onClick={() => handleDelete(s._id)}
                      aria-label="Delete logo"
                    >
                      <i className="fas fa-trash-alt" aria-hidden="true" />
                    </button>
                    <div className="card-body d-flex flex-column align-items-center justify-content-center pt-4">
                      <div
                        className="mb-2 d-flex align-items-center justify-content-center"
                        style={{ height: 120, width: "100%" }}
                      >
                        <img
                          src={s.image.url}
                          alt={s.image.alt || "Sponsor"}
                          style={{
                            maxHeight: 110,
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <p className="text-white-50 small mb-0 text-center text-truncate w-100 px-1">
                        {s.image.alt || "Sponsor logo"}
                      </p>
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
