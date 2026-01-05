
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(targetUrl);
    
    // Check if the response is valid
    if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
            return NextResponse.json({ error: 'Access denied to this URL. It might require login or block bots.' }, { status: 403 });
        }
        return NextResponse.json({ error: `Failed to fetch URL: ${response.status} ${response.statusText}` }, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract Metadata
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    const image = $('meta[property="og:image"]').attr('content') || '';
    
    // Attempt to extract main content text (heuristic)
    // Remove scripts, styles, nav, footer to clean up
    $('script, style, nav, footer, header, aside').remove();
    const content = $('article').text() || $('main').text() || $('body').text();
    
    // Clean whitespace
    const cleanContent = content.replace(/\s+/g, ' ').trim().substring(0, 500) + '...'; // Limit content length for preview

    return NextResponse.json({
      title,
      description,
      image,
      content: cleanContent
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json({ error: 'Failed to scrape URL' }, { status: 500 });
  }
}
