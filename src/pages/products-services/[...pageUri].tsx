import React, { useState, useEffect } from 'react';
import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, ProductsService as ProductsServiceType } from 'client';
import styles from 'scss/components/Advancedhero.module.scss';
import { Footer, Header } from 'components';
import { GetStaticPropsContext } from 'next';
import ErrorComponent from '../404'
import useInView from "react-cool-inview";
import { useRouter } from 'next/router';
import AdvancedHero from '../../components/AdvancedHero';
import Image from "next/image";
import SecondaryMobileMenu from "../../components/SecondaryMobileMenu"
import SecondaryMenu from "../../components/SecondaryMenu"

import PopUpGetStarted from "../../components/PopUpGetStarted";
import PopUpPartner from "../../components/PopUpPartner";
import CommonShortForm from '../../components/Forms/CommonShortForm'
import EquipShortForm from '../../components/Forms/EquipShortForm'
import InvoiceShortForm from '../../components/Forms/InvoiceShortForm'


export interface ProductsServiceProps {
  post: ProductsServiceType | ProductsServiceType['preview']['node'] | null | undefined;
}

interface MyPageProps {
  pageUri: string;
}

export function PostComponent({ post }: ProductsServiceProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const [popupgetstarted, setPopUpGetStarted] = useState(false)
  const [popuppartner, setPopUpPartner] = useState(false)

  // console.log(useQuery().modelTests().nodes[0].mainTitle);
  const ProductsContent = useQuery().modelTests().nodes;

  const router = useRouter()
  let currentSlugName = {};
  currentSlugName = router.query?.pageUri[0];
  let bannerMainTitle = "";

  ProductsContent.map((value, key) => {
    // console.log(value?.featuredImage?.node?.mediaItemUrl);
    // console.log(post?.featuredImage?.node?.mediaItemUrl);
    if (currentSlugName == value?.slug) {
      bannerMainTitle = value?.mainTitle;
      return bannerMainTitle;
    }
  });

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      // output={{}}
      />
      <SecondaryMenu title="" />
      <SecondaryMobileMenu title={post?.slug} />

      {/* {ProductsContent.map((value, key) => {
        console.log(value?.featuredImage?.node?.mediaItemUrl);
        console.log(post?.featuredImage?.node?.mediaItemUrl);

        if (currentSlugName == value?.slug) {
          return ( */}
      <section className={`${styles.bgImage}`} >
        {/* <AdvancedHero
                bgImage={post?.featuredImage?.node?.mediaItemUrl}
              /> */}
        <AdvancedHero
          title={bannerMainTitle}
          indexTitle=''
          // bgImage={productsService?.heroAdvanced?.desktopBanner?.sourceUrl()}
          bgImage={post?.featuredImage?.node?.mediaItemUrl}
          column='two'
          slug={post?.slug}
        />
        {/* <div key={key} className={`${styles.hero}`}>
                  {post?.featuredImage?.node?.mediaItemUrl &&
                    <Image src={post?.featuredImage?.node?.mediaItemUrl} layout="fill" alt="" objectFit="cover" priority blurDataURL={post?.featuredImage?.node?.mediaItemUrl} placeholder="blur" />
                  }
                  <div className={styles.wrap}> <AdvancedHero title={value?.mainTitle} /></div>

                </div> */}
        {/* <div className={styles.col}> */}
        {/* <CommonShortForm />
              {currentSlugName == 'equipment-financing' && <EquipShortForm />}
              {currentSlugName == 'invoice-factoring' && <InvoiceShortForm />}
              {popupgetstarted ? <PopUpGetStarted toggle={setPopUpGetStarted} /> : null}
              {popuppartner ? <PopUpPartner toggle={setPopUpPartner} /> : null} */}
        {/* </div> */}
      </section>
      {/* )
        }
      })} */}
      <div dangerouslySetInnerHTML={{ __html: post?.content() }}></div>
    </>
  );
}

export default function Page({ pageUri }: MyPageProps) {

  const { useQuery } = client;
  const post = useQuery()?.productsServices({ where: { name: pageUri[0] } })?.nodes
  if (Object.entries(post).length)
    return <PostComponent post={post[0]} />;
  else
    return <ErrorComponent />
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params: { pageUri } } = context
  return getNextStaticProps(context, {
    Page,
    client,
    props: {
      pageUri: pageUri
    },
    //notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}