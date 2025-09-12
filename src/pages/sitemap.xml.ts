import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE_URL = "https://churnpill.com";

export const GET: APIRoute = async () => {
  // Get all blog posts and authors
  const blogPosts = await getCollection("blog");
  const authors = await getCollection("authors");

  // Static pages
  const staticPages = ["", "blog", "blog/authors"];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n")}
  ${blogPosts
    .map(
      (post) => `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${
      post.data.updatedDate
        ? post.data.updatedDate.toISOString().split("T")[0]
        : post.data.pubDate.toISOString().split("T")[0]
    }</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("\n")}
  ${authors
    .map(
      (author) => `  <url>
    <loc>${SITE_URL}/blog/author/${author.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
