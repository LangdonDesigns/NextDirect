import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/site',
        disallow: ['/*'],
      },
    ],
    //sitemap: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/sitemap.xml`,
  }
}