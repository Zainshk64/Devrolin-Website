import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ServiceDetailsMain from "@/components/containers/service-details/ServiceDetailsMain";
import ServiceDetailsBanner from "@/components/layout/banner/ServiceDetailsBanner";
import UxProcessTwo from "@/components/containers/service-details/UxProcessTwo";
import CtaTwo from "@/components/containers/service-details/CtaTwo";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
// import Head from 'next/head'
const serviceData = {
"ai-automation-systems": {
  title: "AI Automation & Integration Systems",
  description: "Automate workflows, integrate disconnected tools, and scale operations using AI systems.",
},
"crm-revenue-automation": {
  title: "CRM & Revenue Systems",
  description: "Custom CRM and revenue automation systems designed to improve lead management and sales operations.",
},
"saas-mvp-development": {
  title: "SaaS & MVP Development",
  description: "Launch scalable SaaS products and MVPs with modern infrastructure and payment systems.",
},
"custom-web-platforms": {
  title: "Custom Web Platforms",
  description: "Custom business platforms and operational systems designed for scalable growth.",
},
};
const ServiceDetails = () => {
  const service = serviceData[slug as string] || serviceData["ai-automation-systems"];
  const { slug } = useRouter().query;
  const [mainService, setServices] = useState(null);


  const fetchServices = async () => {
    try {
      const res = await fetch(
        `https://devrolin-backend-production.up.railway.app/api/services/name/${encodeURIComponent(slug as string)}`,
      );
      const data = await res.json();
      setServices(data);
    } catch (err) {
      toast.error("Failed to fetch services details");
    }
  };

  useEffect(() => {
    if (slug) fetchServices();
  }, [slug]);

  if (!mainService) return <p className="text-white text-center">Loading...</p>;

  return (
    <>
     {/* <Head>
        <title>{service.title} | DevRolin</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={`https://devrolin.com/service-single/${slug}`} />
        
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={`https://devrolin.com/service-single/${slug}`} />
        <meta property="og:image" content="https://devrolin.com/og-image.jpg" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: service.title,
              provider: {
                "@type": "Organization",
                name: "DevRolin",
              },
              areaServed: "Worldwide",
            }),
          }}
        />
      </Head> */}
    <Layout header={2} footer={5} video={false}>
      <ServiceDetailsBanner mainService={mainService} />
      <ServiceDetailsMain mainService={mainService} />
      <UxProcessTwo mainService={mainService} />  {/* ✅ Pass service data */}
      <CtaTwo />
    </Layout>
    </>
  );
};

export default ServiceDetails;
