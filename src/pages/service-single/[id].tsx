import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ServiceDetailsMain from "@/components/containers/service-details/ServiceDetailsMain";
import ServiceDetailsBanner from "@/components/layout/banner/ServiceDetailsBanner";
import UxProcess from "@/components/containers/service-details/UxProcess";
import CtaTwo from "@/components/containers/service-details/CtaTwo";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const ServiceDetails = () => {
    const { id } = useRouter().query;
          const [mainService, setServices] = useState(null);
        
          const fetchServices = async () => {
            try {
              const res = await fetch(`http://localhost:5000/api/services/${id}`);
              const data = await res.json();
            setServices(data);
            } catch (err) {
              toast.error("Failed to fetch Blogd details");
            }
          };
        
          useEffect(() => {
            if (id) fetchServices();
          }, [id]);
        
          if (!mainService) return <p className="text-white text-center">Loading...</p>;
        
  return (
    <Layout header={2} footer={5} video={false}>
      <ServiceDetailsBanner mainService={mainService} />
      <ServiceDetailsMain mainService={mainService} />
      <UxProcess />
      <CtaTwo />
    </Layout>
  );
};

export default ServiceDetails;
