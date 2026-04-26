import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';

import { toast } from 'react-hot-toast';
import CmnBanner from '@/components/layout/banner/CmnBanner';
import TeamDetailsMain from '@/components/containers/TeamDetailsMain';
import CtaTwo from '@/components/containers/service-details/CtaTwo';

export default function TeamMemberPage() {
  const router = useRouter();
  const { id } = router.query;
  const [member, setMember] = useState<any>(null);

  const fetchMember = async () => {
    try {
      const res = await fetch(`https://devrolin-backend-production.up.railway.app/api/members/${id}`);
      const data = await res.json();
      setMember(data);
    } catch (err) {
      toast.error("Failed to fetch team member");
    }
  };

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  if (!member) return <p className="text-white text-center">Loading...</p>;

  return (
    <Layout header={2} footer={5} video={0}>
      <CmnBanner
        title={member.name}
        navigation="Team Details"
        parent="Our Teams"
        parentLink="/our-teams"
      />
      
      <TeamDetailsMain member={member} />
      <CtaTwo />
    </Layout>
  );
}
