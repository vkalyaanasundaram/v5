import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
  
  // Blog Post
  const postResponse = await fetch(
    "https://ada-kapitus.com/wp-json/wp/v2/posts?page=3&per_page=100"
  );

  const post: any[] = await postResponse.json();

  let blogs = post.map((post) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`,
    lastmod: new Date().toISOString(),
  }));


  return getServerSideSitemap(ctx, blogs);
};

export default function PostSite(
  // { data }
  ) {
  // const environment = process.env.NODE_ENV;

  // let WP_URL = "";
  // // Blog Post
  // console.log(process.env);
  // if (environment === "development") {
  //   WP_URL = "https://model-dev.vercel.app";
  // } else {
  //   WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL
  }


  // return (
  //   <>
  //     <div className="p-10">
  //       {data.map((val, key) => (
  //         // <div key={key}>loc:{ `${process.env.WP_URL}/blog/${val.slug}`}</div>
  //         <>
  //           <div>{`<url>`}</div>
  //           <div>{`<loc>`}:{`${WP_URL}/blog/${val.slug}`}{`</loc>`}</div>
  //           <div>{`<lastmod>`}: {new Date().toISOString()}{`</lastmod>`}</div>
  //           <div>{`</url>`}</div>
  //         </>
  //       ))}
  //     </div>
  //   </>
  // );
// }

// export async function getServerSideProps() {
//   const postResponse = await fetch(
//     "https://ada-kapitus.com/wp-json/wp/v2/posts?per_page=100"
//   );
//   const data = await postResponse.json()
//   return {
//     props: {
//       data
//     }
//   }
// } 