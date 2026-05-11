"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface Testimonial {
  client: string;
  quote: string;
}

interface FormDataState {
  title: string;
  owner: string;
  sector: string;
  category: string;
  description: string;
  result: string;
  startDate: string;
  endDate: string;
  testimonial: Testimonial[];
}
interface Props {
  onProjectAdded: () => void;
  editingProject?: any | null;
  clearEditing?: () => void;
}

export default function AdminCreateProject({
  onProjectAdded,
  editingProject,
  clearEditing,
}: Props) {
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    owner: "",
    sector: "",
    category: "",
    description: "",
    result: "",
    startDate: "",
    endDate: "",
    testimonial: [{ client: "", quote: "" }],
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [snapshots, setSnapshots] = useState<File[]>([]);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [snapshotsPreview, setSnapshotsPreview] = useState<string[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // --------- Handlers ----------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonialChange = (
    index: number,
    field: keyof Testimonial,
    value: string,
  ) => {
    const updated = [...formData.testimonial];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, testimonial: updated }));
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleSnapshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    // ✅ Add new files to existing ones, max 3
    const updated = [...snapshots, ...files].slice(0, 3);

    setSnapshots(updated);
    setSnapshotsPreview(updated.map((file) => URL.createObjectURL(file)));
  };

  // ✅ Prefill form when editingProject changes
  const [loading, setLoading] = useState(false);
  const thumbnailRef = useRef<HTMLInputElement | null>(null);
  const mainImageRef = useRef<HTMLInputElement | null>(null);
  const snapshotsRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        owner: editingProject.owner,
        sector: editingProject.sector,
        category: editingProject.category, // ← ADD THIS
        description: editingProject.description,
        result: editingProject.result,
        startDate: editingProject.startDate?.split("T")[0] || "",
        endDate: editingProject.endDate?.split("T")[0] || "",
        testimonial: editingProject.testimonial || [{ client: "", quote: "" }],
      });
      setThumbnailPreview(editingProject.thumbnail?.url || "");
      setMainImagePreview(editingProject.mainImage?.url || ""); // keep blank until new upload
      setSnapshotsPreview([]); // same
    }
  }, [editingProject]);

  const resetForm = () => {
    setFormData({
      title: "",
      owner: "",
      sector: "",
      category: "",
      description: "",
      result: "",
      startDate: "",
      endDate: "",
      testimonial: [{ client: "", quote: "" }],
    });
    setThumbnail(null);
    setMainImage(null);
    setSnapshots([]);
    setThumbnailPreview("");
    setMainImagePreview("");
    setSnapshotsPreview([]);
    if (thumbnailRef.current) thumbnailRef.current.value = "";
    if (mainImageRef.current) mainImageRef.current.value = "";
    if (snapshotsRef.current) snapshotsRef.current.value = "";
    clearEditing?.(); // ✅ exit edit mode
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "testimonial") {
        fd.append(key, value as string);
      }
    });
    formData.testimonial.forEach((t, i) => {
      fd.append(`testimonial[${i}][client]`, t.client);
      fd.append(`testimonial[${i}][quote]`, t.quote);
    });

    if (thumbnail) fd.append("thumbnail", thumbnail);
    if (mainImage) fd.append("mainImage", mainImage);
    snapshots.forEach((snap) => fd.append("snapshots", snap));

    try {
      setLoading(true);
      let res;

      if (editingProject?._id) {
        // ✅ PUT edit
        res = await fetch(
          `https://devrolin-backend-production.up.railway.app/api/admin/edit-project/${editingProject._id}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          },
        );
      } else {
        // ✅ POST create
        res = await fetch(
          "https://devrolin-backend-production.up.railway.app/api/admin/new-project",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          },
        );
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(editingProject ? "Project updated!" : "Project created!");
        resetForm();
        onProjectAdded();
      } else {
        toast.error(data.message || "Failed to save project");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // --------- JSX ----------
  return (
    <div className="container mb-5">
      <h4 className="text-white mb-4">
        {editingProject ? "Edit Project" : "Add New Project"}
      </h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          {/* Text Inputs */}
          {["title", "owner", "sector"].map((field) => (
            <div className="mb-3 col-md-6" key={field}>
              <label className="form-label text-capitalize text-white">
                {field}
              </label>
              <input
                type="text"
                className="form-control p-3"
                name={field}
                value={(formData as any)[field]}
                onChange={handleInputChange}
                required={field === "title"}
              />
            </div>
          ))}

          {/* ✅ ADD CATEGORY DROPDOWN HERE */}
          <div className="mb-3 col-md-6">
            <label className="form-label text-white">Category</label>
            <select
              className="form-control p-3"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option className="text-white" value="">Select Category</option>
              <option className="text-white" value="AI Automation & Integration Systems">
                AI Automation & Integration Systems
              </option>
              <option className="text-white" value="CRM & Revenue Systems">
                CRM & Revenue Systems
              </option>
              <option className="text-white" value="SaaS & MVP Development">
                SaaS & MVP Development
              </option>
              <option className="text-white" value="Web & Custom Platforms">
                Web & Custom Platforms
              </option>
            </select>
          </div>

          {["description", "result"].map((field) => (
            <div className="mb-3 col-md-6" key={field}>
              <label className="form-label text-capitalize text-white">
                {field}
              </label>
              <input
                type="text"
                className="form-control p-3"
                name={field}
                value={(formData as any)[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          {/* Dates */}
          <div className="mb-3 col-md-6">
            <label className="form-label text-white">Start Date</label>
            <input
              type="date"
              className="form-control p-3"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label text-white">End Date</label>
            <input
              type="date"
              className="form-control p-3"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Testimonial */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">Testimonial Client</label>
            <input
              type="text"
              className="form-control p-3"
              value={formData.testimonial[0].client}
              onChange={(e) =>
                handleTestimonialChange(0, "client", e.target.value)
              }
            />
          </div>

          <div className="mb-3 col-12">
            <label className="form-label text-white">Testimonial Quote</label>
            <textarea
              className="form-control"
              value={formData.testimonial[0].quote}
              onChange={(e) =>
                handleTestimonialChange(0, "quote", e.target.value)
              }
            />
          </div>

          {/* Thumbnail */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">
              Thumbnail (345 X 394){" "}
            </label>
            <input
              type="file"
              ref={thumbnailRef}
              className="form-control p-3"
              onChange={handleThumbnail}
              accept="image/*"
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-2 rounded"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            )}
          </div>

          {/* Main Image */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">
              Main Image (690 X 379)
            </label>
            <input
              type="file"
              ref={mainImageRef}
              className="form-control p-3"
              onChange={handleMainImageChange}
              accept="image/*"
            />
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Main Preview"
                className="mt-2 rounded"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            )}
          </div>

          {/* Snapshots */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">
              Snapshots (up to 3 - 424 X 296)
            </label>
            <input
              type="file"
              ref={snapshotsRef}
              className="form-control p-3"
              multiple
              onChange={handleSnapshotsChange}
              accept="image/*"
            />
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {snapshotsPreview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Snapshot ${i}`}
                  className="rounded"
                  style={{ maxWidth: "120px", height: "auto" }}
                />
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="btn">
          {loading
            ? editingProject
              ? "Updating..."
              : "Creating..."
            : editingProject
              ? "Update Project"
              : "Create Project"}{" "}
        </button>

        {editingProject && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}
