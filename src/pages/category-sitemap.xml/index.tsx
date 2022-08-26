import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
  
  
  // Blog Post
  const categoryRes = await fetch(
    `https://ada-kapitus.com/wp-json/wp/v2/categories?per_page=100`
  );

  const category: any[] = await categoryRes.json();

  let categories = category.map((staticPage) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${staticPage.slug}`,
    lastmod: new Date().toISOString(),
  }));
  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, categories);
};

export default function PageSite() {}
