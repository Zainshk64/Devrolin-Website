import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import HomeTwoModal from "@/components/containers/home-two/HomeTwoModal";
import Agency from "@/components/containers/home/Agency";
import TeamMembers from "@/components/containers/TeamMembers";
import HomeTestimonial from "@/components/containers/home/HomeTestimonial";
import HomeSponsor from "@/components/containers/home/HomeSponsor";
import AboutCta from "@/components/containers/home-two/AboutCta";
import Head from "next/head"
const AboutUs = () => {
  return (
    <>
      <Head>
       <Head>
  <title>About DevRolin | AI Automation, CRM & SaaS Development Company</title>

  <meta
    name="description"
    content="Trusted by businesses across 35+ countries. DevRolin builds AI automation and integrations, CRM and revenue systems, SaaS products and custom business platforms that help companies streamline operations and scale faster."
  />

  <link rel="canonical" href="https://devrolin.com/about-us" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="About DevRolin | AI Automation, CRM & SaaS Development Company" />
  <meta property="og:description" content="Trusted by businesses across 35+ countries. DevRolin builds AI automation, CRM, SaaS and custom business systems designed for growth." />
  <meta property="og:url" content="https://devrolin.com/about-us" />
  <meta property="og:image" content="https://devrolin.com/og-image.jpg" />
  <meta property="og:site_name" content="DevRolin" />
</Head>
      </Head>
    <Layout header={2} footer={5} video={0}>
      <CmnBanner title="About Us" navigation="About Us" />
      <HomeTwoModal />
      <Agency />
      <TeamMembers />
      <HomeTestimonial />
      <HomeSponsor />
      <AboutCta />
    </Layout>
    </>
  );
};

export default AboutUs;
