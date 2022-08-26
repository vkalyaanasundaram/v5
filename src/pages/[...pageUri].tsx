import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header, Hero } from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
// import { client, Page as PageType } from 'client';
import { client, Page as PageType, PressCoverage, PressRelease } from 'client';

import styles from '../scss/pages/home.module.scss'
import ErrorComponent from './404'
import MediaCenter from 'components/MediaCenter'

export interface PageProps {
  page: PageType | PageType['preview']['node'] | null | undefined;
  slug: string;
  presscoverage: PressCoverage[];
  pressrelease: PressRelease[];
  username: string;
  password: string;
}

interface MyPageProps {
  pageUri: string;
  username: string;
  password: string;
}

export function PageComponent({ page, slug, presscoverage, pressrelease, username, password }: PageProps) {
// export function PageComponent({ page, slug, username, password }: PageProps) {
// export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <Head>
        <title>
          {page?.title()} - {generalSettings.title}
        </title>
      </Head>
      <div className={styles.entry}>
        <div className={styles.special} >
          <div className={styles.subheading}
            style={{    

            }}>
            <h1>
              {page?.title()}
            </h1>
          </div>
          <Hero
            title=''
            // title={page?.title() }
            bgImage={page?.featuredImage?.node.sourceUrl()} />
        </div>
      </div>
      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: page?.content() ?? '' }} />
        </div>
      </main>
      {slug == 'media-center' && <MediaCenter presscoverage={presscoverage} pressrelease={pressrelease} />}

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page({ pageUri, username, password }: MyPageProps) {
  const { usePage, useQuery } = client;
  const page = usePage();

  const presscoverage = useQuery().pressCoverages({first: 300 })?.nodes;
  const pressrelease = useQuery().pressReleases({first: 100 })?.nodes;
  if(Object.entries(page).length)
    return <PageComponent page={page} slug={pageUri[0]} presscoverage={presscoverage} pressrelease={pressrelease} username={username} password={password} />;
  else 
    return <ErrorComponent />
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const {params : { pageUri } } = context
  return getNextStaticProps(context, {
    Page,
    client,
    props: {
      pageUri: pageUri,
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    },
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
