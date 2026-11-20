import { getProjects, getBlogPosts } from "@/lib/api";

const SITE_URL = "https://njtechstudio.in";

export default async function sitemap() {
  const staticRoutes = ["", "/about", "/projects", "/blog"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  let projectRoutes = [];
  try {
    const projects = await getProjects();
    projectRoutes = (projects || [])
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${SITE_URL}/projects/${p.slug}`,
        lastModified: p.updated_at || new Date().toISOString(),
      }));
  } catch (err) {
    console.warn("Sitemap: Failed to load dynamic projects:", err);
  }

  let blogRoutes = [];
  try {
    const posts = await getBlogPosts();
    blogRoutes = (posts || [])
      .filter((post) => post.slug || post.id)
      .map((post) => ({
        url: `${SITE_URL}/blog/${post.slug || post.id}`,
        lastModified: post.date || new Date().toISOString(),
      }));
  } catch (err) {
    console.warn("Sitemap: Failed to load dynamic blogs:", err);
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
