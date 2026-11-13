export const readingTime = (text = "") =>
  Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

// Markdown -> plain text for excerpts and meta descriptions
export const plainText = (md = "") =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s*(#{1,6}|>|[-*]|\d+\.|\|)\s?/gm, "")
    .replace(/[*_`|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
