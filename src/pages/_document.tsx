import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Set robots to noindex,nofollow if in dev/staging environment */}
          <meta
            name="robots"
            content={
              process.env.PRIMARY_DOMAIN === 'https://www.utk.edu'
                ? 'all'
                : 'noindex,nofollow'
            }
          />

          {/* used in `SiteSearch.tsx`. Loading beforeInteractive to insure 404 page search works */}
          <Script
            src="https://cse.google.com/cse.js?cx=da48cf0836de1c946"
            strategy="beforeInteractive"
          />

          {/* Google Tag Manager */}
          <Script id="google-tag-manager2" strategy="beforeInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NV22T7BX');
            `}
          </Script>
          {/* End Google Tag Manager */}

          {/* Google Tag Manager */}
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MFTLTHJ');
            `}
          </Script>

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
          {/* <link
            rel="stylesheet"
            type="text/css"
            href="https://cloud.typography.com/6831932/6125612/css/fonts.css"
          /> */}
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NV22T7BX" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          {/* End Google Tag Manager (noscript) */}

          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MFTLTHJ" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          {/* Monsido Web Optimization Scripts */}
          <Script id="Monsido" strategy="afterInteractive">
            {`window._monsido = window._monsido || {token: "oVQzcnTw65oGJbvLxauRcw",};`}
          </Script>
          <Script
            src="https://app-script.monsido.com/v2/monsido-script.js"
            strategy="afterInteractive"
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
