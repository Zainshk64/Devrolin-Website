import React from "react";
import Layout from "@/components/layout/Layout";
import HomeOneBanner from "@/components/layout/banner/HomeOneBanner";
import Agency from "@/components/containers/home/Agency";
import PortfolioText from "@/components/containers/home/PortfolioText";
import HomeOffer from "@/components/containers/home/HomeOffer";
import HomeTestimonial from "@/components/containers/home/HomeTestimonial";
import HomeBlog from "@/components/containers/home/HomeBlog";
import HomeSponsor from "@/components/containers/home/HomeSponsor";
import NextPage from "@/components/containers/home/NextPage";
// import Head from "next/head";
const Home = () => {
  return (
    <>
       {/* <Head>
        <title>DevRolin | AI Automation, CRM & SaaS Systems Company</title>
        
        <meta 
          name="description" 
          content="DevRolin builds AI automation, CRM, SaaS, and custom business systems that eliminate manual work, automate operations, and help businesses scale revenue across 35+ countries." 
        />
        
        <meta 
          name="keywords" 
          content="AI Automation, CRM Systems, SaaS Development, AI Agents, Revenue Systems, Business Automation, Custom Platforms, AI Integration" 
        />
        
        <link rel="canonical" href="https://devrolin.com" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devrolin.com" />
        <meta property="og:title" content="DevRolin | AI Systems That Scale Revenue" />
        <meta property="og:description" content="AI, CRM, and SaaS systems built to automate operations and scale businesses." />
        <meta property="og:image" content="https://devrolin.com/og-image.jpg" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="DevRolin" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevRolin | AI Systems That Scale Revenue" />
        <meta name="twitter:description" content="AI automation, CRM, SaaS, and custom business systems." />
        <meta name="twitter:image" content="https://devrolin.com/og-image.jpg" />
      </Head> */}

    <Layout header={1} footer={1} video={true}>
      <HomeOneBanner />
      <Agency />
      <HomeOffer />
      <PortfolioText />
      <HomeTestimonial />
      <HomeSponsor />
      <HomeBlog />
      <NextPage />
    </Layout>
    </>
  );
};

export default Home;
