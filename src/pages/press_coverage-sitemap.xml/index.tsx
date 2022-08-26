import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];


  // Blog Post
  const pressCoverages = await fetch(
    "https://ada-kapitus.com/wp-json/wp/v2/press_coverage"
  );

  const press: any[] = await pressCoverages.json();

  let pressCoverage = press.map((pressData) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${pressData.slug}`,
    lastmod: new Date().toISOString(),
  }));

  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, pressCoverage);
};

export default function PostSite() {}
