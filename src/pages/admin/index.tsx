import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { API_BASE } from "@/lib/api";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface DashboardStats {
  blogs: number;
  members: number;
  projects: number;
  services: number;
  testimonials: number;
  clients: number;
  invoices: number;
}

export default function AdminDashboard() {
  useAdminAuth();

  const [allStats, setAllStats] = useState<DashboardStats | null>(null);

  const fetchAllStats = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE}/admin/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllStats(data.stats);
    } catch (err) {
      toast.error("Failed to fetch Stats");
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  const cards = [
    {
      label: "Blogs",
      value: allStats?.blogs || 0,
      icon: "fa-solid fa-blog",
      bg: "bg-dark",
    },
    {
      label: "Members",
      value: allStats?.members || 0,
      icon: "fa-solid fa-users",
      bg: "bg-success",
    },
    {
      label: "Projects",
      value: allStats?.projects || 0,
      icon: "fa-solid fa-diagram-project",
      bg: "bg-info",
    },
    {
      label: "Services",
      value: allStats?.services || 0,
      icon: "fa-solid fa-cogs",
      bg: "bg-warning",
    },
    {
      label: "Testimonials",
      value: allStats?.testimonials || 0,
      icon: "fa-solid fa-comment-dots",
      bg: "bg-danger",
    },
    {
      label: "Clients",
      value: allStats?.clients || 0,
      icon: "fa-solid fa-handshake",
      bg: "bg-dark",
    },
    {
      label: "Invoices",
      value: allStats?.invoices || 0,
      icon: "fa-solid fa-file-invoice-dollar",
      bg: "bg-dark",
    },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="The official Next.js Admin Dashboard"
        />
      </Head>

      <AdminLayout>
        <div className="container mt-4">
          <h4 className="text-white mb-4">Welcome to the Admin Dashboard</h4>

          <div className="row">
            {cards.map((card, idx) => (
              <div className="col-sm-6 col-lg-4 mb-4" key={idx}>
                <div
                  className="card text-white bg-dark hover-translate shadow-sm h-100"
                  style={{ border: "2px solid #fc8403" }}
                >
                  <div className="card-body d-flex align-items-center">
                    <i className={`${card.icon} fa-2x me-3`}></i>
                    <div>
                      <h6 className="mb-1">{card.label}</h6>
                      <h4 className="mb-0">{card.value}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
