import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ServiceMain from "@/components/containers/ServiceMain";
import HomeTwoModal from "@/components/containers/home-two/HomeTwoModal";
import UxProcessTwo from "@/components/containers/service-details/UxProcessTwo";
import HomeTestimonialThree from "@/components/containers/home-three/HomeTestimonialThree";
import CtaTwo from "@/components/containers/service-details/CtaTwo";
import HomeTestimonial from "@/components/containers/home/HomeTestimonial";
import Head from "next/head"
const OurServices = () => {
  return (
    <>
     <Head>
       <title>AI Automation, AI Integrations, CRM & SaaS Development Services | DevRolin</title>

<meta
  name="description"
  content="Scale your business with AI automation, AI integrations, CRM systems, SaaS development and custom software solutions. DevRolin builds revenue-focused systems that streamline operations, eliminate manual work and support growth."
/>

<meta
  name="keywords"
  content="AI Automation Services, AI Integration Services, CRM Development, CRM Automation, SaaS Development, Custom Software Development, Business Process Automation, Revenue Operations, AI Agents, Workflow Automation"
/>

<meta property="og:title" content="AI Automation, AI Integrations, CRM & SaaS Development Services | DevRolin" />

<meta property="og:description" content="AI automation, AI integrations, CRM systems, SaaS development and custom software solutions built to streamline operations and scale businesses." />

      </Head>
    <Layout header={2} footer={5} video={0}>
      <CmnBanner title="Our Services" navigation="Our Services" />
      <ServiceMain />
      <HomeTwoModal />
      {/* <UxProcessTwo /> */}
      <HomeTestimonial/>
      <CtaTwo/>
    </Layout>
    </>
  );
};

export default OurServices;
