import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ServiceDetailsMain from "@/components/containers/service-details/ServiceDetailsMain";
import ServiceDetailsBanner from "@/components/layout/banner/ServiceDetailsBanner";
import UxProcessTwo from "@/components/containers/service-details/UxProcessTwo";
import CtaTwo from "@/components/containers/service-details/CtaTwo";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Head from 'next/head'
type ServiceSlug =
  | "ai-automation-systems"
  | "crm-revenue-automation"
  | "saas-mvp-development"
  | "custom-web-platforms";

const serviceData: Record<
  ServiceSlug,
  { title: string; description: string }
> = {
  "ai-automation-systems": {
    title: "AI Automation & Integration Systems",
    description:
      "Automate workflows, integrate disconnected tools and scale operations using AI systems.",
  },

  "crm-revenue-automation": {
    title: "CRM & Revenue Systems",
    description:
      "Custom CRM and revenue automation systems designed to improve lead management and sales operations.",
  },

  "saas-mvp-development": {
    title: "SaaS & MVP Development",
    description:
      "Launch scalable SaaS products and MVPs with modern infrastructure and payment systems.",
  },

  "custom-web-platforms": {
    title: "Custom Web Platforms",
    description:
      "Custom business platforms and operational systems designed for scalable growth.",
  },
};
const ServiceDetails = () => {
  const { slug } = useRouter().query;
const service =
  serviceData[(slug as ServiceSlug) || "ai-automation-systems"];  
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
    <Head>
  <title>{`${service?.title} | AI Automation, CRM, SaaS & Custom Systems | DevRolin`}</title>

  <meta
    name="description"
    content={`${service?.description} DevRolin builds secure, scalable and revenue-focused systems with strong data privacy, clean execution and global delivery across 35+ countries.`}
  />

  <meta
    name="keywords"
    content={`${service?.title}, DevRolin services, AI automation services, AI integration services, CRM systems, revenue systems, SaaS development, custom software development, business automation, workflow automation`}
  />

  <link rel="canonical" href={`https://devrolin.com/service-single/${slug}`} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={`${service?.title} | DevRolin`} />
  <meta
    property="og:description"
    content={`${service?.description} Built with secure execution, data privacy and scalable systems for growing businesses.`}
  />
  <meta property="og:url" content={`https://devrolin.com/service-single/${slug}`} />
  <meta property="og:image" content="https://devrolin.com/og-image.jpg" />
  <meta property="og:site_name" content="DevRolin" />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service?.title,
        serviceType: service?.title,
        description: service?.description,
        provider: {
          "@type": "Organization",
          name: "DevRolin",
          url: "https://devrolin.com",
          logo: "https://devrolin.com/og-image.jpg"
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide"
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "DevRolin Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Automation & Integrations"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "CRM & Revenue Systems"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SaaS & MVP Development"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Web & Custom Platforms"
              }
            }
          ]
        }
      }),
    }}
  />
</Head>
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
