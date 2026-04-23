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
    aboutMe: "",
    description: "",
    socials: [{ social: "", url: "" }],
    skills: [{ name: "", proficiency: "" }],
    education: [{ degree: "", year: "", description: "" }],
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // Fetch Members
  const fetchMembers = async () => {
    try {
      const res = await fetch(
        "https://devrolin-backend-production.up.railway.app/api/members/"
      );
      const data = await res.json();
      setMembers(data.members || []);
    } catch (err) {
      toast.error("Error fetching members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle Delete
  const handleDelete = async (Id: string) => {
    try {
      const res = await fetch(
        `https://devrolin-backend-production.up.railway.app/api/admin/delete-member/${Id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Member deleted!");
        setMembers((prev) => prev.filter((m) => m._id !== Id));
      } else {
        toast.error(data.message || "Failed to delete member");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Handle Edit
  const handleTeamEdit = (Id: string) => {
    const member = members.find((m) => m._id === Id);
    if (member) {
      setForm({
        name: member.name || "",
        jobTitle: member.jobTitle || "",
        aboutMe: member.aboutMe || "",
        description: member.description || "",
        socials: member.socials?.length
          ? member.socials
          : [{ social: "", url: "" }],
        skills: member.skills?.length
          ? member.skills
          : [{ name: "", proficiency: "" }],
        education: member.education?.length
          ? member.education.map((edu: any) => ({
              degree: edu.degree || "",
              year: String(edu.year || ""), // ✅ force year to be string
              description: edu.description || "",
            }))
          : [{ degree: "", year: "", description: "" }],
      });
      setImage(null);
      setImagePreview(member.image?.url || null);
      setCurrentMemberId(Id);
      setEditForm(true);
      window.scrollTo(0, 0);
    }
  };

  // Submit Form (Create + Update)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!editForm && !image) return toast.error("Image is required");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("jobTitle", form.jobTitle);
    fd.append("aboutMe", form.aboutMe);
    fd.append("description", form.description);
    if (image) fd.append("image", image);

    fd.append("socials", JSON.stringify(form.socials));
    fd.append("skills", JSON.stringify(form.skills));
    fd.append("education", JSON.stringify(form.education));

    try {
      setLoading(true);
      let res;

      if (editForm && currentMemberId) {
        res = await fetch(
          `https://devrolin-backend-production.up.railway.app/api/admin/edit-member/${currentMemberId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          }
        );
      } else {
        res = await fetch(
          "https://devrolin-backend-production.up.railway.app/api/admin/new-member",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          }
        );
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(editForm ? "Member updated" : "Member added");
        setForm({
          name: "",
          jobTitle: "",
          aboutMe: "",
          description: "",
          socials: [{ social: "", url: "" }],
          skills: [{ name: "", proficiency: "" }],
          education: [{ degree: "", year: "", description: "" }],
        });
        setImage(null);
        setImagePreview(null);
        setEditForm(false);
        setCurrentMemberId(null);
        fetchMembers();
      } else {
        toast.error(data.message || "Failed to process request");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Teams</title>
      </Head>
      <AdminLayout>
        <div className="container py-4">
          <h4 className="text-white mb-4">
            {editForm ? "Edit Team Member" : "Add Team Member"}
          </h4>
          <form
            className="row g-3 rounded shadow-sm mb-5"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="col-md-6">
              <label className="form-label text-white">Name</label>
              <input
                type="text"
                className="form-control p-3"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            {/* Job Title */}
            <div className="col-md-6">
              <label className="form-label text-white">Job Title</label>
              <input
                type="text"
                className="form-control p-3"
                required
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              />
            </div>
            {/* About Me */}
            <div className="col-12">
              <label className="form-label text-white">About Me</label>
              <textarea
                className="form-control"
                required
                value={form.aboutMe}
                onChange={(e) => setForm({ ...form, aboutMe: e.target.value })}
              />
            </div>
            {/* Description */}
            <div className="col-12 mb-2">
              <label className="form-label text-white">Description</label>
              <textarea
                className="form-control"
                rows={3}
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* ---- KEEP Socials / Skills / Education sections exactly as you had ---- */}
            {/* socials.map(...) + add/remove button */}
            {/* skills.map(...) + add/remove button */}
            {/* education.map(...) + add/remove button */}

            {form.socials.map((social, index) => (
              <div className="row" key={index}>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white">
                    Social Platform
                  </label>
                  <input
                    type="text"
                    className="form-control p-3"
                    placeholder="Facebook , LinkedIn , Twitter"
                    value={social.social}
                    onChange={(e) => {
                      const socials = [...form.socials];
                      socials[index].social = e.target.value;
                      setForm({ ...form, socials });
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white">Social URL</label>
                  <input
                    type="url"
                    className="form-control p-3"
                    value={social.url}
                    onChange={(e) => {
                      const socials = [...form.socials];
                      socials[index].url = e.target.value;
                      setForm({ ...form, socials });
                    }}
                  />
                </div>
                {form.socials.length > 1 && (
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn mt-3"
                      onClick={() => {
                        const updated = form.socials.filter(
                          (_, i) => i !== index
                        );
                        setForm({ ...form, socials: updated });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {form.socials.length < 3 && (
              <button
                type="button"
                className="btn  mb-3"
                onClick={() =>
                  setForm({
                    ...form,
                    socials: [...form.socials, { social: "", url: "" }],
                  })
                }
              >
                + Add Social
              </button>
            )}

            {/* Skills Input - max 4 */}
            {form.skills.map((skill, index) => (
              <div className="row " key={index}>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white">Skill Name</label>
                  <input
                    type="text"
                    className="form-control p-3"
                    value={skill.name}
                    onChange={(e) => {
                      const skills = [...form.skills];
                      skills[index].name = e.target.value;
                      setForm({ ...form, skills });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-white">
                    Proficiency (%)
                  </label>
                  <input
                    type="number"
                    className="form-control p-3"
                    value={skill.proficiency}
                    onChange={(e) => {
                      const skills = [...form.skills];
                      skills[index].proficiency = e.target.value;
                      setForm({ ...form, skills });
                    }}
                  />
                </div>
                {form.skills.length > 1 && (
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn mt-3"
                      onClick={() => {
                        const updated = form.skills.filter(
                          (_, i) => i !== index
                        );
                        setForm({ ...form, skills: updated });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            {form.skills.length < 4 && (
              <button
                type="button"
                className="btn  mb-3"
                onClick={() =>
                  setForm({
                    ...form,
                    skills: [...form.skills, { name: "", proficiency: "" }],
                  })
                }
              >
                + Add Skill
              </button>
            )}

            {/* Education Input - max 2 */}
            {form.education.map((edu, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-4">
                  <label className="form-label text-white">Degree</label>
                  <input
                    type="text"
                    className="form-control p-3"
                    value={edu.degree}
                    onChange={(e) => {
                      const education = [...form.education];
                      education[index].degree = e.target.value;
                      setForm({ ...form, education });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-white">Year</label>
                  <input
                    type="text"
                    placeholder="2025"
                    className="form-control p-3"
                    value={edu.year}
                    onChange={(e) => {
                      const education = [...form.education];
                      education[index].year = e.target.value;
                      setForm({ ...form, education });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-white">Description</label>
                  <input
                    type="text"
                    className="form-control p-3"
                    value={edu.description}
                    onChange={(e) => {
                      const education = [...form.education];
                      education[index].description = e.target.value;
                      setForm({ ...form, education });
                    }}
                  />
                </div>
                {form.education.length > 1 && (
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn  mt-3"
                      onClick={() => {
                        const updated = form.education.filter(
                          (_, i) => i !== index
                        );
                        setForm({ ...form, education: updated });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {form.education.length < 2 && (
              <button
                type="button"
                className="btn  mb-3"
                onClick={() =>
                  setForm({
                    ...form,
                    education: [
                      ...form.education,
                      { degree: "", year: "", description: "" },
                    ],
                  })
                }
              >
                + Add Education
              </button>
            )}

            {/* Profile Image */}
            <div className="col-12">
              <label className="form-label text-white">Profile Image (345 X 317)</label>
              <input
                type="file"
                className="form-control p-3"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImage(file || null);
                  setImagePreview(file ? URL.createObjectURL(file) : null);
                }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="img-thumbnail mt-2"
                  style={{ maxHeight: 100 }}
                  alt="preview"
                />
              )}
            </div>

            <div className="col-12">
              <button className="btn">
                <i className="fa fa-plus-circle me-2"></i>
                {loading
                  ? editForm
                    ? "Updating..."
                    : "Adding..."
                  : editForm
                  ? "Update Member"
                  : "Add Member"}
              </button>
            </div>
          </form>

          <h4 className="text-white mb-3">Team Members</h4>
          <div className="row">
            {members.map((member) => (
              <div key={member._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card bg-dark text-white border border-secondary position-relative h-100 shadow-sm">
                  <div className="position-absolute p-2 top-0 end-0">
                    <button
                      className="btn-secondary m-2"
                      onClick={() => handleDelete(member._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      className="btn-secondary m-2"
                      onClick={() => handleTeamEdit(member._id)}
                    >
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
                    <p className="small text-secondary">{member.aboutMe}</p>
                    <div className="d-flex justify-content-center gap-2 mt-2">
                      {member.socials.map((social: any, i: number) => (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white admin-social"
                        >
                          <p className="text-capitalize">{social.social}</p>
                        </a>
                      ))}
                    </div>
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
