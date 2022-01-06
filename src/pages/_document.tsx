import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
		  <link
		  	rel="dns-prefetch"
			href="//images.utk.edu"
		  />
          <link
            rel="stylesheet"
			id="utk-bootstrap-designsytemstyles-css"
            href="https://images.utk.edu/designsystem/v1/0.0.9/assets/css/style.css"
            type="text/css"
            media="all"
          />
          <link
            rel="stylesheet"
			      id="utk-www-css"
            href="/public/css/styles.css"
            type="text/css"
            media="all"
          />
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
