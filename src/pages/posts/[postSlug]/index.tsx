import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, Post } from 'client';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import PostLargeImage from "../../../components/PostLargeImage";


interface MyPageProps {
  username: string;
  password: string;
}
export interface PostProps {
  post: Post | Post['preview']['node'] | null | undefined;
  username: string;
  password: string;
}


export interface PostProps {
  post: Post | Post['preview']['node'] | null | undefined;
}


export function PostComponent({ post, username, password }: PostProps) {

// export function PostComponent({ post }: PostProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

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

      <Hero
        title={post?.title()}
        bgImage={post?.featuredImage?.node?.sourceUrl()}   />
            {/* <PostLargeImage imageSrcUrl={post?.featuredImage?.node?.sourceUrl()} />
<h1> Hello</h1> */}

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? '' }} />
        </div>
      </main>
   {/* <Footer copyrightHolder={generalSettings.title} username={username} password={password} />  */}

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page({ username, password }: MyPageProps) {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} username={username} password={password} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    props: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    },
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}