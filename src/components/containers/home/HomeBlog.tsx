import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import one from "public/images/blog/one.png";
import two from "public/images/blog/two.png";
import { toast } from "react-hot-toast";
import moment from "moment";

const HomeBlog = () => {
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  const fetchBlogs = async () => {
    try {
      const recent = await fetch("http://localhost:5000/api/blogs/recent").then(
        (res) => res.json()
      );
      setRecentBlogs(recent);
    } catch (err) {
      toast.error("Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="section blog fade-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title">
                news & Blog
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">what&apos;s new in blog</h2>
            </div>
          </div>
        </div>
        <div className="row gaper">
          {recentBlogs.slice(1, 3).map((blog: any) => (
            <div className="col-12 col-md-6">
              <div className="blog__single fade-top">
                <div className="blog__single-thumb topy-tilt">
                  <Link href={`/blog-single/${blog._id}`}>
                    <Image src={blog.mainImage?.url} width={550} height={550} alt="Image" />
                  </Link>
                </div>
                <div className="blog__single-content">
                  <h4>
                    <Link href="blog-single">
                      {blog.title}
                    </Link>
                  </h4>
                  <div className="blog__single-meta">
                    <Link href="blog" className="sub-title">
                      creative
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <p>{moment(blog.createdAt).format("MMMM D, YYYY")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="col-12 col-md-6">
          //   <div className="blog__single fade-top">
          //     <div className="blog__single-thumb topy-tilt">
          //       <Link href="blog-single">
          //         <Image src={two} alt="Image" />
          //       </Link>
          //     </div>
          //     <div className="blog__single-content">
          //       <h4>
          //         <Link href="blog-single">
          //           Transforming Challenges into Opportunities
          //         </Link>
          //       </h4>
          //       <div className="blog__single-meta">
          //         <Link href="blog" className="sub-title">
          //           creative
          //           <i className="fa-solid fa-arrow-right"></i>
          //         </Link>
          //         <p>MARCH 23, 2023</p>
          //       </div>
          //     </div>
          //   </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
