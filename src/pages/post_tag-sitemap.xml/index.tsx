import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
  // const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  
  // let WP_URL = "";
  // const environment = process.env.NODE_ENV;
  
  // if(environment === "development") {
  //   WP_URL = "https://model-dev.vercel.app";
  //   // console.log(WP_URL);
  // } else {
  //   WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL
  // }

  // Blog Post
  const postTags = await fetch(
    "https://ada-kapitus.com/wp-json/wp/v2/tags?per_page=100&order=asc"
  );

  const postTag: any[] = await postTags.json();

  let releases = postTag.map((presReleaseData) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${presReleaseData.slug}`,
    lastmod: new Date().toISOString(),
  }));

  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, releases);
};

export default function PostSite() {}
