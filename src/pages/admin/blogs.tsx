import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import { toast } from "react-hot-toast";
import moment from "moment";

const AdminBlogs = () => {
  const isAuthorized = useAdminAuth();
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  const fetchBlogs = async () => {
    try {
      const recent = await fetch(
        "http://localhost:5000/api/blogs/recent"
      ).then((res) => res.json());
      setRecentBlogs(recent);
    } catch (err) {
      toast.error("Error fetching blogs");
    }
  };

  useEffect(() => {
    if (isAuthorized) fetchBlogs();
  }, [isAuthorized]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    details: "",
    author: "",
    category: "Web Development",
    mainImage: null as File | null,
    smallImages: [null, null] as (File | null)[],
  });

  const [previews, setPreviews] = useState({
    mainImage: "",
    smallImages: ["", ""],
  });

  const [editForm, setEditForm] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, mainImage: file }));
      setPreviews((prev) => ({
        ...prev,
        mainImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSmallImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedFiles = [...form.smallImages];
      const updatedPreviews = [...previews.smallImages];
      updatedFiles[index] = file;
      updatedPreviews[index] = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, smallImages: updatedFiles }));
      setPreviews((prev) => ({ ...prev, smallImages: updatedPreviews }));
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      details: "",
      author: "",
      category: "Web Development",
      mainImage: null,
      smallImages: [null, null],
    });
    setPreviews({ mainImage: "", smallImages: ["", ""] });
    setEditForm(false);
    setCurrentBlogId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("details", form.details);
    formData.append("author", form.author);
    formData.append("category", form.category);

    if (form.mainImage) {
      formData.append("mainImage", form.mainImage);
    }

    form.smallImages.forEach((img) => {
      if (img) formData.append("smallImages", img);
    });

    try {
      let res;
      if (editForm && currentBlogId) {
        // Update blog
        res = await fetch(
          `http://localhost:5000/api/admin/edit-blog/${currentBlogId}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
      } else {
        // Create blog
        res = await fetch(
          "http://localhost:5000/api/admin/new-blog",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
      }

      const data = await res.json();

      if (res.ok) {
        toast.success(editForm ? "Blog updated successfully" : "Blog created successfully");
        resetForm();
        fetchBlogs();
      } else {
        toast.error(data.error || "Failed to process blog");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const handleBlogDelte = async (Id: string) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/delete-blog/${Id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Blog deleted successfully");
        setRecentBlogs((prev) => prev.filter((blog) => blog._id !== Id));
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleBlogEdit = (Id: string) => {
    toast.success("Scroll Top for edit")
    const blog = recentBlogs.find((b) => b._id === Id);
    if (blog) {
      setForm({
        title: blog.title,
        description: blog.description,
        details: blog.details,
        author: blog.author,
        category: blog.category,
        mainImage: null,
        smallImages: [null, null],
      });
      setPreviews({
        mainImage: blog.mainImage?.url || "",
        smallImages: blog.smallImages?.map((img: any) => img.url) || ["", ""],
      });
      setEditForm(true);
      setCurrentBlogId(Id);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Blogs</title>
        <meta name="description" content="Admin blog dashboard" />
      </Head>

      <AdminLayout>
        <div className="container py-4">
          <h4 className="text-white mb-4">
            {editForm ? "Edit Blog" : "Create New Blog"}
          </h4>

          <form className="row g-3" onSubmit={handleSubmit}>
            {/* Title & Author */}
            <div className="col-md-6 group-input">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control p-3"
                placeholder="Title"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="form-control p-3"
                placeholder="Author"
                required
              />
            </div>

            {/* Description & Details */}
            <div className="col-12">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Short Description"
                required
              />
            </div>
            <div className="col-12">
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Blog Details"
                rows={2}
                required
              />
            </div>

            {/* Category */}
            <div className="col-md-12">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-select p-3"
              >
                <option className="text-white">Select Category</option>
                <option className="text-white">Web Development</option>
                <option className="text-white">Artificial Intelligence</option>
                <option className="text-white">Modern UI/UX Design</option>
              </select>
            </div>

            {/* Main Image Upload + Preview */}
            <div className="col-md-6">
              <label className="form-label text-white">
                Main Image - (690x550)
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control p-3"
                onChange={handleMainImageUpload}
                required={!editForm}
              />
              {previews.mainImage && (
                <img
                  src={previews.mainImage}
                  alt="Main Preview"
                  className="img-thumbnail mt-2"
                  style={{ maxHeight: "150px" }}
                />
              )}

              {/* Small Images Upload */}
              {[0, 1].map((i) => (
                <div className="" key={i}>
                  <label className="form-label mt-3 text-white">{`SmallImage ${
                    i + 1
                  }  - (456x362) `}</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control p-3"
                    onChange={(e) => handleSmallImageUpload(e, i)}
                  />
                  {previews.smallImages[i] && (
                    <img
                      src={previews.smallImages[i]}
                      alt={`Small ${i + 1}`}
                      className="img-thumbnail"
                      style={{ maxHeight: "100px" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="col-12">
              <button type="submit" className="btn">
                {editForm ? "Update Blog" : "Create Blog"}
              </button>
              {editForm && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <hr className="border-top border-secondary my-5" />

          <h4 className="text-white mb-3">Recent Blogs</h4>

          <div className="row">
            {recentBlogs.map((blog: any) => (
              <div key={blog._id} className="col-12 col-lg-6 mb-4">
                <div className="card bg-dark text-white h-100 border border-secondary">
                  {blog.mainImage?.url && (
                    <img
                      src={blog.mainImage.url}
                      alt={blog.mainImage.alt || blog.title}
                      className="card-img-top img-fluid"
                      style={{ height: 250, objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{blog.title}</h5>
                      <div>
                        <button
                          className="bg-danger p-2 mx-2 rounded"
                          onClick={() => handleBlogDelte(blog._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-primary p-2 rounded"
                          onClick={() => handleBlogEdit(blog._id)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <p className="card-text">{blog.description}</p>
                  </div>

                  <div className="card-body bg-transparent border-top border-secondary  small">
                    <h6>
                      By {blog.author} | Category: {blog.category}
                    </h6>
                    <p>
                      Published: {moment(blog.createdAt).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminBlogs;
