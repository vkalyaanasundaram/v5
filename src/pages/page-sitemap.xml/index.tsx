import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
  // const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  
  

  // if (typeof window !== "undefined") {console.log(window.location.origin); }
  
  // if (typeof window !== "undefined") {
  //   WP_URL = window.location.origin;
  // }
  
  const environment = process.env.NODE_ENV;
  
  // if(environment === "development") {
  //   WP_URL = "https://model-dev.vercel.app";
  //   console.log(WP_URL);
  // } else {
  //   WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL
  //   console.log(WP_URL);
  // }

  // Blog Post
  const pageResponse = await fetch(
    `https://kapstaging.com/wp-json/wp/v2/pages?per_page=100`
  );

  const page: any[] = await pageResponse.json();

  let pages = page.map((staticPage) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${staticPage.slug}`,
    lastmod: new Date().toISOString(),
  }));
  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, pages);
};

export default function PageSite() {}
