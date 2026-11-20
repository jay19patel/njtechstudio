import { getPostsWithStatus } from "./posts";
import BlogList from "./BlogList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
  description: "Engineering notes, product launches and behind-the-scenes stories from NJ Tech Studio.",
};

export default async function BlogPage() {
  const { posts, isOffline } = await getPostsWithStatus();
  return <BlogList posts={posts} isOffline={isOffline} />;
}
