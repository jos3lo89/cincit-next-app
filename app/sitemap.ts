import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.MY_URL_SITE;
  return [
    {
      url: `${url}/`,
      lastModified: new Date(),
    },
    {
      url: `${url}/schedule`,
      lastModified: new Date(),
    },
    {
      url: `${url}/gallery`,
      lastModified: new Date(),
    },
  ];
}
