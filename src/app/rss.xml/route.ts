import {NextResponse} from 'next/server';
import trDict from '@/app/dictionaries/tr.json';

export async function GET() {
  const news = (trDict as any).data?.news || [];
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const itemsXml = news.map((item: any) => {
    const pubDate = new Date(item.date).toUTCString();
    return `
      <item>
        <title><![CDATA[${item.title}]]></title>
        <link>${siteUrl}/media/${item.slug}</link>
        <description><![CDATA[${item.excerpt}]]></description>
        <pubDate>${pubDate}</pubDate>
        <guid>${siteUrl}/media/${item.slug}</guid>
      </item>
    `;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DN Holding - Medya ve Haberler</title>
    <link>${siteUrl}</link>
    <description>DN Holding ile ilgili en son haberler, projeler ve duyurular.</description>
    <language>tr</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed.trim(), {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
