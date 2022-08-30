import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post } from 'client';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import RecentPost from "../../../components/RecentPost";
import Category from "../../../components/Category";
import SearchBlogs from "../../../components/SearchBlogs";

export interface PostProps {
  post: Post | Post['preview']['node'] | null | undefined;
}

export function PostComponent({ post }: PostProps) {
  
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const { query = {} } = useRouter();

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {post?.title()} - {generalSettings.title}
        </title>
      </Head>



      <main className="content content-single">
        <div className="blogWrap">
          <div className="blogContainer">
            
            <Hero
              title={post?.title()}
              bgImage={post?.featuredImage?.node?.sourceUrl()}
            />
            <div> Blog Content</div>
            {/* <div dangerouslySetInnerHTML={{ __html: post?.content() ?? '' }} /> */}
          </div>
          <div className="blogNav">
            <SearchBlogs />
            <RecentPost />
            <Category />
          </div>
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
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
