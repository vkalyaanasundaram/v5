import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
  
  // Blog Post
  const departResponse = await fetch(
    `https://ada-kapitus.com/wp-json/wp/v2/department?per_page=50`
  );

  const department: any[] = await departResponse.json();

  let departments = department.map((staticPage) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${staticPage.slug}`,
    lastmod: new Date().toISOString(),
  }));
  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, departments);
};

export default function PageSite() {}
