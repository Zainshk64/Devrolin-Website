import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Teams() {
  useAdminAuth();

  const [members, setMembers] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    whatHeDoes: "",
    description: "",
    linkedin: "",
    impact: [""],                  // string array
    systemsWorkedOn: [""],         // string array
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // ── Fetch Members ───────────────────────────
  const fetchMembers = async () => {
    try {
      const res = await fetch(
        "https://devrolin-backend-production.up.railway.app/api/members/"
      );
      const data = await res.json();
      setMembers(data.members || []);
    } catch {
      toast.error("Error fetching members");
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  // ── Reset form ──────────────────────────────
  const resetForm = () => {
    setForm({
      name: "",
      jobTitle: "",
      whatHeDoes: "",
      description: "",
      linkedin: "",
      impact: [""],
      systemsWorkedOn: [""],
    });
    setImage(null);
    setImagePreview(null);
    setEditForm(false);
    setCurrentMemberId(null);
  };

  // ── Delete ──────────────────────────────────
  const handleDelete = async (Id: string) => {
    try {
      const res = await fetch(
        `https://devrolin-backend-production.up.railway.app/api/admin/delete-member/${Id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Member deleted!");
        setMembers((prev) => prev.filter((m) => m._id !== Id));
      } else {
        toast.error(data.message || "Failed to delete member");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  // ── Edit ────────────────────────────────────
  const handleTeamEdit = (Id: string) => {
    const member = members.find((m) => m._id === Id);
    if (member) {
      setForm({
        name:            member.name        || "",
        jobTitle:        member.jobTitle    || "",
        whatHeDoes:      member.whatHeDoes  || "",
        description:     member.description || "",
        linkedin:        member.linkedin    || "",
        impact:          member.impact?.length         ? member.impact         : [""],
        systemsWorkedOn: member.systemsWorkedOn?.length ? member.systemsWorkedOn : [""],
      });
      setImage(null);
      setImagePreview(member.image?.url || null);
      setCurrentMemberId(Id);
      setEditForm(true);
      window.scrollTo(0, 0);
    }
  };

  // ── Submit (Create + Update) ─────────────────
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!editForm && !image) return toast.error("Image is required");

    const fd = new FormData();
    fd.append("name",        form.name);
    fd.append("jobTitle",    form.jobTitle);
    fd.append("whatHeDoes",  form.whatHeDoes);
    fd.append("description", form.description);
    fd.append("linkedin",    form.linkedin);
    if (image) fd.append("image", image);

    // Send arrays as JSON strings
    fd.append("impact",          JSON.stringify(form.impact.filter(Boolean)));
    fd.append("systemsWorkedOn", JSON.stringify(form.systemsWorkedOn.filter(Boolean)));

    try {
      setLoading(true);
      let res;

      if (editForm && currentMemberId) {
        res = await fetch(
          `https://devrolin-backend-production.up.railway.app/api/admin/edit-member/${currentMemberId}`,
          { method: "PUT", headers: { Authorization: `Bearer ${token}` }, body: fd }
        );
      } else {
        res = await fetch(
          "https://devrolin-backend-production.up.railway.app/api/admin/new-member",
          { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd }
        );
      }

      const data = await res.json();
      if (res.ok) {
        toast.success(editForm ? "Member updated" : "Member added");
        resetForm();
        fetchMembers();
      } else {
        toast.error(data.message || "Failed to process request");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ── Array field helpers ──────────────────────
  const updateArrayField = (
    field: "impact" | "systemsWorkedOn",
    index: number,
    value: string
  ) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayItem = (field: "impact" | "systemsWorkedOn", max: number) => {
    if (form[field].length < max)
      setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayItem = (field: "impact" | "systemsWorkedOn", index: number) => {
    setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  };

  // ────────────────────────────────────────────
  return (
    <>
      <Head><title>Admin Teams</title></Head>
      <AdminLayout>
        <div className="container py-4">

          <h4 className="text-white mb-4">
            {editForm ? "Edit Team Member" : "Add Team Member"}
          </h4>

          <form className="row g-3 rounded shadow-sm mb-5" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="col-md-6">
              <label className="form-label text-white">Name</label>
              <input
                type="text" className="form-control p-3" required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Job Title */}
            <div className="col-md-6">
              <label className="form-label text-white">Job Title</label>
              <input
                type="text" className="form-control p-3" required
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              />
            </div>

            {/* What He Does (replaces About Me) */}
            <div className="col-12">
              <label className="form-label text-white">What He Does</label>
              <textarea
                className="form-control" required
                value={form.whatHeDoes}
                onChange={(e) => setForm({ ...form, whatHeDoes: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="col-12 mb-2">
              <label className="form-label text-white">Description</label>
              <textarea
                className="form-control" rows={3} required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            {/* LinkedIn */}
            <div className="col-12">
              <label className="form-label text-white">LinkedIn URL</label>
              <input
                type="url" className="form-control p-3"
                placeholder="https://linkedin.com/in/username"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              />
            </div>

            {/* ── Impact (string array, max 6) ── */}
            <div className="col-12">
              <label className="form-label text-white">Impact Points</label>
              {form.impact.map((item, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <input
                    type="text" className="form-control p-3"
                    placeholder={`Impact point ${index + 1}`}
                    value={item}
                    onChange={(e) => updateArrayField("impact", index, e.target.value)}
                  />
                  {form.impact.length > 1 && (
                    <button
                      type="button" className="btn btn-secondary"
                      onClick={() => removeArrayItem("impact", index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {form.impact.length < 6 && (
                <button
                  type="button" className="btn mb-3"
                  onClick={() => addArrayItem("impact", 6)}
                >
                  + Add Impact Point
                </button>
              )}
            </div>

            {/* ── Systems Worked On (string array, max 8) ── */}
            <div className="col-12">
              <label className="form-label text-white">Systems Worked On</label>
              {form.systemsWorkedOn.map((item, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <input
                    type="text" className="form-control p-3"
                    placeholder={`System ${index + 1} (e.g. GoHighLevel, HubSpot)`}
                    value={item}
                    onChange={(e) => updateArrayField("systemsWorkedOn", index, e.target.value)}
                  />
                  {form.systemsWorkedOn.length > 1 && (
                    <button
                      type="button" className="btn btn-secondary"
                      onClick={() => removeArrayItem("systemsWorkedOn", index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {form.systemsWorkedOn.length < 8 && (
                <button
                  type="button" className="btn mb-3"
                  onClick={() => addArrayItem("systemsWorkedOn", 8)}
                >
                  + Add System
                </button>
              )}
            </div>

            {/* Profile Image */}
            <div className="col-12">
              <label className="form-label text-white">Profile Image (345 × 317)</label>
              <input
                type="file" className="form-control p-3" accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImage(file || null);
                  setImagePreview(file ? URL.createObjectURL(file) : null);
                }}
              />
              {imagePreview && (
                <img
                  src={imagePreview} alt="preview"
                  className="img-thumbnail mt-2"
                  style={{ maxHeight: 100 }}
                />
              )}
            </div>

            {/* Submit */}
            <div className="col-12">
              <button className="btn" disabled={loading}>
                <i className="fa fa-plus-circle me-2"></i>
                {loading
                  ? editForm ? "Updating..." : "Adding..."
                  : editForm  ? "Update Member" : "Add Member"}
              </button>
            </div>

          </form>

          {/* ── Members List ── */}
          <h4 className="text-white mb-3">Team Members</h4>
          <div className="row">
            {members.map((member) => (
              <div key={member._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card bg-dark text-white border border-secondary position-relative h-100 shadow-sm">
                  <div className="position-absolute p-2 top-0 end-0">
                    <button className="btn-secondary m-2" onClick={() => handleDelete(member._id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className="btn-secondary m-2" onClick={() => handleTeamEdit(member._id)}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div className="text-center pt-4">
                    <img
                      src={member.image?.url}
                      alt={member.image?.alt || "Profile"}
                      className="rounded-circle"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{member.name}</h5>
                    <p className="mb-1">{member.jobTitle}</p>
                    <p className="small text-secondary">{member.whatHeDoes}</p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin} target="_blank" rel="noreferrer"
                        className="text-white admin-social"
                      >
                        <i className="fab fa-linkedin me-1"></i> LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {members.length === 0 && (
              <p className="text-white text-center mt-4">No team member found.</p>
            )}
          </div>

        </div>
      </AdminLayout>
    </>
  );
}