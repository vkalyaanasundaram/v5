import React, { useEffect, useState } from 'react';
import styles from 'scss/pages/posts.module.scss';
import { client, Post } from 'client';
import Link from 'next/link';
import { Footer, Header, Pagination, Hero } from 'components';
import { PostIdType } from 'client';
import Router, { useRouter } from "next/router";
import Heading, { HeadingProps } from '../components/Heading';
import Head from 'next/head'; import { selectFields } from 'gqty';
import RecentPost from "../components/RecentPost";
import Category from "../components/Category";

interface Props {
  posts: Post[] | undefined;
  intro?: string;
  id?: string;
  heading?: string;
  headingLevel?: HeadingProps['level'];
  postTitleLevel?: HeadingProps['level'];
  postMainTitleLevel?: HeadingProps['level']
  readMoreText?: string;
}

const POSTS_PER_PAGE = 9;
const ALL_POST = 1000;
const RECENT_POST_COUNT = 5;

export default function SearchResult({
  intro,
  heading,
  id,
  headingLevel = 'h1',
  postTitleLevel = 'h2',
  postMainTitleLevel = 'h1',
  readMoreText = 'Read more',
}: Props): JSX.Element {
  // const generalSettings = useQuery().generalSettings;
  const { query = {} } = useRouter();
  const { postSlug, postCursor } = query;
  
  
  const { usePosts, useQuery, useCategory } = client;
  const router = useRouter();
  console.log(router.query);
  const setUrlParams = router.query;
  console.log(setUrlParams.keyword);
  


  const generalSettings = useQuery().generalSettings;
  const SearchKeyWord = router.query.keyword;
  const POSTS_PER_PAGE = 10;
  const isBefore = postSlug === 'before';
  const [postsList, setPosts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const posts = usePosts({
    first: !isBefore ? POSTS_PER_PAGE : undefined,
    last: isBefore ? POSTS_PER_PAGE : undefined,
  }).nodes;


  const recentPosts = usePosts({
    after: !isBefore ? (postCursor as string) : undefined,
    before: isBefore ? (postCursor as string) : undefined,
    first: !isBefore ? RECENT_POST_COUNT : undefined,
    last: isBefore ? RECENT_POST_COUNT : undefined,
  });

  const po = useQuery();

  const p = po?.posts;

  const allPosts = p({ first: 99 }).nodes

  const fetchPost = allPosts?.filter((post) => {

    if (searchTerm !== '') {
      if (post?.content()?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || post?.title()?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
        return post;
      }
    }
  })


  const postFilter = fetchPost.map((post, key) => {

    return (

      <div key={key} style={{ paddingLeft: "5px" }}>
        <div
          id={`post-${post.id}`}
          className="posts">
          <div>
            <Hero
              title={post?.title()}
              bgImage={post?.featuredImage?.node?.mediaItemUrl}
            />
            <Heading level={postTitleLevel} className={styles.title}>
              <Link href={`/blog/${post.slug}`}>
                <a>{post.title()}</a>
              </Link>
            </Heading>
            <div
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
            />
            <Link href={`/blog/${post.slug}`}>
              <a aria-label={`Read more about ${post.title || 'the post'}`}>
                {readMoreText}
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  })



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
          <div className="blogContainer BlogSearch">
            <input
              type="text"
              name="searchIco"
              id="searchIco"
              className="border-2 border-gray-300 p-2"
              value={setUrlParams.keyword}
              ref={input => input && input.focus()}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm !== "" ? (
              <>{postFilter}</>
            ) : (
              <div>No Result Found</div>
              // posts?.map((post, key) => (
              //   <div key={key}>
              //     <div
              //       id={`post-${post.id}`}
              //       className="posts" >
              //       <div>
              //         <Heading level={postTitleLevel} className={styles.title}> 
              //           <Link href={`/blog/${post.slug}`}>
              //             <a>{post.title()}</a>
              //           </Link>
              //         </Heading>
              //         <div
              //           className={styles.excerpt}
              //           dangerouslySetInnerHTML={{ __html: post.excerpt() ?? '' }}
              //         />
              //         <Link href={`/blog/${post.slug}`}>
              //           <a aria-label={`Read more about ${post.title || 'the post'}`}>
              //             {readMoreText}
              //           </a>
              //         </Link>
              //       </div>
              //     </div>
              //   </div>
              // ))
            )}
          </div>
          <div className="blogNav">
            <RecentPost />
            <Category />
          </div>
        </div>
      </main>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}
// export default SearchResult;