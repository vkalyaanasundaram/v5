import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
 

  // Blog Post
  const guideResponse = await fetch(
    `https://ada-kapitus.com/wp-json/wp/v2/guide`
  );

  const guide: any[] = await guideResponse.json();

  let guides = guide.map((staticPage) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${staticPage.slug}`,
    lastmod: new Date().toISOString(),
  }));
  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, guides);
};

export default function PageSite() {}
