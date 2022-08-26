import React from 'react';
import styles from 'scss/components/Posts.module.scss';
import { useRouter } from "next/router";

function SearchBlogs(): JSX.Element {
  const router = useRouter();

  const handleSearch = (value) => {
    router.push(`./SearchResult?keyword=${value}`);
  }

  return (
    <section className={styles.searchNav}>
    {/* <SearchBlogs /> */}
    {/* <Highlighter
      searchWords={[searchTerm]}
      autoEscape={true}
      textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
    /> */}
    <div>
      <input
          type="text"
          name="searchIco"
          id="searchIco"
          placeholder="Search"
          className="border-2 border-gray-300 p-2 w-full"
          onChange={(e) => handleSearch(e.target.value)}                 
      />
    </div>
  </section>
  );
}

export default SearchBlogs;
