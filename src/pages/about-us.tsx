import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import HomeTwoModal from "@/components/containers/home-two/HomeTwoModal";
import Agency from "@/components/containers/home/Agency";
import TeamMembers from "@/components/containers/TeamMembers";
import HomeTestimonial from "@/components/containers/home/HomeTestimonial";
import HomeSponsor from "@/components/containers/home/HomeSponsor";
import AboutCta from "@/components/containers/home-two/AboutCta";
// import Head from "next/head"
const AboutUs = () => {
  return (
    <>
      {/* <Head>
        <title>About Us | DevRolin</title>
        <meta 
          name="description" 
          content="Learn about DevRolin, a global AI automation and business systems company serving 35+ countries." 
        />
        <link rel="canonical" href="https://devrolin.com/about-us" />
      </Head> */}
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
