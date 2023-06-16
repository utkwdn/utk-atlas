import { NextRequest, NextResponse } from 'next/server';

/*
  Note:
  To comply with https://github.com/vercel/next.js/pull/36772,
  we've replaced `src/pages/_middleware.tsx` with this file.
  Simply copy-pasted its contents, and I don't *think* there's
  anything else we need to do in this case. For reference,
  instructions are here: https://nextjs.org/docs/messages/nested-middleware#possible-ways-to-fix-it
*/

export function middleware(req: NextRequest) {
  // PRIMARY_DOMAIN should be a full URL including protocol, e.g. https://www.google.com
  const hasEnvVariable = !!process.env.PRIMARY_DOMAIN;
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!hasEnvVariable) {
    !isDevelopment &&
      console.error(
        'You must provide a PRIMARY_DOMAIN environment variable for the domain normalization middleware to work correctly'
      );
    return NextResponse.next();
  }

  //const url = req.nextUrl.clone();
  const url = req.nextUrl;
  const normalizedHost = new URL(process.env.PRIMARY_DOMAIN || '');
  const host = req.headers.get('host');

  const isCorrectHostname = host?.split(':')[0] === normalizedHost.hostname;

  if (!isCorrectHostname) {
    url.protocol = normalizedHost.protocol;
    url.host = normalizedHost.host;
    url.port = normalizedHost.port;
    return NextResponse.redirect(url);
  }
}
