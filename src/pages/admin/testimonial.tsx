import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function TestimonialsPage() {
  useAdminAuth();

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    feedback: "",
    job: "",
    videoIframe: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null); // track editing mode

  const token = localStorage.getItem("adminToken");

  // Fetch All Testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/testimonials/"
      );
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
    }
  };

  // Delete
  const handleTestDelete = async (Id: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/delete-testimonial/${Id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Testimonial deleted!");
        setTestimonials((prev) => prev.filter((item) => item._id !== Id));
      } else {
        toast.error(data.message || "Failed to delete testimonial");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Enter Edit Mode
  const handleTestEdit = (Id: string) => {
    const test = testimonials.find((t) => t._id === Id);
    if (test) {
      setEditId(Id);
      setForm({
        name: test.name,
        feedback: test.feedback,
        job: test.job,
        videoIframe: test.videoIframe || "",
      });
      setImage(null);
      setImagePreview(test.image?.url || null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Form Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Image Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Create / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.feedback || !form.job) {
      toast.error("Fill all fields");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("feedback", form.feedback);
    fd.append("job", form.job.trim());
    fd.append("videoIframe", form.videoIframe.trim());
    if (image) fd.append("image", image);

    try {
      let url = "";
      let method: "POST" | "PUT" = "POST";

      if (editId) {
        url = `http://localhost:5000/api/admin/edit-testimonial/${editId}`;
        method = "PUT";
      } else {
        url = "http://localhost:5000/api/admin/new-testimonial";
        method = "POST";
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        if (editId) {
          toast.success("Testimonial updated");
        } else {
          toast.success("Testimonial added");
        }
        setForm({ name: "", feedback: "", job: "", videoIframe: "" });
        setImage(null);
        setImagePreview(null);
        setEditId(null);
        fetchTestimonials();
      } else {
        toast.error(data.message || "Failed to save testimonial");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Testimonials</title>
      </Head>

      <AdminLayout>
        <div className="container my-4">
          <h4 className="text-white mb-4">
            {editId ? "Edit Testimonial" : "Add New Testimonial"}
          </h4>
          <form onSubmit={handleSubmit} className="row g-3 mb-5">
            <div className="col-md-6">
              <label className="form-label text-white">Name</label>
              <input
                type="text"
                className="form-control p-3"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">Job</label>
              <input
                type="text"
                className="form-control p-3"
                name="job"
                value={form.job}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label text-white">Feedback</label>
              <textarea
                className="form-control"
                name="feedback"
                rows={3}
                value={form.feedback}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12">
              <label className="form-label text-white">
                Video (optional) — iframe src URL
              </label>
              <textarea
                className="form-control"
                name="videoIframe"
                rows={3}
                value={form.videoIframe}
                onChange={handleChange}
                placeholder='Paste iframe code from YouTube/Vimeo, or a direct embed URL'
              />
            </div>
            <div className="col-12">
              <label className="form-label text-white">Image</label>
              <input
                type="file"
                className="form-control p-3"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 rounded"
                  style={{ maxHeight: 100 }}
                />
              )}
            </div>
            <div className="col-12">
              <button className="btn" type="submit">
                {editId ? "Update" : "Submit"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditId(null);
                    setForm({ name: "", feedback: "", job: "", videoIframe: "" });
                    setImage(null);
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <h4 className="text-white mb-4">All Testimonials</h4>
          <div className="row">
            {testimonials.length > 0 ? (
              testimonials.map((item) => (
                <div key={item._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card bg-dark text-white h-100 border border-secondary position-relative">
                    <div className="position-absolute p-2 top-0 end-0">
                      <button
                        className="btn-secondary m-2"
                        onClick={() => handleTestDelete(item._id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <button
                        className="btn-secondary m-2"
                        onClick={() => handleTestEdit(item._id)}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div className="text-center pt-4">
                      <img
                        src={item.image?.url}
                        alt={item.image?.alt || "testimonial"}
                        className="rounded-circle "
                        style={{ width: 100, height: 100, objectFit: "contain" }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.name}</h5>
                      {item.job && <p className="mb-1">{item.job}</p>}
                      <p className="card-text text-secondary">
                        "{item.feedback}"
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center mt-4">
                No testimonials found.
              </p>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
