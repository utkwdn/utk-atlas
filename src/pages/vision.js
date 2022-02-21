import Layout from "../components/Layout";
import Head from "next/head";

function Vision() {
  return (
    <Layout>
      <Head>
        <link rel="stylesheet" href="css/vision.css" />
        <script defer type="text/javascript" src="/js/vision.js"></script>
      </Head>

      <section className="hero">
        <div className="titleBlock ">
          <div className="angleBracketDown bracketHeroAdjustment"></div>
          <h1 className="text-uppercase">
            <span className="fake-big-head">
              Strategic
              <br />
              Vision
            </span>
            <br />
            <span className="itav">It takes a Volunteer</span>
          </h1>
          <div className="triangleContainer">
            <div className="flagshipTorch"></div>
            <div className="triangle-bottomright"></div>
          </div>
        </div>

        <section className="vision">
          <h2 className="nod">Our Vision</h2>
          <p className="lead">
            A world enriched by our <span className="textPop">ideas</span>,
            improved through our <span className="textPop">action</span>, and
            inspired by the <span className="textPop">Volunteer spirit</span> of
            service and leadership
          </p>
          <a
            href="https://www.utk.edu/images/i/warmers/strategic-vision-2021.pdf"
            className="visionLink"
          >
            <span>Read the full Strategic Vision document</span>
            <span className="downloadIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-earmark-arrow-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />
              </svg>
            </span>
          </a>

          <div className=" videoContainer">
            <div className="container-fluid py-xl-5">
              <div className="row justify-content-center strip-row">
                <div className="col-12 col-sm-12 col-md-12 col-xl-12 align-self-start align-self-md-center item">
                  <div
                    className="ratio ratio-16x9 yt-container"
                    data-yt-url="https://www.youtube.com/embed/I3H4Po3dFwc?modestbranding=1&showinfo=0&showsearch=0&rel=0&autoplay=1"
                  >
                    <button className="btn border-0 yt-play">
                      <img
                        data-src="https://www.utk.edu/images/i/warmers/video-1080p-thumb-03.jpg"
                        async
                        className="lazyload"
                        alt="Play strategic vision video."
                        width="1386"
                        height="780"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="angleContainer stepsSlide">
            <p className="angleIntro">
              We know how much is possible when we unite our individual talents
              and aspirations, put compassion front and center, and
            </p>

            <p className="textSteps text-uppercase stepsSlide">
              <span className="angleCallout"></span>step forward
              <br />
              together as <br /> Volunteers.
            </p>
          </div>
        </section>
        <section className="mission">
          <h2 className="nod missionHeader">Our Mission</h2>
          <div className="missionCore">
            <p className="lead">
              We are a diverse community with a shared commitment to discovery,
              creativity, learning, and engagement.
            </p>
          </div>
          <div className="missionBlock">
            <ul className="missionList">
              <p className="cardIntro">At UT Knoxville we:</p>
              <li>
                <span className="textPopLight">Empower</span> learners of all
                ages and backgrounds to achieve their dreams through accessible
                and affordable education and state-of-the-art research training
                opportunities
              </li>
              <li>
                <span className="textPopLight">Advance</span> the prosperity,
                well-being, and vitality of communities across Tennessee and
                around the world through our research, teaching, service, and
                engagement
              </li>
              <li>
                <span className="textPopLight">Commit</span> to excellence,
                equity, and inclusion within the university, across the state,
                and in all our global activities
              </li>
            </ul>
          </div>
        </section>
        <div className="skinnyLongImg"></div>
      </section>
    </Layout>
  );
}

export default Vision;
