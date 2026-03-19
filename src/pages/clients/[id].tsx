// import ClientDetails from "@/components/ClientDetails";

// // ✅ Next.js 13 - params is a regular object
// interface PageProps {
//   params: { id: string };
// }

// export default function ClientPage({ params }: PageProps) {
//   return <ClientDetails params={params} />;
// }

// // Optional: pre-generate static pages at build time
// export async function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }

import { useRouter } from "next/router";
import ClientDetails from "@/components/ClientDetails";

export default function ClientPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>Loading...</div>;

  return <ClientDetails id={id as string} />;
}