import { getSitemapProps } from '@faustjs/next/server';
import { GetServerSidePropsContext } from 'next';
export default function Page() {
  return null;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return getSitemapProps(ctx, {
    frontendUrl: process.env.PRIMARY_DOMAIN!,
    wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL!,
    sitemapIndexPath: '/wp-sitemap.xml', // path in WordPress that handles sitemaps
    sitemapPathsToIgnore: ['/wp-sitemap-users-*'],
    pages: [
      {
        path: '/alpha',
      },
      {
        path: '/meet',
      },
      {
        path: '/vision',
      },
      {
        path: '/social',
      },
    ],
  });
};
