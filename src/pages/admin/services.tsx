"use client";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface OurProcess {
  question: string;
  answer: string;
}

interface ServiceForm {
  title: string;
  heroHeading: string;
  shortIntro: string;
  whyBusinessesNeedThis: string;
  whatWeBuild: string[];
  ourProcess: OurProcess[];
  mainImage: File | null;
  smallImages: File[];
}

const AdminServices = () => {
  const [form, setForm] = useState<ServiceForm>({
    title: "",
    heroHeading: "",
    shortIntro: "",
    whyBusinessesNeedThis: "",
    whatWeBuild: [""],
    ourProcess: [{ question: "", answer: "" }],
    mainImage: null,
    smallImages: [],
  });

  const [mainImagePreview, setMainImagePreview] = useState("");
  const [smallImagesPreview, setSmallImagesPreview] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [ourService, setOurService] = useState<any[]>([]);

  // Fetch all services
  const fetchService = async () => {
    try {
      const response = await fetch(
        "https://devrolin-backend-production.up.railway.app/api/services"
      );
      const data = await response.json();
      setOurService(data.services);
    } catch (err) {
      toast.error("Error fetching services");
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  // Handle main image change
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm({ ...form, mainImage: file });
    setMainImagePreview(URL.createObjectURL(file));
  };

  // Handle small images change
  const handleSmallImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    const updated = [...form.smallImages, ...files].slice(0, 2);
    setForm({ ...form, smallImages: updated });
    setSmallImagesPreview(updated.map((file) => URL.createObjectURL(file)));
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle What We Build changes
  const handleWhatWeBuildChange = (index: number, value: string) => {
    const updated = [...form.whatWeBuild];
    updated[index] = value;
    setForm({ ...form, whatWeBuild: updated });
  };

  const addWhatWeBuildField = () => {
    if (form.whatWeBuild.length < 7) {
      setForm({
        ...form,
        whatWeBuild: [...form.whatWeBuild, ""],
      });
    } else {
      toast.error("Maximum 7 points allowed");
    }
  };

  const removeWhatWeBuildField = (index: number) => {
    const updated = form.whatWeBuild.filter((_, i) => i !== index);
    setForm({ ...form, whatWeBuild: updated });
  };

  // Handle Our Process changes
  const handleOurProcessChange = (
    index: number,
    field: keyof OurProcess,
    value: string
  ) => {
    const updated = [...form.ourProcess];
    updated[index][field] = value;
    setForm({ ...form, ourProcess: updated });
  };

  const addOurProcessField = () => {
    setForm({
      ...form,
      ourProcess: [...form.ourProcess, { question: "", answer: "" }],
    });
  };

  const removeOurProcessField = (index: number) => {
    const updated = form.ourProcess.filter((_, i) => i !== index);
    setForm({ ...form, ourProcess: updated });
  };

  // Handle edit (populate form with service details)
  const handleEditService = (serviceId: string) => {
    setEditForm(true);
    const service = ourService.find((s) => s._id === serviceId);
    if (service) {
      setForm({
        title: service.title,
        heroHeading: service.heroHeading,
        shortIntro: service.shortIntro,
        whyBusinessesNeedThis: service.whyBusinessesNeedThis,
        whatWeBuild: service.whatWeBuild?.length
          ? service.whatWeBuild
          : [""],
        ourProcess: service.ourProcess?.length
          ? service.ourProcess
          : [{ question: "", answer: "" }],
        mainImage: null,
        smallImages: [],
      });
      setMainImagePreview(service.mainImage?.url || "");
      setSmallImagesPreview(
        service.smallImages?.map((img: any) => img.url) || []
      );
      setCurrentServiceId(serviceId);
      window.scrollTo(0, 0);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      heroHeading: "",
      shortIntro: "",
      whyBusinessesNeedThis: "",
      whatWeBuild: [""],
      ourProcess: [{ question: "", answer: "" }],
      mainImage: null,
      smallImages: [],
    });
    setMainImagePreview("");
    setSmallImagesPreview([]);
    setEditForm(false);
    setCurrentServiceId(null);
  };

  // Handle create / update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (
      !form.title ||
      !form.heroHeading ||
      !form.shortIntro ||
      !form.whyBusinessesNeedThis
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("heroHeading", form.heroHeading);
    fd.append("shortIntro", form.shortIntro);
    fd.append("whyBusinessesNeedThis", form.whyBusinessesNeedThis);

    // whatWeBuild as JSON
    fd.append(
      "whatWeBuild",
      JSON.stringify(form.whatWeBuild.filter(Boolean))
    );

    // ourProcess as form data
    form.ourProcess.forEach((proc, i) => {
      fd.append(`ourProcess[${i}][question]`, proc.question);
      fd.append(`ourProcess[${i}][answer]`, proc.answer);
    });

    // Append only if user selected images
    if (form.mainImage) fd.append("mainImage", form.mainImage);
    form.smallImages.forEach((img) => fd.append("smallImages", img));

    try {
      setLoading(true);

      let res: Response;
      if (editForm && currentServiceId) {
        res = await fetch(
          `https://devrolin-backend-production.up.railway.app/api/admin/edit-service/${currentServiceId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: fd,
          }
        );
      } else {
        res = await fetch(
          "https://devrolin-backend-production.up.railway.app/api/admin/new-service",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: fd,
          }
        );
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(
          editForm
            ? "Service updated successfully"
            : "Service created successfully"
        );
        resetForm();
        fetchService();
      } else {
        toast.error(data.message || "Error processing service");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Delete service
  const handleDeleteService = async (serviceId: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        `https://devrolin-backend-production.up.railway.app/api/admin/delete-service/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Service deleted");
        fetchService();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Admin Services</title>
        <meta
          name="description"
          content="The official Next.js Admin Dashboard"
        />
      </Head>
      <AdminLayout>
        <div className="container mt-4">
          <h4 className="text-white mb-4">
            {editForm ? "Edit Service" : "Add New Service"}
          </h4>

          <form
            className="row g-4 rounded shadow-sm mb-5"
            onSubmit={handleSubmit}
          >
            {/* Title */}
            <div className="col-md-6">
              <label className="form-label text-white">Service Title *</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="Enter service title"
                name="title"
                required
                value={form.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Hero Heading */}
            <div className="col-md-6">
              <label className="form-label text-white">Hero Heading *</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="Enter hero heading"
                name="heroHeading"
                required
                value={form.heroHeading}
                onChange={handleInputChange}
              />
            </div>

            {/* Short Intro */}
            <div className="col-12">
              <label className="form-label text-white">Short Intro *</label>
              <textarea
                rows={3}
                className="form-control p-3"
                placeholder="Write a short introduction..."
                name="shortIntro"
                required
                value={form.shortIntro}
                onChange={handleInputChange}
              />
            </div>

            {/* Why Businesses Need This */}
            <div className="col-12">
              <label className="form-label text-white">
                Why Businesses Need This *
              </label>
              <textarea
                rows={4}
                className="form-control p-3"
                placeholder="Explain why businesses need this service..."
                name="whyBusinessesNeedThis"
                required
                value={form.whyBusinessesNeedThis}
                onChange={handleInputChange}
              />
            </div>

            {/* What We Build */}
            <div className="col-12">
              <label className="form-label text-white">
                What We Build (Max 7 Points)
              </label>
              {form.whatWeBuild.map((item, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    className="form-control p-3"
                    value={item}
                    onChange={(e) =>
                      handleWhatWeBuildChange(index, e.target.value)
                    }
                    placeholder={`Point ${index + 1}`}
                  />
                  {form.whatWeBuild.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeWhatWeBuildField(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {form.whatWeBuild.length < 7 && (
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={addWhatWeBuildField}
                >
                  + Add Point
                </button>
              )}
            </div>

            {/* Our Process - Q&A */}
            <div className="col-12">
              <label className="form-label text-white">
                Our Process (Questions & Answers)
              </label>
              {form.ourProcess.map((proc, index) => (
                <div key={index} className="border p-3 mb-3 rounded">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control p-3"
                      value={proc.question}
                      onChange={(e) =>
                        handleOurProcessChange(index, "question", e.target.value)
                      }
                      placeholder={`Step ${index + 1}: Question / Step Title`}
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control p-3"
                      rows={2}
                      value={proc.answer}
                      onChange={(e) =>
                        handleOurProcessChange(index, "answer", e.target.value)
                      }
                      placeholder="Answer / Description"
                    />
                  </div>
                  {form.ourProcess.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeOurProcessField(index)}
                    >
                      Remove Step
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addOurProcessField}
              >
                + Add Process Step
              </button>
            </div>

            {/* Image Upload Section */}
            <div className="col-12">
              <label className="form-label text-white d-block mb-3">
                Images
              </label>
              <div className="d-flex gap-4 align-items-start">
                {/* Main Image Upload */}
                <div>
                  <p className="text-white mb-2">Main Image</p>
                  <div
                    className="rounded bg-secondary mb-2 position-relative shadow-sm"
                    style={{
                      width: 150,
                      height: 150,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document.getElementById("mainImageInput")?.click()
                    }
                  >
                    {mainImagePreview ? (
                      <img
                        src={mainImagePreview}
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                        alt="Main Preview"
                      />
                    ) : (
                      <div className="d-flex justify-content-center align-items-center h-100 text-white fs-4">
                        <i className="fa fa-camera"></i>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id="mainImageInput"
                    hidden
                    onChange={handleMainImageChange}
                  />
                </div>

                {/* Small Images Upload */}
                <div>
                  <p className="text-white mb-2">Small Images (up to 2)</p>
                  <div
                    className="rounded bg-secondary mb-2 position-relative shadow-sm"
                    style={{
                      width: 150,
                      height: 150,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document.getElementById("smallImagesInput")?.click()
                    }
                  >
                    {smallImagesPreview.length > 0 ? (
                      <img
                        src={smallImagesPreview[0]}
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                        alt="Small Preview"
                      />
                    ) : (
                      <div className="d-flex justify-content-center align-items-center h-100 text-white fs-4">
                        <i className="fa fa-camera"></i>
                      </div>
                    )}
                  </div>
                  <small className="text-white">
                    {smallImagesPreview.length} image(s) selected
                  </small>
                  <input
                    type="file"
                    accept="image/*"
                    id="smallImagesInput"
                    multiple
                    hidden
                    onChange={handleSmallImagesChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="col-12">
              {editForm ? (
                <>
                  <button
                    type="submit"
                    className="btn py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Service"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2 py-3 fw-bold"
                    onClick={resetForm}
                  >
                    Cancel Edit
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="btn py-3 fw-bold"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Service"}
                </button>
              )}
            </div>
          </form>

          {/* Services List */}
          <h4 className="text-white my-4">Our Services</h4>
          <div className="row">
            {ourService.map((service) => (
              <div key={service._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card bg-dark text-white border border-secondary h-100">
                  <img
                    src={service.mainImage?.url}
                    className="card-img-top img-fluid"
                    alt={service.mainImage?.alt || "Main Image"}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="mb-1 text-muted">
                      <small>
                        <strong>Hero:</strong> {service.heroHeading?.slice(0, 50)}
                        ...
                      </small>
                    </p>
                    <p className="mb-1">
                      <small>
                        <strong>Intro:</strong> {service.shortIntro?.slice(0, 50)}
                        ...
                      </small>
                    </p>
                    <hr className="" />
                    <p className="mb-2">
                      <small>
                        <strong>Why:</strong>{" "}
                        {service.whyBusinessesNeedThis?.slice(0, 80)}...
                      </small>
                    </p>
                    <p className="mb-2">
                      <small>
                        <strong>Points:</strong> {service.whatWeBuild?.length || 0}
                      </small>
                    </p>
                    <p className="mb-2">
                      <small>
                        <strong>Process Steps:</strong>{" "}
                        {service.ourProcess?.length || 0}
                      </small>
                    </p>
                    <button
                      className="p-2 mt-2 rounded bg-danger"
                      onClick={() => handleDeleteService(service._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="p-2 m-2 rounded bg-primary"
                      onClick={() => handleEditService(service._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {ourService.length === 0 && (
              <p className="text-white text-center mt-4">No services found.</p>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminServices;