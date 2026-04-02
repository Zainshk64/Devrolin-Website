import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import logo from "public/images/Company-Logo-Normal-1/1.svg";
import Image from "next/image";

const tabs = [
  { name: "Dashboard", href: "/admin" },
  { name: "Blogs", href: "/admin/blogs" },
  { name: "Services", href: "/admin/services" },
  { name: "Our services", href: "/admin/our-services" },
  { name: "Projects", href: "/admin/projects" },
  { name: "Team Members", href: "/admin/teams" },
  { name: "Testimonials", href: "/admin/testimonial" },
  { name: "Agency skills", href: "/admin/agency-skills" },
  { name: "Home sponsor", href: "/admin/home-sponsor" },
  { name: "Clients", href: "/admin/client" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("https://devrolin.com/api/admin/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Logged out successfully");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Logout request failed");
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      router.push("/admin/login");
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <nav className="navbar navbar-dark bg-dark d-md-none px-3">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setShowSidebar(true)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar__logo">
          <Link href="/" aria-label="go to home">
            <Image src={logo} height={78} width={168} alt="Image" priority />
          </Link>
        </div>
      </nav>

      {/* Main layout */}
      <div className="container-fluid text-white p-0">
        <div className="row m-0">
          {/* Fixed Sidebar for md+ */}
          <div
            className="d-none d-md-block col-md-3 col-xl-2 text-black p-0"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              borderRight: "1px solid #dee2e6",
              zIndex: 1040,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div className="flex-shrink-0 px-2 pt-3 text-center w-100">
              <div className="mb-3">
                <Link href="/" aria-label="go to home">
                  <Image
                    src={logo}
                    height={78}
                    width={168}
                    alt="Image"
                    priority
                  />
                </Link>
              </div>
            </div>
            <div
              className="flex-grow-1 px-2 w-100"
              style={{ minHeight: 0, overflowY: "auto" }}
            >
              <ul className="nav nav-pills flex-column w-100 pb-2">
                {tabs.map((tab) => (
                  <li key={tab.name} className="w-100 mb-2">
                    <Link
                      href={tab.href}
                      className="nav-link btn w-100 px-3 py-2 rounded"
                    >
                      {tab.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 px-2 pb-3 pt-2 w-100">
              <button
                onClick={handleLogout}
                className="btn btn--secondary w-100"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Offcanvas Sidebar for mobile */}
          <div
            className={`offcanvas offcanvas-start text-bg-dark ${
              showSidebar ? "show" : ""
            }`}
            tabIndex={-1}
            style={{ visibility: showSidebar ? "visible" : "hidden" }}
            onClick={() => setShowSidebar(false)}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Admin Panel</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowSidebar(false)}
              ></button>
            </div>
            <div
              className="offcanvas-body"
              style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}
            >
              <ul className="nav flex-column">
                {tabs.map((tab) => (
                  <li key={tab.name} className="mb-2">
                    <Link
                      href={tab.href}
                      className="btn btn-warning-subtle w-100 text-start px-3 py-2 rounded"
                    >
                      {tab.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleLogout}
                className="btn btn-warning mt-4 w-100"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main content */}
          <div
            className="col py-4 px-4 offset-md-3 offset-xl-2"
            style={{
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <h4 className="fw-bold mb-3 text-white">Welcome Admin! 👋</h4>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
