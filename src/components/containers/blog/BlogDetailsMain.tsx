import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import poster from "public/images/news/poster.png";
import groupone from "public/images/news/group-one.png";
import grouptwo from "public/images/news/group-two.png";
import ten from "public/images/news/ten.png";
import eleven from "public/images/news/eleven.png";
import twelve from "public/images/news/twelve.png";
import thirteen from "public/images/news/thirteen.png";
import fourteen from "public/images/news/fourteen.png";
import moment from "moment";
import { toast } from "react-hot-toast";

const BlogDetailsMain = ({ blogs }: { blogs: any }) => {
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const fetchBlogs = async () => {
    try {
      const recent = await fetch(
        "https://devrolin.com/api/blogs/recent"
      ).then((res) => res.json());
      setRecentBlogs(recent);
    } catch (err) {
      toast.error("Error fetching blogs");
    }
  };
  const handleBlogComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.comment)
      return toast.error("Fill all fields");
    try {
      const res = await fetch(
        `https://devrolin.com/api/blogs/${blogs._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentForm),
        }
      );

      if (!res.ok) throw new Error("Failed to post comment");

      toast.success("Comment posted successfully!");
      setCommentForm({ name: "", email: "", comment: "" }); // Reset form
    } catch (err) {
      toast.error("Failed to post comment");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <section className="section blog-main blog-details fade-wrapper">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-xl-8">
            <div className="blog-details__content">
              <div className="bd-thumb fade-top">
                <Image
                  src={blogs.mainImage?.url}
                  width={500}
                  height={500}
                  quality={100}
                  alt="Image"
                />
              </div>
              <div className="bd-content">
                <div className="bd-meta">
                  <div className="meta__left">
                    <p>
                      <strong>Written by : </strong>
                      {blogs.author}
                    </p>
                    <span></span>
                    <p>{moment(blogs.createdAt).format("MMMM D, YYYY")}</p>
                  </div>
                </div>
                <div className="bd-content-info">
                  <h4 className="h4">{blogs.title}</h4>
                  <div className="paragraph">
                    <p>{blogs.description}</p>
                    <p>
                      consectetur adipiscing elit. Etiam at mauris accumsan mi
                      pulvinar lacinia a in justo. Ut tempor et libero quis
                      dignissim. Nulla at convallis libero, vitae aliquam leo.
                      Etiam ut augue nibh. In laoreet neque quis ex ornare, quis
                      auctor elit facilisis. Mauris dapibus massa rhoncus ligula
                      luctus vulputate. Fusce condimentum placerat vulputate.
                      Praesent ullamcorper dui in dui sagittis commodo.
                    </p>
                  </div>
                  <h4 className="h4">Where can I get some?</h4>
                </div>
              </div>
              <div className="bd-group">
                {blogs?.smallImages?.map((blog: any) => (
                  <>
                    <Image
                      src={
                        blog.url ||
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                      }
                      width={200}
                      height={300}
                      alt={blog.alt || "Img"}
                      className="fade-top"
                    />
                  </>
                ))}
              </div>
              <div className="bd-content ">
                <div className="bd-content__alt">
                  <p>
                    Proin ultricies ultricies est vitae cursus. Nulla sit amet
                    suscipit tortor. Maecenas dui erat, ornare eget tristique
                    vitae, rutrum pretium justo. Phasellus vitae consequat nisi,
                    quis luctus nisl. Praesent faucibus sem id massa semper
                    ornare. Nam eu magna at mi pellentesque mattis. Morbi at
                    condimentum velit. Phasellus aliquet, leo auctor volutpat
                    ultrices, metus dolor dictum enim, sed convallis lacus urna
                    nec erat.
                  </p>
                </div>
              </div>
              <div className="bd-quote">
                <blockquote>
                  <q className="light-title-lg">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit...
                  </q>
                </blockquote>
              </div>
              <div className="bd-content">
                <div className="bd-content__alt mt-0">
                  <p>
                    Proin ultricies ultricies est vitae cursus. Nulla sit amet
                    suscipit tortor. Maecenas dui erat, ornare eget tristique
                    vitae, rutrum pretium justo. Phasellus vitae consequat nisi,
                    quis luctus nisl. Praesent faucibus sem id massa semper
                    ornare. Nam eu magna at mi pellentesque mattis. Morbi at
                    condimentum velit. Phasellus aliquet, leo auctor volutpat
                    ultrices, metus dolor dictum enim, sed convallis lacus urna
                    nec erat.
                  </p>
                </div>
              </div>
              <div className="bd-tags">
                <div className="tags-left">
                  <p>Tags:</p>
                  <div className="tags-content">
                    <Link href="blog">Nature</Link>
                    <Link href="blog">Health</Link>
                  </div>
                </div>
                <div className="tags-right">
                  <p>Share:</p>
                  <ul className="social">
                    <li>
                      <Link href="/" aria-label="social media">
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" aria-label="social media">
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" aria-label="social media">
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" aria-label="social media">
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="blog-details__pagination">
              <div className="row gaper">
                {recentBlogs.slice(0, 2).map((blog: any) => (
                  <div className="col-md-6">
                    <div className="single">
                      {/* <Link href="blog">
                      <i className="fa-solid fa-arrow-left-long"></i>
                      Previous Blog
                    </Link> */}
                      <div className="latest-single">
                        <div className="latest-thumb">
                          <Link href={`/blog-single/${blog._id}`}>
                            <Image
                              src={blog.mainImage?.url}
                              width={400}
                              height={200}
                              alt="Image"
                            />
                          </Link>
                        </div>
                        <div className="latest-content">
                          <p>{moment(blog.createdAt).format("YYYY D, MMMM")}</p>
                          <p>
                            <Link href={`/blog-single/${blog._id}`}>
                              {blog.title}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section pb-0 comment-form fade-top">
                <div className="section__header">
                  <h2 className="h2 text-start">Leave a comment</h2>
                </div>
                <form action="#" onSubmit={handleBlogComment}>
                  <div className="form-group-wrapper">
                    <div className="form-group-single">
                      <input
                        type="text"
                        id="commentName"
                        name="name"
                        placeholder="Name"
                        value={commentForm.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group-single">
                      <input
                        type="email"
                        name="email"
                        id="commentemail"
                        placeholder="Email"
                        value={commentForm.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group-single">
                    <textarea
                      name="comment"
                      id="commentMessage"
                      placeholder="Write Comment..."
                      value={commentForm.comment}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="cta__group">
                    <button type="submit" className="btn btn--ocotonary">
                      post comment
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-4">
            <div className="blog-main__sidebar">
              <div className="widget ">
                <div className="widget__head">
                  <h5 className="h5">Search</h5>
                </div>
                <div className="widget-search">
                  <form action="#" method="post">
                    <div className="form-group-input">
                      <input
                        type="search"
                        name="blog-search"
                        id="blogSearch"
                        placeholder="Search here. . ."
                      />
                      <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="widget ">
                <div className="widget__head">
                  <h5 className="h5">Categories</h5>
                </div>
                <div className="widget__list">
                  <ul>
                    {/* <li>
                      <Link href="blog">UI/UX Design</Link>
                    </li>
                    <li>
                      <Link href="blog">Web Development</Link>
                    </li>
                    <li>
                      <Link href="blog">AI Brilliace</Link>
                    </li> */}
                    <li>{blogs.category}</li>{" "}
                    {/* <li>
                      <Link href="blog">News</Link>
                    </li>
                    <li>
                      <Link href="blog">Social Media</Link>
                    </li>
                    <li>
                      <Link href="blog">Trends</Link>
                    </li>
                    <li>
                      <Link href="blog">Writing</Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="widget">
                <div className="widget__head">
                  <h5 className="h5">Recent Posts</h5>
                </div>
                <div className="widget__latest">
                  {recentBlogs.slice(2, 5).map((blog: any) => (
                    <div className="latest-single ">
                      <div className="latest-thumb">
                        <Link href={`/blog-single/${blog._id}`}>
                          <Image
                            src={blog.mainImage?.url}
                            width={76}
                            height={80}
                            alt="Image"
                          />
                        </Link>
                      </div>
                      <div className="latest-content">
                        <p>{moment(blog.createdAt).format("YYYY DD, MMMM")}</p>
                        <p>
                          <Link href={`/blog-single/${blog._id}`}>
                            {blog.title}
                          </Link>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="widget">
                <div className="widget__head">
                  <h5 className="h5">Tags</h5>
                </div>
                <div className="widget__tags">
                  <ul>
                    <li>
                      <Link href="blog">nature</Link>
                    </li>
                    <li>
                      <Link href="blog">health</Link>
                    </li>
                    <li>
                      <Link href="blog">galaxy</Link>
                    </li>
                    <li>
                      <Link href="blog">creative</Link>
                    </li>
                    <li>
                      <Link href="blog">art</Link>
                    </li>
                    <li>
                      <Link href="blog">business</Link>
                    </li>
                    <li>
                      <Link href="blog">space</Link>
                    </li>
                    <li>
                      <Link href="blog">biology</Link>
                    </li>
                    <li>
                      <Link href="blog">environemnt</Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="widget widget-big ">
                <Link href="blog-single">
                  <Image src={fourteen} alt="Image" />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsMain;
