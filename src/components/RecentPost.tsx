import React from 'react';
import Link from 'next/link';
import { client } from 'client';
import { useRouter } from 'next/router';


const RECENT_POST_COUNT = 5;

function RecentPost(): JSX.Element {
  const { query = {} } = useRouter();
  const {  postCursor, paginationTerm } = query;
  const { useQuery } = client;
  
  const isBefore = paginationTerm === 'before';

  const recentPostList = useQuery()?.posts;  
  // const postsLimit = recentPostList? .posts;
  const recentPosts = recentPostList({first: !isBefore ? RECENT_POST_COUNT : undefined})

  return (
    <section>
      <h2>LATEST FROM KAPITUS</h2>
      {recentPosts?.nodes?.map((post, key) => (
        <div key={key}>
          {/* <Link href={`/blog/${post.slug}`} as={`/blog/${post.slug}`} passHref> */}
          <Link href={`/blog/${post.slug}`} passHref>
            <a>{post.title()}</a>
            </Link>
          <hr />
        </div>
      ))}
    </section>
  );
}
export default RecentPost;