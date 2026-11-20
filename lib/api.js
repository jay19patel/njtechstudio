/**
 * Dynamic API Client for NJTechStudio & Hello Guys Django CMS backend.
 * Pure dynamic data fetching directly from the backend with zero static fallback data.
 */

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.DJANGO_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

export { API_BASE_URL };

/**
 * Universal safe fetcher with timeout and error handling.
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const defaultHeaders = {
    "Accept": "application/json",
    ...(options.body && typeof options.body === "string" ? { "Content-Type": "application/json" } : {}),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 5000);

  try {
    const res = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
      signal: controller.signal,
      next: { revalidate: options.revalidate !== undefined ? options.revalidate : 0 },
      cache: options.cache || "no-store",
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`API error [${res.status}] on ${endpoint}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[CMS API] Failed to reach backend at ${endpoint}: ${err.message}`);
    }
    return null;
  }
}

// ----------------------------------------------------------------------
// 1. Global Site Configuration
// ----------------------------------------------------------------------
export async function getSiteConfig() {
  const data = await fetchAPI("/api/cms/site-config/");
  if (data && data.brand_name) return data;
  return null;
}

// ----------------------------------------------------------------------
// 2. Aggregated Homepage Overview
// ----------------------------------------------------------------------
export async function getHomeOverview() {
  return await fetchAPI("/api/cms/home-overview/");
}

// ----------------------------------------------------------------------
// 3. Featured Solutions / Architecture
// ----------------------------------------------------------------------
export async function getSolutions() {
  const data = await fetchAPI("/api/cms/solutions/");
  return Array.isArray(data) ? data : null;
}

// ----------------------------------------------------------------------
// 4. Portfolio Projects
// ----------------------------------------------------------------------
export async function getProjects() {
  const data = await fetchAPI("/api/cms/projects/");
  return Array.isArray(data) ? data : null;
}

export async function getProjectBySlug(slug) {
  const data = await fetchAPI(`/api/cms/projects/${slug}/`);
  return data && data.slug ? data : null;
}

// ----------------------------------------------------------------------
// 5. Tech Stack & Skills
// ----------------------------------------------------------------------
export async function getSkillsGrouped() {
  const data = await fetchAPI("/api/cms/skills/?grouped=1");
  return data && typeof data === "object" ? data : null;
}

// ----------------------------------------------------------------------
// 6. Testimonials
// ----------------------------------------------------------------------
export async function getTestimonials() {
  const data = await fetchAPI("/api/cms/testimonials/");
  return Array.isArray(data) ? data : null;
}

// ----------------------------------------------------------------------
// 7. FAQs
// ----------------------------------------------------------------------
export async function getFaqs() {
  const data = await fetchAPI("/api/cms/faqs/");
  return Array.isArray(data) ? data : null;
}

// ----------------------------------------------------------------------
// 8. YouTube Videos
// ----------------------------------------------------------------------
export async function getVideos() {
  const data = await fetchAPI("/api/cms/videos/");
  return Array.isArray(data) ? data : null;
}

// ----------------------------------------------------------------------
// 9. Developer Blog Articles
// ----------------------------------------------------------------------
export async function getBlogPosts() {
  const data = await fetchAPI("/api/cms/blog/");
  if (Array.isArray(data)) {
    return data.map((post) => ({
      id: post.slug || String(post.id),
      slug: post.slug,
      title: post.title,
      category: post.category,
      content: post.content,
      image: post.cover_image,
      date: post.published_at || post.created_at,
      views: post.views_count || 0,
      likes: post.likes_count || 0,
      link: post.link,
      linkText: post.link_text,
    }));
  }
  return null;
}

export async function getBlogPostBySlug(slug) {
  const data = await fetchAPI(`/api/cms/blog/${slug}/`);
  if (data && data.title) {
    return {
      id: data.slug || String(data.id),
      slug: data.slug,
      title: data.title,
      category: data.category,
      content: data.content,
      image: data.cover_image,
      date: data.published_at || data.created_at,
      views: data.views_count || 0,
      likes: data.likes_count || 0,
      link: data.link,
      linkText: data.link_text,
    };
  }
  return null;
}

export async function likeBlogPost(slug) {
  const res = await fetch(`${API_BASE_URL}/api/cms/blog/${slug}/like/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) return await res.json();
  return null;
}

export async function getBlogEngagement(slug) {
  const data = await fetchAPI(`/api/cms/blog/${slug}/engagement/`);
  return data || { likes: 0, liked: false, comments: [], me: "Guest-ANON" };
}

export async function submitBlogEngagement(slug, payload) {
  const res = await fetch(`${API_BASE_URL}/api/cms/blog/${slug}/engagement/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.ok ? await res.json() : null;
}

// ----------------------------------------------------------------------
// 10. Inquiries / Lead Submission
// ----------------------------------------------------------------------
export async function submitLeadInquiry(formData) {
  const res = await fetch(`${API_BASE_URL}/api/cms/inquiries/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      subject: formData.subject || "Project Inquiry",
      message: formData.message,
      inquiry_type: formData.inquiry_type || "Contact Form",
    }),
  });
  return res.ok ? await res.json() : null;
}
