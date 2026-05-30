import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ProjectMain from "@/components/containers/project/ProjectMain";
import WorkStepsProject from "@/components/containers/project/WorkStepsProject";
import CtaTwo from "@/components/containers/service-details/CtaTwo";
import { toast } from "react-hot-toast";
import Head from 'next/head'
const OurProjects = () => {
  const [projects, setProjects] = useState([]);
  
    const fetchProjects = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const res = await fetch('https://devrolin-backend-production.up.railway.app/api/projects/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
        if (res.ok) {
          setProjects(data.projects || []);
        } else {
          toast.error(data.message || 'Failed to load projects');
        }
      } catch (err) {
        toast.error('Server error while fetching projects');

      }
    };
  
    useEffect(() => {

      fetchProjects();
    }, []);
  return (
    <>
    <Head>
        <Head>
  <title>AI Automation, CRM, SaaS & Custom Software Projects | DevRolin</title>

  <meta
    name="description"
    content="Powering systems used by businesses reaching 1M+ audiences. Explore AI automation and integrations, CRM and revenue systems, SaaS MVPs and custom platforms built with enterprise-grade security, scalability and data privacy."
  />

  <meta
    name="keywords"
    content="AI Automation Projects, AI Integration Projects, CRM Projects, Revenue Systems, SaaS MVP Development, Custom Software Projects, Web Platform Development, Business Automation Solutions, CRM Automation, AI Agents"
  />

  <link rel="canonical" href="https://devrolin.com/our-projects" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="AI Automation, CRM, SaaS & Custom Software Projects | DevRolin" />
  <meta
    property="og:description"
    content="Powering systems used by businesses reaching 1M+ audiences. See how DevRolin builds secure AI automation, CRM, SaaS and custom platform solutions designed to scale businesses."
  />
  <meta property="og:url" content="https://devrolin.com/our-projects" />
  <meta property="og:image" content="https://devrolin.com/og-image.jpg" />
  <meta property="og:site_name" content="DevRolin" />
</Head>
      </Head>
    <Layout header={2} footer={5} video={0}>
      <CmnBanner title="Our Projects" navigation="Our Projects" />
      <ProjectMain projects={projects} />
      <WorkStepsProject />
      <CtaTwo />
    </Layout>
    </>
  );
};

export default OurProjects;
