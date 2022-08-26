import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];

  // Blog Post
  const team_members = await fetch(
    "https://ada-kapitus.com/wp-json/wp/v2/team_members?per_page=50"
  );

  const team: any[] = await team_members.json();

  let teams = team?.map((teamData) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${teamData.slug}`,
    lastmod: new Date().toISOString(),
  }));

  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, teams);
};

export default function PostSite() {}
