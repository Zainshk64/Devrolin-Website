"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { toast } from "react-hot-toast";

const AdminLogin = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name || !password) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Save token and user
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      toast.success("Login successful");
      router.push("/admin");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout header={1} footer={5} video={0}>
      <div className="d-flex justify-content-center align-items-center vh-100  text-white">
        <div
          className="card bg-black shadow p-4"
          style={{
            maxWidth: "400px",
            width: "100%",
            border: "2px solid #FF7425",
          }}
        >
          <div className="card-body ">
            <h4 className="card-title text-center mb-4">Admin Login</h4>

            <div className="form-group-single">
              <input
                type="text"
                placeholder="Username"
                value={name}
                className="text-lowercase"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group-single">
              <input
                type="password"
                placeholder="Password"
                className="text-lowercase"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="btn btn--primary w-100"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
