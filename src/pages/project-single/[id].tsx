// pages/project-single/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "react-hot-toast";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ProjectDetailsMain from "@/components/containers/project/ProjectDetailsMain";

// ✅ Define the shape of a Project (adjust fields if API differs)
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
  mainImage?: {
    url: string;
    alt?: string;
  };
  snapshots?: { url: string; alt?: string }[];
  testimonial?: { client: string; quote: string }[];
}

export default function ProjectDetailsPage() {
  const { id } = useRouter().query;
  const [project, setProject] = useState<Project | null>(null);

  const fetchProject = async () => {
    try {
      const res = await fetch(
        `https://devrolin.com/api/projects/${id}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch project");
      }

      const data: Project = await res.json();
      setProject(data);
    } catch (err) {
      toast.error("Failed to fetch project details");
    }
  };

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  if (!project) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <Layout header={2} footer={5} video={0}>
      <CmnBanner
        title={project.title} // ✅ safe now
        navigation="Project Details"
        parentLink="projects"
      />
      <ProjectDetailsMain project={project} />
    </Layout>
  );
}
