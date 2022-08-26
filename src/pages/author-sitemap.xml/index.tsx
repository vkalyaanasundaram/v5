import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];

 
  // Blog Post
  const userResponse = await fetch(
    `https://kapstaging.com/wp-json/wp/v2/users?limit=100&order=asc`
  );

  const user: any[] = await userResponse.json();
  let users = user.map((staticPage) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${staticPage.slug}`,
    lastmod: new Date().toISOString(),
  }));
  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, users);
};

export default function PageSite() { }
