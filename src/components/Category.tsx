import React from 'react';
import styles from 'scss/components/RecentPost.module.scss';
import Link from 'next/link';
import Images from 'next/image';
import { client } from 'client';
import { useRouter } from 'next/router';

// interface Props {
//   posts: Post[] | undefined;
// }



function Category({
    // categories
}): JSX.Element {

  const { useQuery, useCategory } = client;
  const { query = {} } = useRouter();

  const category = useQuery();
  const categories = category.categories;
  const categ = categories();
  
  
  return (
    <section>
    <h2>CATEGORIES</h2>
        {categ?.nodes?.map((category, key) => (
            <div key={key}>
            <Link href={`/category/${category?.slug}`} passHref><a><div>{category?.name}</div></a></Link>
          <hr />
            </div>
        ))}
    </section>
  );
}

export default Category;
