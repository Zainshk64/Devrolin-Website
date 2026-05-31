// pages/project-single/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "react-hot-toast";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ProjectDetailsMain from "@/components/containers/project/ProjectDetailsMain";
import Head from 'next/head'
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
  const [project, setProject] = useState<Project | null>(null);
  const { slug } = useRouter().query;

    const projectTitle = slug ? slug.toString().replace(/-/g, ' ').toUpperCase() : "Project";

  const fetchProject = async () => {
    try {
      const res = await fetch(
        `https://devrolin-backend-production.up.railway.app/api/projects/name/${encodeURIComponent(slug as string)}`
      );
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      setProject(data);
    } catch (err) {
      toast.error("Failed to fetch project details");
    }
  };

  useEffect(() => {
    if (slug) fetchProject();
  }, [slug]);
  if (!project) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <>
      <Head>
  <title>{`${projectTitle} | AI Automation, CRM, SaaS & Custom Project | DevRolin`}</title>

  <meta
    name="description"
    content={`Explore ${projectTitle}, a DevRolin project built with secure execution, data privacy and scalable systems across AI automation, integrations, CRM, SaaS and custom business platforms.`}
  />
  <meta
    name="keywords"
    content={`${projectTitle}, DevRolin project, AI automation project, AI integration project, CRM system project, SaaS development project, custom software project, business automation case study`}
  />

  <link rel="canonical" href={`https://devrolin.com/project-single/${slug}`} />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${projectTitle} | DevRolin Project`} />
  <meta
    property="og:description"
    content={`See how DevRolin built ${projectTitle} with secure systems, data privacy and scalable execution for business growth.`}
  />
  <meta property="og:url" content={`https://devrolin.com/project-single/${slug}`} />
  <meta property="og:image" content="https://devrolin.com/og-image.jpg" />
  <meta property="og:site_name" content="DevRolin" />
</Head>
    <Layout header={2} footer={5} video={0}>
      <CmnBanner
        title={project.title} // ✅ safe now
        navigation="Project Details"
        parentLink="projects"
        />
      <ProjectDetailsMain project={project} />
    </Layout>
        </>
  );
}
