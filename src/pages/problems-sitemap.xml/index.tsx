import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];

 
  // Blog Post
  const pageResponse = await fetch(
    `https://ada-kapitus.com/wp-json/wp/v2/problems?order=asc`
  );

  const page: any[] = await pageResponse.json();
  let pages = page.map((staticPage) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${staticPage.slug}`,
    lastmod: new Date().toISOString(),
  }));
  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, pages);
};

export default function PageSite() { }
