import { getPosts } from "./posts";
import BlogList from "./BlogList";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
  description: "Engineering notes, product launches and behind-the-scenes stories from NJ Tech Studio.",
};

export default async function BlogPage() {
  return <BlogList posts={await getPosts()} />;
}
