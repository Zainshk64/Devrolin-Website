import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import TeamMembers from "@/components/containers/TeamMembers";

const OurTeams = () => {
  return (
    <Layout header={2} footer={5} video={0}>
      {/* <CmnBanner title="" navigation="Our Teams" /> */}
      {/* <TeamMain /> */}
      <TeamMembers/>
    </Layout>
  );
};

export default OurTeams;
