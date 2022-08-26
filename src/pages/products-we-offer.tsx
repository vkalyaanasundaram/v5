// import { getNextStaticProps, is404 } from '@faustjs/next';
// import { GetStaticPropsContext } from 'next';
// import { client, Page as PageType, PageIdType } from 'client';
// import Head from 'next/head';
// import React from 'react';
// import { CTA, Footer, Header, Posts } from 'components';
// import styles from 'scss/pages/products-we-offer.module.scss';
// import SEO from 'components/SEO/SEO'
// import FastApp from 'components/Forms/FastApp'
// import ErrorComponent from './404' 
// import SecondaryMobileMenu from "../components/SecondaryMobileMenu"
// import SecondaryMenu from "../components/SecondaryMenu"
// import {useInView} from "react-cool-inview";
// import Advancedhero from 'components/AdvancedHero';

// interface MyPageProps {
//   username: string;
//   password: string;
// }

// export interface PageProps {
//   page: PageType | PageType['preview']['node'] | null | undefined;
//   username: string;
//   password: string;
// }



// export function PageComponent({ page, username, password }: PageProps) {

//   const { useQuery } = client;
//   const generalSettings = useQuery().generalSettings;


//   return (
//     <>
//       {/* <SEO
//         title={(generalSettings)}
//         // imageUrl={mainBanner?.sourceUrl}
//       /> */}
//       <Header
//         title={generalSettings.title}
//         description={generalSettings.description}
//       />

// <SecondaryMenu title="" />
// <SecondaryMobileMenu title={page?.slug} />


//       <div className={styles.entry}>
//         <div>

//           <Advancedhero
//             model={undefined}
//             title='<h1>Financing that fits your business</h1>'
//             bgImage={page?.featuredImage?.node.sourceUrl()}
//             // alt='{page?.heroAdvanced?.desktopBanner?.altText}'
//             // disclaimer='{page?.heroAdvanced?.disclaimer}'
//             slug={page?.slug}
//             type="reviews"
//             username={username}
//             password={password} 
//             indexTitle={''}
//             />
//         </div>
//       </div>
//       <main className="content content-single">
//         <div className="wrap">
//           <div dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
//         </div>
//       </main>
//       <Footer copyrightHolder={generalSettings.title} />
//     </>
//   );
// }

// export default function Page({ username, password }: MyPageProps) {

//   const { usePage } = client;

//   const page = usePage({
//     id: 'products-we-offer',
//     idType: PageIdType.URI,
//   });

//    if(Object.entries(page).length)
//     return <PageComponent page={page} username={username} password={password} />;
//    else 
//     return <ErrorComponent /> 
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//   return getNextStaticProps(context, {
//     Page,
//     props: {
//       username: process.env.API_USERNAME,
//       password: process.env.API_PASSWORD
//     },
//     client,
//     notFound: await is404(context, { client }),
//   });
// }



import { getNextStaticProps, is404 } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import { client, Page as PageType, PageIdType } from 'client';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header, Posts } from 'components';
import styles from 'scss/pages/products-we-offer.module.scss';
import SEO from 'components/SEO/SEO'
import FastApp from 'components/Forms/FastApp'
import ErrorComponent from './404'
import SecondaryMobileMenu from "../components/SecondaryMobileMenu"
import SecondaryMenu from "../components/SecondaryMenu"
import { useInView } from "react-cool-inview";
import AdvancedHero from 'components/AdvancedHero';
import { useRouter } from 'next/router';
import { validateConfig } from '@faustjs/next/dist/cjs/middleware/sitemaps/handleSitemapRequests';

interface MyPageProps {
  username: string;
  password: string;
}

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
  username: string;
  password: string;
}



export function PageComponent({ page, username, password }: PageProps) {

  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  // console.log(useQuery().modelTests().nodes[0].mainTitle);
  const ProductsContent = useQuery();


  const router = useRouter()
  let currentSlugName = {};
  if (router?.pathname) {
    // console.log(router?.pathname);
    currentSlugName = router?.pathname.replace("/", "");
  }
  // console.log(ProductsContent?.page({id: "products-we-offer" })?.title());
  const da = ProductsContent?.pages({ first: 100 })?.nodes;
  const productsBanner = useQuery().modelTests().nodes;
  let productBannerTitle = "";
  da.map((val, key) => {
    if (currentSlugName == val.slug) {
      productsBanner.map((v) => {
        if (v.slug == "products-we-offer") {
          productBannerTitle = v?.mainTitle;
        }
      })
    }
  })




  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });
  return (
    <>
      {/* <SEO
        title={(generalSettings)}
        // imageUrl={mainBanner?.sourceUrl}
      /> */}
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      // output={{}}

      />

      <SecondaryMenu title="" />
      <SecondaryMobileMenu title={page?.slug} />



      {/* {ProductsContent.map((value, key) => { */}

      <div className={styles.entry}>
        <section className={`${styles.bgImage}`} >

          <AdvancedHero
            title={productBannerTitle}
            indexTitle=''
            // bgImage={productsService?.heroAdvanced?.desktopBanner?.sourceUrl()}
            bgImage={page?.featuredImage?.node?.mediaItemUrl}
            column='two'
            slug={page?.slug}
          />
        </section>
      </div>
      <div dangerouslySetInnerHTML={{ __html: page?.content() }}></div>
      <section ref={observe}>{inView && <Footer copyrightHolder={generalSettings.title} username={username} password={password} />}</section>

    </>
  );
}



export default function Page({ username, password }: MyPageProps) {

  const { usePage } = client;

  const page = usePage({
    id: 'products-we-offer',
    idType: PageIdType.URI,
  });

  if (Object.entries(page).length)
    return <PageComponent page={page} username={username} password={password} />;
  else
    return <ErrorComponent />
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    props: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    },
    client,
    notFound: await is404(context, { client }),
  });
}