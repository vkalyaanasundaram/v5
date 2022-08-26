import React from 'react';
import styles from 'scss/components/PostImage.module.scss';
import Link from 'next/link';
import Images from 'next/image';

interface Props {
  imageSrcUrl?: string;
}

function PostImage({
  imageSrcUrl 
}: Props): JSX.Element {

  return (<>{imageSrcUrl && 
    <Images src={imageSrcUrl} priority blurDataURL={imageSrcUrl} placeholder="blur" layout='responsive' width={650} height={400} className={styles.bannerImage} />
  }</>);

}
export default PostImage;
