import Layout from "../components/Layout";
import Head from "next/head";
import styles from "scss/pages/itav.module.scss";
import Script from "next/script";
import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
// import Sprite from "../Sprites";

// const YoutubeEmbed = ({ embedId }) => (
//   <iframe
//     width="100%"
//     height="100%"
//     src={`//images.utk.edu/designsystem/itav/assets/bg_texture_4.mp4`}
//     frameBorder="0"
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     allowFullScreen
//     title="Play it takes a Volunteer video"
//   />
// );
// YoutubeEmbed.propTypes = {
//   embedId: PropTypes.string.isRequired,
// };

function ItTakesAVolunteer() {
  return (
    <Layout>
      {/*  <Head></Head>*/}
      <div className={styles["fullscreen-bg"]}>
        <video loop autoPlay muted className={styles["fullscreen-bg__video"]}>
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
      <div className={"container-fluid hero align-items-center"}>
        <div className={"row justify-content-center h-100 align-items-center"}>
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

      <div className="strip strip-gingham bg-orange" id="block-orange-1">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-12 col-md-11 offset-md-1 bg-white justify-content-md-center"
              id="block-intro"
            >
              {/*            <svg
                version="1.1"
                id="rain-2"
                xmlns="https://www.w3.org/2000/svg"
                xmlns:xlink="https://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 388 165.1"
                style="enable-background:new 0 0 388 165.1;"
                xml:space="preserve"
              >
                <g>
                  <g id="Group_7290" transform="translate(-152.174 -305.421)">
                    <line
                      id="Line_8708"
                      className="st0"
                      x1="539.7"
                      y1="335.5"
                      x2="490.2"
                      y2="404.6"
                    />
                    <line
                      id="Line_8709"
                      className="st0"
                      x1="491.8"
                      y1="323.1"
                      x2="433.7"
                      y2="404.6"
                    />
                    <line
                      id="Line_8710"
                      className="st0"
                      x1="435.3"
                      y1="323.1"
                      x2="377.2"
                      y2="404.6"
                    />
                    <line
                      id="Line_8711"
                      className="st0"
                      x1="378.8"
                      y1="323.1"
                      x2="320.7"
                      y2="404.6"
                    />
                    <line
                      id="Line_8712"
                      className="st0"
                      x1="322.3"
                      y1="323.1"
                      x2="264.2"
                      y2="404.6"
                    />
                    <line
                      id="Line_8713"
                      className="st0"
                      x1="265.8"
                      y1="323.1"
                      x2="207.7"
                      y2="404.6"
                    />
                    <line
                      id="Line_8714"
                      className="st0"
                      x1="209.3"
                      y1="323.1"
                      x2="151.2"
                      y2="404.6"
                    />
                    <line
                      id="Line_8720"
                      className="st0"
                      x1="539.7"
                      y1="372"
                      x2="490.2"
                      y2="441.1"
                    />
                    <line
                      id="Line_8721"
                      className="st0"
                      x1="491.8"
                      y1="359.6"
                      x2="433.7"
                      y2="441.1"
                    />
                    <line
                      id="Line_8722"
                      className="st0"
                      x1="435.3"
                      y1="359.6"
                      x2="377.2"
                      y2="441.1"
                    />
                    <line
                      id="Line_8723"
                      className="st0"
                      x1="378.8"
                      y1="359.6"
                      x2="320.7"
                      y2="441.1"
                    />
                    <line
                      id="Line_8724"
                      className="st0"
                      x1="322.3"
                      y1="359.6"
                      x2="264.2"
                      y2="441.1"
                    />
                    <line
                      id="Line_8725"
                      className="st0"
                      x1="265.8"
                      y1="359.6"
                      x2="207.7"
                      y2="441.1"
                    />
                    <line
                      id="Line_8726"
                      className="st0"
                      x1="209.3"
                      y1="359.6"
                      x2="151.2"
                      y2="441.1"
                    />
                    <line
                      id="Line_8732"
                      className="st0"
                      x1="533.3"
                      y1="420.3"
                      x2="497.9"
                      y2="470"
                    />
                    <line
                      id="Line_8733"
                      className="st0"
                      x1="476.8"
                      y1="420.3"
                      x2="441.4"
                      y2="470"
                    />
                    <line
                      id="Line_8734"
                      className="st0"
                      x1="420.3"
                      y1="420.3"
                      x2="384.9"
                      y2="470"
                    />
                    <line
                      id="Line_8735"
                      className="st0"
                      x1="363.8"
                      y1="420.3"
                      x2="328.4"
                      y2="470"
                    />
                    <line
                      id="Line_8736"
                      className="st0"
                      x1="307.3"
                      y1="420.3"
                      x2="271.9"
                      y2="470"
                    />
                    <line
                      id="Line_8737"
                      className="st0"
                      x1="250.8"
                      y1="420.3"
                      x2="215.4"
                      y2="470"
                    />
                    <line
                      id="Line_8738"
                      className="st0"
                      x1="194.3"
                      y1="420.3"
                      x2="158.9"
                      y2="470"
                    />
                    <line
                      id="Line_8839"
                      className="st0"
                      x1="533.4"
                      y1="305.4"
                      x2="502.8"
                      y2="348.7"
                    />
                    <line
                      id="Line_8840"
                      className="st0"
                      x1="476.9"
                      y1="305.4"
                      x2="446.3"
                      y2="348.7"
                    />
                    <line
                      id="Line_8841"
                      className="st0"
                      x1="420.4"
                      y1="305.4"
                      x2="389.8"
                      y2="348.7"
                    />
                    <line
                      id="Line_8842"
                      className="st0"
                      x1="363.9"
                      y1="305.4"
                      x2="333.3"
                      y2="348.7"
                    />
                    <line
                      id="Line_8843"
                      className="st0"
                      x1="307.4"
                      y1="305.4"
                      x2="276.8"
                      y2="348.7"
                    />
                    <line
                      id="Line_8844"
                      className="st0"
                      x1="250.9"
                      y1="305.4"
                      x2="220.3"
                      y2="348.7"
                    />
                    <line
                      id="Line_8845"
                      className="st0"
                      x1="194.4"
                      y1="305.4"
                      x2="163.8"
                      y2="348.7"
                    />
                  </g>
                </g>
              </svg>
*/}
              <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
                <p className="text-uppercase text-center text-condensed h2 font-weight-lighter">
                  <em>
                    The University of Tennessee community is committed to
                    lighting the way for others.
                  </em>
                </p>
                <p className="text-center">
                  We believe leadership is a selfless act, and those who are
                  willing to step forward will be ready for whatever lies ahead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ItTakesAVolunteer;
