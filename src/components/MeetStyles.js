import Head from 'next/head';

// create a joiner to use for classNames
const cx = (...classNames) => classNames.join(' ');

// HomeHero is a section added to index.tx

const MeetStyles = () => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cloud.typography.com/6831932/7665612/css/fonts.css"
        />
        <link
          rel="stylesheet"
          href="//images.utk.edu/designsystem/meet/style20201118.css"
        />
      </Head>
      <div>
        <h2>HERO | Apply Now Message</h2>
      </div>
    </>
  );
};

export default MeetStyles;
