import React, { useState } from 'react';
import { PressCoverage, PressRelease } from 'client';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import styles from 'scss/components/MediaCenter.module.scss';
import Images from 'next/image';
import Link from 'next/link';

interface Props { 
  presscoverage: PressCoverage[];
  pressrelease: PressRelease[];
}

function MediaCenter({
  presscoverage,
  pressrelease
}: Props): JSX.Element {

  const [presscoverages, setPressCoverages] = useState(presscoverage);
  const [pressreleases, setPressReleases] = useState(pressrelease);

  const coverageHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPressReleases([]);
    setPressCoverages(presscoverage);
  };

  const releaseHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPressCoverages([]);
    setPressReleases(pressrelease)
  };

  const allHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPressCoverages(presscoverage);
    setPressReleases(pressrelease)
  };
  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      className={styles.hero}
    >
      <div className={styles.masonryMain}>
        <div className={styles.all}>
          <span>All</span>
        </div>
        <div className={styles.terms}>
          <Link href="/">
          <a>
            <span className={styles.sortButton}><span onClick={allHandler}>All</span></span>
          </a>
          </Link>
          <span className={styles.textSep}>/</span>
          <Link href="/">
          <a>
            <span className={styles.sortButton}><span onClick={allHandler}>Events</span></span>
          </a>
          </Link>
          <span className={styles.textSep}>/</span>
          <Link href="/">
            <a><span className={styles.sortButton}><span onClick={coverageHandler}>Press Coverages</span></span>
            </a>
          </Link>
            <span className={styles.textSep}>/</span>
          <Link href="/">
            <a><span className={styles.sortButton}><span onClick={releaseHandler}>Press Releases</span></span>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.wrap}>
        <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 3, 900: 5}}>
          <Masonry>
            {presscoverages.map((item, i) => 
              ((item.uri && item?.featuredImage?.node?.sourceUrl()) && <div key={`${i}i`} className={styles.containerImage}><Link href={item?.uri} passHref><a target="_blank">
                <Images
                className={styles.imgPad}
                key={i}
                src={item?.featuredImage?.node?.sourceUrl()}
                width={500}
                height={500}
                alt={item?.title()}
              /></a></Link></div>)
            )}
            {Object.entries(pressreleases).map((item, j) => (
              <div key={`${j}j`} className={styles.containerImage}>
                {item[1]?.uri && <Link href={item[1]?.uri}><a target="_blank">
                {/* <Images
                  className={styles.imgPad}
                  src={`/images/image.jpg`}
                  width={500}
                  height={500}
                  alt={item[1]?.title()}
              /> */}
              <h5 className={styles.titleRelease}>{item[1]?.title()}</h5></a></Link>}
            </div>
            )
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div> 
    </section>
  );
}

export default MediaCenter;
