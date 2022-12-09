import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/images/favicons/favicon.ico" sizes="any" />
          <link
            rel="icon"
            href="/images/favicons/icon.svg"
            type="image/svg+xml"
          />
          <link
            rel="apple-touch-icon"
            href="/images/favicons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cloud.typography.com/6831932/6125612/css/fonts.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* used in `SiteSearch.tsx`. Loading beforeInteractive to insure 404 page search works */}
          <Script
            src="https://cse.google.com/cse.js?cx=da48cf0836de1c946"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
