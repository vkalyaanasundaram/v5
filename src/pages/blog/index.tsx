import { getNextStaticProps } from '@faustjs/next';
import { client, OrderEnum, PostObjectsConnectionOrderbyEnum } from 'client';
import { Footer, Header, Pagination, Posts } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Blog from "../../components/Blog";
import RecentPost from "../../components/RecentPost";
import Category from "../../components/Category";
import SearchBlogs from "../../components/SearchBlogs";
import SubscribeBlog from "../../components/Forms/SubscribeBlog";
import styles from 'scss/pages/posts.module.scss';

const POSTS_PER_PAGE = 9;
const RECENT_POST_COUNT = 5;

export default function Page() {
  const { query = {} } = useRouter();
  const { postSlug, postCursor } = query;
  const { useQuery, usePosts } = client;
  const generalSettings = useQuery().generalSettings;
  const isBefore = postSlug === 'before';
  const posts = usePosts({
    after: !isBefore ? (postCursor as string) : undefined,
    before: isBefore ? (postCursor as string) : undefined,
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
  });

  const po = useQuery();

  const p = po?.posts;
  // const allPost = p({ first: 100 })
  const allPost = p();

  
  
  if (useQuery().$state.isLoading) {
    return null;
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <main className="content content-page">
        <div className="blogWrap">
          <div className="blogContainer">
            <Blog
              // allPosts={allPost?.nodes}
              posts={posts.nodes}
              headingLevel="h2"
              postMainTitleLevel="h1"
              postTitleLevel="h4"
              id={styles.post_list}
            />

            <Pagination pageInfo={posts.pageInfo} basePath="/blog" />
          </div>
          <div className="blogNav">
            {/* <SearchBlogs /> */}
            <RecentPost />
            {/* <SubscribeBlog /> */}
            <Category  />
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
  });
}
