import AdminCreateProject from "@/components/containers/admin/AdminCreateProject";
import AdminProjects from "@/components/containers/admin/AdminProjects";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// 👇 define Project type
interface Project {
  _id: string;
  title: string;
  owner: string;
  sector: string;
  description: string;
  result: string;
  startDate: string;
  endDate: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
}

export default function Projects() {
  useAdminAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null); // ✅ for edit mode

  const fetchProjects = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        "https://devrolin-backend-production.up.railway.app/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects || []);
      } else {
        toast.error(data.message || "Failed to load projects");
      }
    } catch (err) {
      toast.error("Server error while fetching projects");
    }
  };

  const handleDeleteProject = async (id: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        `https://devrolin-backend-production.up.railway.app/api/admin/delete-project/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Project deleted!");
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.message || "Failed to delete project");
      }
    } catch (err) {
      toast.error("Something went wrong while deleting project");
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project); // ✅ send project to form
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Projects</title>
        <meta
          name="description"
          content="The official Next.js Admin Dashboard"
        />
      </Head>
      <AdminLayout>
        <AdminCreateProject
          onProjectAdded={fetchProjects}
          editingProject={editingProject} // ✅ pass project to form
          clearEditing={() => setEditingProject(null)} // ✅ reset after edit
        />
        <AdminProjects
          projects={projects}
          onDelete={handleDeleteProject}
          onEdit={handleEditProject} // ✅ send edit handler
        />
      </AdminLayout>
    </>
  );
}
