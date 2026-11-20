const SITE_URL = "https://njtechstudio.in";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
