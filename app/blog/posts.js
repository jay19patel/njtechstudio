import { readJson, updateJson } from "@/lib/json-store";

export async function getPosts() {
  const posts = await readJson("posts");
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function addPost(post) {
  await updateJson("posts", (posts) => {
    posts.push(post);
  });
  return post;
}
