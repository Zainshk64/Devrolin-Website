import AdminLayout from "@/components/layout/AdminLayout";
import { agencySkillAPI, type AgencySkill } from "@/lib/api";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AgencySkillsAdminPage() {
  useAdminAuth();

  const [skills, setSkills] = useState<AgencySkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    percent: 100,
    sortOrder: 0,
  });

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const data = await agencySkillAPI.getAll();
      setSkills(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load agency skills");
      setSkills([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleDelete = async (id: string) => {
    try {
      await agencySkillAPI.delete(id);
      toast.success("Skill removed");
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) {
      toast.error("Enter a title");
      return;
    }
    if (form.percent < 0 || form.percent > 100) {
      toast.error("Percent must be between 0 and 100");
      return;
    }

    try {
      await agencySkillAPI.create({
        title,
        percent: form.percent,
        sortOrder: form.sortOrder,
      });
      toast.success("Skill added");
      setForm({ title: "", percent: 100, sortOrder: 0 });
      fetchSkills();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <>
      <Head>
        <title>Admin — Agency skills</title>
      </Head>

      <AdminLayout>
        <div className="container my-4">
          <h4 className="text-white mb-4">Agency section skills</h4>
          <p className="text-secondary mb-4">
            Titles and percentages shown on the home page agency block. Lower
            sort order appears first.
          </p>

          <form onSubmit={handleSubmit} className="row g-3 mb-5">
            <div className="col-md-5">
              <label className="form-label text-white">Title</label>
              <input
                type="text"
                className="form-control p-3"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="e.g. Web Application Development"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label text-white">Percent (0–100)</label>
              <input
                type="number"
                min={0}
                max={100}
                className="form-control p-3"
                value={form.percent}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    percent: Number(e.target.value) || 0,
                  }))
                }
              />
            </div>
            <div className="col-md-2">
              <label className="form-label text-white">Sort order</label>
              <input
                type="number"
                className="form-control p-3"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    sortOrder: Number(e.target.value) || 0,
                  }))
                }
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button className="btn w-100" type="submit">
                Add
              </button>
            </div>
          </form>

          <h4 className="text-white mb-3">Current skills</h4>
          {loading ? (
            <p className="text-white-50">Loading…</p>
          ) : skills.length === 0 ? (
            <p className="text-white-50">No skills yet. Add one above.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {skills.map((s) => (
                <li
                  key={s._id}
                  className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>{s.title}</strong>
                    <span className="text-secondary ms-2">{s.percent}%</span>
                    {s.sortOrder !== undefined && s.sortOrder !== 0 && (
                      <span className="text-secondary ms-2">
                        (order {s.sortOrder})
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(s._id)}
                    aria-label={`Delete ${s.title}`}
                  >
                    <i className="fas fa-trash-alt" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </AdminLayout>
    </>
  );
}
