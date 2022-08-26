import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
  
  // Blog Post
  const FaqResponse = await fetch(
    `https://ada-kapitus.com/wp-json/wp/v2/faqs?per_page=50`
  );

  const FAQs: any[] = await FaqResponse.json();

  let faq = FAQs.map((faqPage) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${faqPage.slug}`,
    lastmod: new Date().toISOString(),
  }));
  //   const merge = [...blogs];

  return getServerSideSitemap(ctx, faq);
};

export default function PageSite() {}
