import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ContactMain from "@/components/containers/ContactMain";
import { StartProjectButton } from "@/components/ConsultForm";
import Head from "next/head"
const ContactUs = () => {
  return (
    <>
    <Head>
        <title>Contact Us | DevRolin</title>
        <meta name="description" content="Get in touch with DevRolin for AI automation, CRM, SaaS and custom system development." />
        <link rel="canonical" href="https://devrolin.com/contact-us" />
      </Head>

    <Layout header={2} footer={5} video={0}>
      <CmnBanner title="Contact Us" navigation="Contact Us" />
      <ContactMain />

    </Layout>
    </>
  );
};

export default ContactUs;
