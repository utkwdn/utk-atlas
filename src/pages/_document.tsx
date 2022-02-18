import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="icon" href="/images/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
