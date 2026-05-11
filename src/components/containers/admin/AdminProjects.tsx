import React from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface Project {
  _id: string;
  title: string;
  owner: string;
  category: string;
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

interface AdminProjectsProps {
    projects: Project[];
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void; // ✅ add

}

export default function AdminProjects({
  projects,
  onDelete,
  onEdit,
}: AdminProjectsProps) {
  useAdminAuth();

  return (
    <div className="container mt-4">
      <h4 className="text-white mb-4">All Projects</h4>

      {projects.length > 0 ? (
        <div className="row">
          {projects.map((project) => (
            <div key={project._id} className="col-20 col-md-8 col-lg-6 mb-4">
              <div className="card bg-black text-white border border-secondary h-100 position-relative">
                <img
                  src={project.thumbnail?.url}
                  className="card-img-top img-fluid"
                  alt={project.thumbnail?.alt || "project"}
                  style={{ height: 300, objectFit: "cover" }}
                />

                {/* Delete Button */}
                <div className="position-absolute p-2 top-0 end-0">
                  <button className="m-2 bg-danger rounded p-2 " onClick={() => onDelete(project._id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>

                  <button className="m-2 bg-secondary p-2 rounded" onClick={() => onEdit(project)}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="mb-1">
                    <strong>Owner:</strong> {project.owner}
                  </p>
                  <p className="mb-1">
                    <strong>Sector:</strong> {project.sector}
                  </p>
                  <p className="small text-secondary">{project.description}</p>
                  <p className="mb-1">
                    <strong>Duration:</strong>{" "}
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </p>
                  <p className="mb-0">
                    <strong>Result:</strong> {project.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center mt-4">No projects found.</p>
      )}
    </div>
  );
}
