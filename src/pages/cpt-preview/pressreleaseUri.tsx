import { getNextStaticProps, is404 } from '@faustjs/next';
import { Footer, Header } from 'components';
import { GetStaticPropsContext } from 'next';
import { client, PressRelease as PressReleaseType } from 'client';
import AdvancedHero from '../../components/AdvancedHero'
interface MyPageProps {
  username: string;
  password: string;
}

export interface PressReleaseProps {
  pressrelease: PressReleaseType | PressReleaseType['preview']['node'] | null | undefined;
  username: string;
  password: string;
}

export function PressReleases({ pressrelease, username, password }: PressReleaseProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  return (
    <>
      <Header
        title={`${pressrelease?.title()} - ${generalSettings.title}`}
        description={generalSettings.description}
        // metaDesc={pressrelease?.seo?.metaDesc}
        // opengraphTitle={pressrelease?.seo?.metaTitle}
        // targetKeywords={pressrelease?.seo?.targetKeywords}
      />

{/*       <Advancedhero
        indexTitle=''
        // title={page?.title()}
        // bgImage={page?.featuredImage.node.sourceUrl()}
        //  title={page?.standardPage?.heroTitle}
        title={pressrelease?.title()}
   
    /> */}

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: pressrelease?.content() ?? '' }} />
        </div>
      </main>

      <Footer copyrightHolder={generalSettings.title} username={username} password={password} />;
    </>
  );
}

export default function Page({ username, password }: MyPageProps) {
/*   const { usePage } = client;
  const team = usePage(); */
  return <PressReleases pressrelease={null} username={username} password={password} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    props: {
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    },
    notFound: await is404(context, { client }),
  });
}

/* export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
} */