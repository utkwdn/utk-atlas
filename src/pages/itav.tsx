import Layout from "../components/Layout";
import Head from "next/head";
import styles from "scss/pages/itav.module.scss";
import Script from "next/script";
import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
// import Sprite from "../Sprites";

const YoutubeEmbed = ({ embedId }) => (
  <iframe
    width="100%"
    height="100%"
    src={`//images.utk.edu/designsystem/itav/assets/bg_texture_4.mp4`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Play it takes a Volunteer video"
  />
);
YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

function ItTakesAVolunteer() {
  return (
    <Layout>
      <Head></Head>
      <div className="fullscreen-bg">
        <video
          loop
          autoPlay
          muted
          poster="//images.utk.edu/designsystem/itav/assets/i/itav_header_bg_1.jpg"
          class="fullscreen-bg__video"
        >
          <source
            src="//images.utk.edu/designsystem/itav/assets/bg_texture_4.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="container-fluid" id="ut_identifier">
        <div className="row justify-content-between py-2 align-items-center">
          <a
            href="https://www.utk.edu"
            className={"home_link col-2 col-md-5 pb-3 itav-top-logo"}
          ></a>
        </div>
      </div>
      <div className={["container-fluid hero align-items-center"]}>
        <div
          className={["row justify-content-center h-100 align-items-center"]}
        >
          <div
            className={
              "col-12 col-lg-8 col-xl-10 h-100 text-center video-overlay"
            }
          >
            <a href="#block-orange-1">
              <img
                id="scroll-down"
                height="50"
                width="50"
                src="https://images.utk.edu/designsystem/itav/assets/i/iconmonstr-angel-down-thin-240.png"
                alt="Scroll Down"
                className={"img-fluid"}
              />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ItTakesAVolunteer;
