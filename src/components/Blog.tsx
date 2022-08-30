import React, { useState } from "react";
import Link from "next/link";
import type { Post } from "client";
import styles from "scss/components/Posts.module.scss";
import PostImage from "./PostImage";
import PostLargeImage from "./PostLargeImage";
import Heading, { HeadingProps } from "./Heading";
import useInView from "react-cool-inview";
// import Highlighter from "react-highlight-words";

interface Props {
  posts: Post[] | undefined;
  // allPosts: Post[] | undefined;
  intro?: string;
  id?: string;
  heading?: string;
  headingLevel?: HeadingProps["level"];
  postTitleLevel?: HeadingProps["level"];
  postMainTitleLevel?: HeadingProps["level"];
  readMoreText?: string;
}

export default function Blog({
  posts,
  // allPosts,
  intro,
  heading,
  id,
  headingLevel = "h1",
  postTitleLevel = "h2",
  postMainTitleLevel = "h1",
  readMoreText = "Read more",
}: Props): JSX.Element {


  // const [searchTerm, setSearchTerm] = useState("");

  // const fetchPost = posts?.filter((post) => {
  //   console.log(post?.featuredImage?.node?.mediaDetails?.file);
    
  //   if (searchTerm !== "") {
  //     if (
  //       post?.content()?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
  //       post?.title()?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  //     ) {
  //       return post;
  //     }
  //   }
  // });

  // const postFilter = fetchPost.map((post, key) => {

  //   return (
  //     <div className={styles.single} key={post.id ?? ""} id={`post-${post.id}`}>
  //       <div>
  //         <PostImage imageSrcUrl={post?.featuredImage?.node?.mediaDetails?.file} />

  //         <Heading level={postTitleLevel} className={styles.title}>
  //           <Link href={`/blog/${post.slug}`}>
  //             <a>{post.title()}</a>
  //           </Link>
  //         </Heading>
  //         <div
  //           className={styles.excerpt}
  //           // style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }
  //           // eslint-disable-next-line react/no-danger
  //           dangerouslySetInnerHTML={{ __html: post.excerpt() ?? "" }}
  //         />
  //         <Link href={`/blog/${post.slug}`}>
  //           <a aria-label={`Read more about ${post.title || "the post"}`}>
  //             {readMoreText}
  //           </a>
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section className={styles["posts-block"]} {...(id && { id })}>
      <div>
        {heading && (
          <Heading level={headingLevel} className={styles.heading}>
            {heading}
          </Heading>
        )}
        {intro && <p className={styles.intro}>{intro}</p>}
        <div>
          {posts.map((post, key) => (
            <div className="grid grid-cols-1 gap-4" key={key}>
              {key === 0 ? (
                <div id={`post-${post.id}`}>
                  <div className={styles.prime}>
                    {/* <PostLargeImage
                      imageSrcUrl={post?.featuredImage?.node?.sourceUrl()}
                    /> */}
                    <Heading
                      level={postMainTitleLevel}
                      className={styles.title}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <a>{post.title()}</a>
                      </Link>
                    </Heading>
                    {/* <div

                      dangerouslySetInnerHTML={{ __html: post.excerpt() ?? "" }}
                    /> */}
                    <Link href={`/blog/${post.slug}`}>
                      <a
                        aria-label={`Read more about ${post.title || "the post"
                          }`}
                      >
                        {readMoreText}
                      </a>
                    </Link>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {
          // searchTerm !== "" ? (
          //   <>{postFilter}</>
          // ) : (
            posts?.map((post) => (
              // console.log(post?.excerpt()),

              <div

                key={post.id ?? ""}
                id={`post-${post.id}`}
              >
                <div>
                  <PostImage
                    imageSrcUrl={post?.featuredImage?.node?.sourceUrl()}
                  />
                  <Heading level={postTitleLevel} className={styles.title}>
                    <Link href={`/blog/${post.slug}`}>
                      <a>{post.title()}</a>
                    </Link>
                  </Heading>
                  {/* <div
                    className={styles.excerpt}
                    dangerouslySetInnerHTML={{ __html: post.excerpt() ?? "" }}
                  /> */}
                  <Link href={`/blog/${post.slug}`}>
                    <a
                      aria-label={`Read more about ${post.title || "the post"
                        }`}
                    >
                      {readMoreText}
                    </a>
                  </Link>
                </div>
              </div>
            )
            // )
          )}
          {posts && posts?.length < 1 && <p>No posts found.</p>}
        </div>
      </div>
    </section>
  );
}
// export default Blog;
