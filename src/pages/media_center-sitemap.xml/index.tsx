import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
  
  // Blog Post
  const mediaResponse = await fetch(
    `https://ada-kapitus.com/wp-json/wp/v2/media_center?per_page=50`
  );

  const media: any[] = await mediaResponse.json();

  let medias = media.map((staticPage) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${staticPage.slug}`,
    lastmod: new Date().toISOString(),
  }));
  

  return getServerSideSitemap(ctx, medias);
};

export default function PageSite() {}
