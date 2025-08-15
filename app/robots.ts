import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = process.env.MY_URL_SITE;

  return {
    rules: {
      userAgent: "*",
      disallow: "/private/",
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
