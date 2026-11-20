import { getBlogPosts as fetchCmsBlogs } from "@/lib/api";

export async function getPosts() {
  try {
    const cmsPosts = await fetchCmsBlogs();
    if (Array.isArray(cmsPosts) && cmsPosts.length > 0) {
      return cmsPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return [];
  } catch (err) {
    console.error("Failed fetching from CMS blog API:", err);
    return [];
  }
}

export async function addPost(post) {
  // In dynamic mode, posts are created via Django CMS admin
  return post;
}
