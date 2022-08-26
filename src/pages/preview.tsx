import type { ModelTest, Page, Post, PressRelease } from 'client';
import { client } from 'client';
import { PostComponent } from '../pages/posts/[postSlug]';
import { PageComponent } from '../pages/[...pageUri]';
 
// import { ProductsComponent } from './cpt-preview/[...productsUri]';
// import { TeamComponent } from './cpt-preview/teamUri';
import { PressReleases } from './cpt-preview/pressreleaseUri';

export default function Preview() {
  const isLoading = client.useIsLoading();
  const { typeName, node } = client.auth.usePreviewNode();

  if (isLoading || node === undefined) {
    return <p>Loading...</p>;
  }

  if (node === null) {
    return <p>Post not found</p>;
  }

  switch (typeName) {
    case 'Page': {
      const page = node as Page;
      return <PageComponent page={page} slug={``} username={''} password={''} presscoverage={[]} pressrelease={[]} />;
    }
    case 'Post': {
      const post = node as Post;
      return <PostComponent post={post} username={''} password={''} />;
    }
 
    
    // case 'ProductsService': {
    //   const productz = node as ProductsService;
    //   return <ProductsComponent products={productz} username={''} password={''} />;
    // }
    // case 'TeamMember': {
    //   const team = node as TeamMember;
    //   return <TeamComponent team={team} username={''} password={''} />;
    // }
    case 'PressRelease': {
      const pressrelease = node as PressRelease;
      return <PressReleases pressrelease={pressrelease} username={''} password={''} />;
    }
    // Add custom post types here as needed
    default: {
      throw new Error(`Unknown post type: ${typeName}`);
    }
  }
}