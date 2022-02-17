import Layout from "../components/Layout";

function Vision() {
  return (
    <Layout>
      <section class="hero">
        <div class="titleBlock ">
          <div class="angleBracketDown bracketHeroAdjustment"></div>
          <h1 class="text-uppercase">
            <span class="fake-big-head">
              Strategic
              <br />
              Vision
            </span>
            <br />
            <span class="itav">It takes a Volunteer</span>
          </h1>
          <div class="triangleContainer">
            <div class="flagshipTorch"></div>
            <div class="triangle-bottomright"></div>
          </div>
        </div>

        <section class="vision">
          <h2 class="nod">Our Vision</h2>
          <p class="lead">
            A world enriched by our <span class="textPop">ideas</span>, improved
            through our <span class="textPop">action</span>, and inspired by the{" "}
            <span class="textPop">Volunteer spirit</span> of service and
            leadership
          </p>
          <a
            href="https://www.utk.edu/images/i/warmers/strategic-vision-2021.pdf"
            class="visionLink"
          >
            <span>Read the full Strategic Vision document</span>
            <span class="downloadIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-arrow-down-fill"
                viewBox="0 0 16 16"
              >
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />
              </svg>
            </span>
          </a>

          <div class=" videoContainer">
            <div class="container-fluid py-xl-5">
              <div class="row justify-content-center strip-row">
                <div class="col-12 col-sm-12 col-md-12 col-xl-12 align-self-start align-self-md-center item">
                  <div
                    class="ratio ratio-16x9 yt-container"
                    data-yt-url="https://www.youtube.com/embed/I3H4Po3dFwc?modestbranding=1&showinfo=0&showsearch=0&rel=0&autoplay=1"
                  >
                    <button class="btn border-0 yt-play">
                      <img
                        data-src="https://www.utk.edu/images/i/warmers/video-1080p-thumb-03.jpg"
                        async
                        class="lazyload"
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

          <div class="angleContainer stepsSlide">
            <p class="angleIntro">
              We know how much is possible when we unite our individual talents
              and aspirations, put compassion front and center, and
            </p>

            <p class="textSteps text-uppercase stepsSlide">
              <span class="angleCallout"></span>step forward
              <br />
              together as <br /> Volunteers.
            </p>
          </div>
        </section>
        <section class="mission">
          <h2 class="nod missionHeader">Our Mission</h2>
          <div class="missionCore">
            <p class="lead">
              We are a diverse community with a shared commitment to discovery,
              creativity, learning, and engagement.
            </p>
          </div>
          <div class="missionBlock">
            <ul class="missionList">
              <p class="cardIntro">At UT Knoxville we:</p>
              <li>
                <span class="textPopLight">Empower</span> learners of all ages
                and backgrounds to achieve their dreams through accessible and
                affordable education and state-of-the-art research training
                opportunities
              </li>
              <li>
                <span class="textPopLight">Advance</span> the prosperity,
                well-being, and vitality of communities across Tennessee and
                around the world through our research, teaching, service, and
                engagement
              </li>
              <li>
                <span class="textPopLight">Commit</span> to excellence, equity,
                and inclusion within the university, across the state, and in
                all our global activities
              </li>
            </ul>
          </div>
        </section>
        <div class="skinnyLongImg"></div>
      </section>
    </Layout>
  );
}

export default Vision;