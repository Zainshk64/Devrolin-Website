// pages/admin/play-video/index.js
"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function AdminPlayVideo() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const res = await fetch("https://devrolin-backend-production.up.railway.app/api/admin/play-video", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.exists) {
        setCurrentVideo(data.video);
      }
    } catch (err) {
      toast.error("Failed to load video");
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      setUploading(true);
      const res = await fetch("https://devrolin-backend-production.up.railway.app/api/admin/upload-play-video", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Video uploaded successfully!");
        setCurrentVideo(data);
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Something went wrong during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteVideo = async () => {
    if (!currentVideo) return;
    if (!confirm("Are you sure you want to delete this video?")) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://devrolin-backend-production.up.railway.app/api/admin/delete-play-video/${currentVideo._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Video deleted");
        setCurrentVideo(null);
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Error deleting video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin | Play Button Video</title>
      </Head>
      <AdminLayout>
        <div className="container mt-4">
          <h4 className="text-white mb-4">Play Button Video</h4>

          <div className="card bg-dark text-white p-4">
            <label className="form-label text-white d-block">
              Upload Hero Banner Video (MP4, WebM, etc.)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              disabled={uploading}
              className="form-control bg-secondary text-white"
            />
            {uploading && <p className="text-info mt-2">Uploading...</p>}
          </div>

          {/* Current Video Preview */}
          {currentVideo && (
            <div className="mt-5">
              <h5 className="text-white">Current Video</h5>
              <div style={{ position: "relative", width: "100%", maxWidth: 600 }}>
                <video
                  src={currentVideo.videoUrl}
                  controls
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    marginTop: "1rem",
                  }}
                />
                <button
                  onClick={handleDeleteVideo}
                  disabled={loading}
                  className="btn btn-danger mt-3"
                >
                  {loading ? "Deleting..." : "Delete Video"}
                </button>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}