import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import { Header, Footer, Posts, Pagination } from 'components';
import RecentPost from "../../../components/RecentPost";
import Category from "../../../components/Category";
import SearchBlogs from "../../../components/SearchBlogs";
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { client } from 'client';

const POSTS_PER_PAGE = 6;

export default function Page() {
  const { useQuery, usePosts, useCategory } = client;
  const { query = {} } = useRouter();
  const { categorySlug, paginationTerm, categoryCursor } = query;
  const generalSettings = useQuery().generalSettings;

  // useCategory()?.posts()?.nodes.map((val, key) => (
  //   console.log(val?.categories())
    
  // ));
  


  const isBefore = paginationTerm === 'before';
  const posts = usePosts({
    after: !isBefore ? (categoryCursor as string) : undefined,
    before: isBefore ? (categoryCursor as string) : undefined,
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
  });

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Posts - {generalSettings?.title}</title>
      </Head>

      <main className="content content-single">
        <div className="blogWrap">
          <div className="blogContainer">
            {/* <h2>Category: {category?.name}</h2> */}
            <Posts posts={posts.nodes} />

            <Pagination
              pageInfo={posts.pageInfo}
              basePath={`/category/${categorySlug}`}
            />
          </div>

          <div className="blogNav">
            <SearchBlogs />
            <RecentPost />
            {/* <SubscribeBlog /> */}
            <Category />
          </div>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
