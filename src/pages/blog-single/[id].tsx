import BlogDetailsMain from "@/components/containers/blog/BlogDetailsMain";
import BlogSingleBanner from "@/components/layout/banner/BlogSingleBanner";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const BlogDetais = () => {
     const { id } = useRouter().query;
      const [blogs, setBlogs] = useState(null);
    
      const fetchBlogs = async () => {
        try {
          const res = await fetch(`https://devrolin-backend-production.up.railway.app/api/blogs/${id}`);
          const data = await res.json();
          setBlogs(data);
          console.log(data);
          
        } catch (err) {
          toast.error("Failed to fetch details");
        }
      };
    
      useEffect(() => {
        if (id) fetchBlogs();
      }, [id]);
    
      if (!blogs) return <p className="text-white text-center">Loading...</p>;
    
  return (
    <Layout header={2} footer={5} video={0}>
      <BlogSingleBanner blogs={blogs} />
      <BlogDetailsMain blogs={blogs} />
    </Layout>
  );
};

export default BlogDetais;
