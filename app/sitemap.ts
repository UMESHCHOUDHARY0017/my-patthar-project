import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pattharhub.com";
  return [
    "",
    "/about",
    "/collections",
    "/register-godown",
    "/buyer-inquiry",
    "/projects",
    "/blog",
    "/contact",
    "/admin",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
