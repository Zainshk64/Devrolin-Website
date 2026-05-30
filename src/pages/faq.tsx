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
        <meta name="description" content="Frequently asked questions about DevRolin services, pricing and systems." />
        <link rel="canonical" href="https://devrolin.com/faq" />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What services does DevRolin offer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "DevRolin provides AI automation, CRM systems, SaaS development and custom business platforms.",
                  },
                },
                // Add more FAQs here
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
