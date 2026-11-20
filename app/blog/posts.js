import { getBlogPosts as fetchCmsBlogs } from "@/lib/api";

export async function getPostsWithStatus() {
  try {
    const cmsPosts = await fetchCmsBlogs();
    if (cmsPosts === null) {
      return { posts: [], isOffline: true };
    }
    const sorted = [...cmsPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    return { posts: sorted, isOffline: false };
  } catch (err) {
    console.error("Failed fetching from CMS blog API:", err);
    return { posts: [], isOffline: true };
  }
}

export async function getPosts() {
  const { posts } = await getPostsWithStatus();
  return posts;
}

export async function addPost(post) {
  return post;
}
