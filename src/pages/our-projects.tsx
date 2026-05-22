import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ProjectMain from "@/components/containers/project/ProjectMain";
import WorkStepsProject from "@/components/containers/project/WorkStepsProject";
import CtaTwo from "@/components/containers/service-details/CtaTwo";
import { toast } from "react-hot-toast";
// import Head from 'next/head'
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
    {/* <Head>
        <title>Our Projects | DevRolin</title>
        <meta 
          name="description" 
          content="Explore AI automation projects, CRM systems, SaaS platforms, and custom business solutions built by DevRolin." 
        />
        <link rel="canonical" href="https://devrolin.com/our-projects" />
        
        <meta property="og:title" content="Our Projects | DevRolin" />
        <meta property="og:url" content="https://devrolin.com/our-projects" />
      </Head> */}
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
