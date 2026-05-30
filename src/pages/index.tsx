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
import Head from "next/head";
const Home = () => {
  return (
    <>
       <Head>
        <title>DevRolin | AI Automation, CRM & Revenue Systems for Growing Businesses</title>

<meta
  name="description"
  content="Scale faster with AI automation, CRM systems, SaaS development and custom platforms. DevRolin builds revenue-driving systems that eliminate manual work, streamline operations and accelerate business growth."
/>

<meta
  name="keywords"
  content="AI Automation Services, CRM Development, Revenue Operations, SaaS Development Company, AI Agents, Business Process Automation, Custom Software Development, CRM Automation, AI Integration, Revenue Systems"
/>

<meta property="og:title" content="DevRolin | AI Automation & Revenue Systems That Scale Businesses" />

<meta property="og:description" content="We build AI automation, CRM, SaaS and custom business systems that reduce manual work, improve operations and increase revenue." />
      </Head>

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
