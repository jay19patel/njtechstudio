import { promises as fs } from "fs";
import path from "path";

const SITE_URL = "https://njtechstudio.in";

async function getProjectSlugs() {
  try {
    const filePath = path.join(process.cwd(), "public", "projects.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const projects = JSON.parse(raw);
    return projects.map((project) => project.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const staticRoutes = ["", "/projects", "/contact", "/channel"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const slugs = await getProjectSlugs();
  const projectRoutes = slugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
