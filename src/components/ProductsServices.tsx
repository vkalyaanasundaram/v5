/* eslint-disable @next/next/no-img-element */
import { ProductsService as ProductsServiceType } from 'client';
// import { client, ModelTest as ModelTestType, ModelTestIdType } from 'client';
 
// import { Advancedhero, Intro, Faqs, Relatedblogs, CommonCard, Carousel } from 'components';
 
import Images from "next/image";
import styles from 'scss/components/ProductsServices.module.scss';
// import LastCTA from "../LastCTA";
import {useInView} from "react-cool-inview";
import { features, title } from 'process';
import Advancedhero from './AdvancedHero';
 import Head from 'next/head';
import { Header, Footer } from 'components';
 
 


interface ProductsServiceProps {
  productsService: ProductsServiceType;
   username: string;
  password: string;
}

export default function ProductsServices({  productsService, username, password }: ProductsServiceProps) {
  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });


 
 

  console.log({productsService});
 
  return (
    <>
      <Advancedhero
        // model={undefined}
        // title={productsService?.content()}
        // bgImage={productsService?.featuredImage?.node.sourceUrl()}
        // alt='{page?.heroAdvanced?.desktopBanner?.altText}'
        // disclaimer='{page?.heroAdvanced?.disclaimer}'
        // slug={productsService?.slug }
        // type="reviews"
        // username={username}
        // password={password}
        indexTitle={productsService?.title()}
        // slug={model?.slug}
        title={title }
   />
   
           {/* {model.map((model) => (
            <Mode 
              key={model.slug} 
              model={model} 
              username={''} 
              password={''} 
            />
          ))} */}
 
      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: productsService?.content() ?? '' }} />
        </div>
      </main>
    </>
  );
}