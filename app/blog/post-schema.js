// Shared by POST /api/blog and GET /api/blog/format so the docs never drift from the validation
export const POST_FIELDS = {
  title: { type: "string", required: true, max: 200, description: "Article title" },
  content: { type: "string", required: true, max: 100000, description: "Article body in Markdown (headings, ```code```, images, tables, YouTube links on their own line)" },
  category: { type: "string", required: false, max: 50, default: "Update", description: "e.g. Tutorial, Case Study, Tech Update, Announcement" },
  date: { type: "string", required: false, default: "now", description: "ISO 8601 date, e.g. 2026-11-13T10:00:00.000Z" },
  image: { type: "string", required: false, max: 1000, description: "Cover image: https:// URL or a path inside /public like /web-development.jpg" },
  link: { type: "string", required: false, max: 1000, description: "Optional call-to-action URL (https://...)" },
  linkText: { type: "string", required: false, max: 50, default: "Read More", description: "Call-to-action button text" },
};

const isUrlOrPath = (v) => v.startsWith("/") || /^https?:\/\//.test(v);

// Returns { post } or { errors: [...] }
export function validatePost(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { errors: ["Body must be a JSON object"] };

  const errors = [];
  const clean = {};
  for (const [key, rule] of Object.entries(POST_FIELDS)) {
    const raw = body[key];
    if (raw === undefined || raw === null || raw === "") {
      if (rule.required) errors.push(`${key} is required`);
      continue;
    }
    if (typeof raw !== "string") {
      errors.push(`${key} must be a string`);
      continue;
    }
    const value = raw.trim();
    if (rule.required && !value) errors.push(`${key} is required`);
    else if (rule.max && value.length > rule.max) errors.push(`${key} must be at most ${rule.max} characters`);
    else clean[key] = value;
  }

  if (clean.date && isNaN(new Date(clean.date))) errors.push("date must be a valid ISO 8601 date");
  if (clean.image && !isUrlOrPath(clean.image)) errors.push("image must be an http(s) URL or a /public path");
  if (clean.link && !/^https?:\/\//.test(clean.link)) errors.push("link must be an http(s) URL");
  if (errors.length) return { errors };

  return {
    post: {
      id: Date.now().toString(),
      title: clean.title,
      category: clean.category || "Update",
      date: new Date(clean.date || Date.now()).toISOString(),
      image: clean.image || "",
      link: clean.link || "",
      linkText: clean.linkText || "Read More",
      content: clean.content,
    },
  };
}
