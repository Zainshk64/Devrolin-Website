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
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://devrolin.com/service-single/${slug}#service`,
      name: service?.title,
      serviceType: service?.title,
      description: service?.description,
      url: `https://devrolin.com/service-single/${slug}`,
      provider: {
        "@type": "Organization",
        "@id": "https://devrolin.com/#organization",
        name: "DevRolin",
        url: "https://devrolin.com",
        logo: "https://devrolin.com/og-image.jpg"
      },
      areaServed: {
        "@type": "Place",
        name: "Worldwide"
      },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Startups, agencies, SaaS companies and operations-heavy businesses"
      },
      category: [
        "AI Automation",
        "AI Integrations",
        "CRM Systems",
        "Revenue Systems",
        "SaaS Development",
        "Custom Software Development"
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "DevRolin Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Automation & Integrations",
              description: "AI-powered automation and integrations built to reduce manual work and improve operational efficiency."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CRM & Revenue Systems",
              description: "CRM and revenue systems designed to manage leads, automate follow-ups and improve sales operations."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SaaS & MVP Development",
              description: "SaaS products and MVPs built for startups and businesses that need scalable digital platforms."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web & Custom Platforms",
              description: "Custom websites, portals and business platforms built around real operational needs."
            }
          }
        ]
      }
    }),
  }}
/>
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
