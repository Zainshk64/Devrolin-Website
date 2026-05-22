import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ServiceMain from "@/components/containers/ServiceMain";
import HomeTwoModal from "@/components/containers/home-two/HomeTwoModal";
import UxProcessTwo from "@/components/containers/service-details/UxProcessTwo";
import HomeTestimonialThree from "@/components/containers/home-three/HomeTestimonialThree";
import CtaTwo from "@/components/containers/service-details/CtaTwo";
import HomeTestimonial from "@/components/containers/home/HomeTestimonial";
// import Head from "next/head"
const OurServices = () => {
  return (
    <>
     {/* <Head>
        <title>Our Services | DevRolin</title>
        <meta 
          name="description" 
          content="Explore AI automation, CRM systems, SaaS development, and custom web platforms designed to scale your business operations." 
        />
        <link rel="canonical" href="https://devrolin.com/our-services" />
        
        <meta property="og:title" content="Our Services | DevRolin" />
        <meta property="og:url" content="https://devrolin.com/our-services" />
        <meta property="og:image" content="https://devrolin.com/og-image.jpg" />
      </Head> */}
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
