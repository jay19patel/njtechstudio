import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getPosts } from "../posts";
import { readingTime, formatDate, plainText } from "../posts-format";
import Markdown from "../Markdown";
import MovingTextBg from "../../components/MovingTextBg";
import ShareButton from "./ShareButton";
import Engagement from "./Engagement";

export const dynamic = "force-dynamic";

async function findPost(id) {
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.id === id);
  return { post: posts[index], posts, index };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { post } = await findPost(id);
  if (!post) return { title: "Article not found" };
  const description = plainText(post.content).slice(0, 160);
  return {
    title: post.title,
    description,
    openGraph: { type: "article", title: post.title, description, publishedTime: post.date, images: post.image ? [post.image] : undefined },
  };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const { post, posts, index } = await findPost(id);
  if (!post) notFound();

  // posts are newest first
  const newer = posts[index - 1];
  const older = posts[index + 1];
  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 min-h-screen">
      <MovingTextBg text="BLOG" textColor="text-gray-400" isFixed={true}>
      <article className="max-w-3xl mx-auto pt-28 pb-16 px-4 sm:px-6">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> All articles
        </Link>

        <header className="space-y-5 mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold uppercase tracking-wider text-[11px]">
            {post.category || "Update"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">{post.title}</h1>
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-200">
            <div className="flex items-center gap-3 pt-4">
              <div className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center font-bold text-sm tracking-tighter">NJ</div>
              <div className="text-sm leading-tight">
                <p className="font-semibold">NJ Tech Studio</p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> · {readingTime(post.content)} min read
                </p>
              </div>
            </div>
            <div className="pt-4"><ShareButton title={post.title} /></div>
          </div>
        </header>

        {post.image && (
          <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-3xl border border-zinc-200 mb-10" />
        )}

        <div className="text-[17px] sm:text-lg leading-[1.8] text-zinc-700">
          <Markdown>{post.content}</Markdown>
        </div>

        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white bg-zinc-900 py-3 px-6 rounded-full hover:bg-black transition-colors"
          >
            {post.linkText || "Learn more"} <ExternalLink className="w-4 h-4" />
          </a>
        )}

        <Engagement postId={post.id} />

        {(newer || older) && (
          <nav className="grid sm:grid-cols-2 gap-4 mt-16 pt-8 border-t border-zinc-200">
            {older ? (
              <Link href={`/blog/${older.id}`} className="group p-5 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-400 transition-colors">
                <p className="text-xs text-zinc-500 flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Previous</p>
                <p className="mt-1 font-semibold leading-snug group-hover:text-indigo-600 transition-colors">{older.title}</p>
              </Link>
            ) : <span />}
            {newer && (
              <Link href={`/blog/${newer.id}`} className="group p-5 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-400 transition-colors sm:text-right">
                <p className="text-xs text-zinc-500 flex items-center gap-1 sm:justify-end">Next <ArrowRight className="w-3.5 h-3.5" /></p>
                <p className="mt-1 font-semibold leading-snug group-hover:text-indigo-600 transition-colors">{newer.title}</p>
              </Link>
            )}
          </nav>
        )}
      </article>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <h2 className="text-2xl font-bold tracking-tight mb-6">More from the blog</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`} className="group flex flex-col bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-shadow">
                {p.image && (
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img src={p.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5 space-y-2">
                  <p className="text-xs text-zinc-500">{formatDate(p.date)} · {readingTime(p.content)} min read</p>
                  <h3 className="font-bold leading-snug group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      </MovingTextBg>
    </div>
  );
}
