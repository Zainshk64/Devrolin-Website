import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import FaqMain from "@/components/containers/FaqMain";
import Head from 'next/head'
const FaqPage = () => {
  return (
    <>
          <Head>
  <title>FAQ | DevRolin</title>

  <meta
    name="description"
    content="Frequently asked questions about data privacy, security, AI automation, CRM systems, SaaS development, project timelines and working with DevRolin."
  />

  <link rel="canonical" href="https://devrolin.com/faq" />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does DevRolin protect client data and privacy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Data security and privacy are built into every project. We follow secure development practices, controlled access policies and industry-standard security measures to protect sensitive business information.",
            },
          },
          {
            "@type": "Question",
            name: "What services does DevRolin offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "DevRolin provides AI automation and integrations, CRM and revenue systems, SaaS and MVP development, and custom web and software platforms.",
            },
          },
          {
            "@type": "Question",
            name: "Can you integrate AI into our existing systems?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We integrate AI capabilities into existing business systems, CRMs, workflows, websites and internal operations to improve efficiency and reduce manual work.",
            },
          },
          {
            "@type": "Question",
            name: "Do you build custom CRM and revenue systems?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We design and implement CRM and revenue systems tailored to your sales process, customer journey and operational requirements.",
            },
          },
          {
            "@type": "Question",
            name: "Can you develop SaaS products and MVPs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We help startups and businesses build SaaS products, MVPs and scalable software solutions from planning to deployment.",
            },
          },
          {
            "@type": "Question",
            name: "How long does a typical project take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Timelines depend on project scope. Smaller automation projects may take a few weeks while larger SaaS platforms and custom systems typically require a longer development cycle.",
            },
          },
          {
            "@type": "Question",
            name: "Do you work with international clients?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. DevRolin works with businesses across 35+ countries and supports clients remotely through structured communication and project management processes.",
            },
          }
        ],
      }),
    }}
  />
</Head>


    <Layout header={2} footer={5} video={0}>
      <CmnBanner title="Faq" navigation="Faq" />
      <FaqMain />
    </Layout>
    </>
  );
};

export default FaqPage;
