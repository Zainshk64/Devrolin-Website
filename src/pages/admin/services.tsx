"use client";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface ServiceForm {
  title: string;
  whyUsed: string;
  approach: string;
  mainImage: File | null;
  smallImage: File | null;
}

const AdminServices = () => {
  const [form, setForm] = useState<ServiceForm>({
    title: "",
    whyUsed: "",
    approach: "",
    mainImage: null,
    smallImage: null,
  });

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

  // Handle image change
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "small"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === "main") {
      setForm({ ...form, mainImage: file });
    } else {
      setForm({ ...form, smallImage: file });
    }
  };

  // Handle edit (populate form with service details)
  const handleEditService = (serviceId: string) => {
    setEditForm(true);
    const service = ourService.find((s) => s._id === serviceId);
    if (service) {
      setForm({
        title: service.title,
        whyUsed: service.whyUsed,
        approach: service.approach,
        mainImage: null, // new file only if user selects
        smallImage: null,
      });
      setCurrentServiceId(serviceId);
      window.scrollTo(0, 0);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      whyUsed: "",
      approach: "",
      mainImage: null,
      smallImage: null,
    });
    setEditForm(false);
    setCurrentServiceId(null);
  };

  // Handle create / update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("whyUsed", form.whyUsed);
    fd.append("approach", form.approach);

    // Append only if user selected images
    if (form.mainImage) fd.append("mainImage", form.mainImage);
    if (form.smallImage) fd.append("smallImages", form.smallImage);

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
        setForm({
          title: "",
          whyUsed: "",
          approach: "",
          mainImage: null,
          smallImage: null,
        });
        fetchService();
        setEditForm(false);
        setCurrentServiceId(null);
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

          <form className="row g-4 rounded shadow-sm" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label text-white">Service Title</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="Enter service title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-white">Why it's useful</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="Why is this useful?"
                required
                value={form.whyUsed}
                onChange={(e) => setForm({ ...form, whyUsed: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label text-white">
                Approach / Methodology
              </label>
              <textarea
                rows={3}
                className="form-control"
                placeholder="Describe approach..."
                required
                value={form.approach}
                onChange={(e) => setForm({ ...form, approach: e.target.value })}
              />
            </div>

            {/* Image Upload Section */}
            <div className="d-flex gap-4 align-items-center">
              {/* Main Image Upload */}
              <div className="">
                <label className="form-label text-white d-block">
                  Main Image
                </label>
                <div
                  className="rounded-circle bg-secondary mb-2 position-relative shadow-sm"
                  style={{
                    width: 100,
                    height: 100,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    document.getElementById("mainImageInput")?.click()
                  }
                >
                  {form.mainImage ? (
                    <img
                      src={URL.createObjectURL(form.mainImage)}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      alt="Main Preview"
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center h-100 text-white fs-4">
                      <i className="fa fa-camera" aria-hidden="true"></i>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="mainImageInput"
                  hidden
                  onChange={(e) => handleImageChange(e, "main")}
                />
              </div>

              {/* Small Image Upload */}
              <div className="">
                <label className="form-label text-white d-block">
                  Small Image
                </label>
                <div
                  className="rounded-circle bg-secondary mb-2 position-relative shadow-sm"
                  style={{
                    width: 100,
                    height: 100,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    document.getElementById("smallImageInput")?.click()
                  }
                >
                  {form.smallImage ? (
                    <img
                      src={URL.createObjectURL(form.smallImage)}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      alt="Small Preview"
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center h-100 text-white fs-4">
                      <i className="fa fa-camera" aria-hidden="true"></i>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="smallImageInput"
                  hidden
                  onChange={(e) => handleImageChange(e, "small")}
                />
              </div>
            </div>
            <div className="">
              {editForm ? (
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Service"}
                  </button>
                </div>
              ) : (
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Service"}
                  </button>
                </div>
              )}
              {editForm && (
                <button
                  type="button"
                  className="btn btn-secondary m-2"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

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
                    <p className="mb-1">
                      <strong>Why Used:</strong> {service.whyUsed.slice(0, 202)}
                      ...
                    </p>
                    <hr className="" />
                    <p className="mb-2">
                      <strong>Approach:</strong>{" "}
                      {service.approach.slice(0, 200)}...
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
