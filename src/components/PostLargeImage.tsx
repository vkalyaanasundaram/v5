import React from 'react';
import styles from 'scss/components/PostImage.module.scss';
import Images from 'next/image';

interface Props {
  imageSrcUrl?: string;
}

function PostLargeImage({
  imageSrcUrl 
}: Props): JSX.Element {
  return (
    <div className={styles.bgContainer}>
      {imageSrcUrl && <Images src={imageSrcUrl} blurDataURL={imageSrcUrl} placeholder="blur" layout='responsive' width={1050} height={510} className={styles.largeBanner} />}
    </div>
  );
}
export default PostLargeImage;
