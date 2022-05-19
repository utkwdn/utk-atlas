import Layout from "../components/Layout";
import Head from "next/head";
import styles from "scss/pages/meet.module.scss";
import Script from "next/script";
import styles2 from "../components/MeetStyles";

const cx = (...classNames) => classNames.join(" ");


function Vision() {
  return (
    <Layout>
      <Head>
        <script defer type="text/javascript" src="/js/vision.js"></script>


                <link
                  rel="stylesheet"
                  type="text/css"
                  href="https://cloud.typography.com/6831932/7665612/css/fonts.css"
                />
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="https://images.utk.edu/designsystem/meet/style20201118.css"
                />

      </Head>

      <div className="position-sticky">
        <ul id="list-navigation"  className="nav nav-pills justify-content-center position-sticky">
          <li className="nav-item">
            <a className="nav-link" href="#experience">Experience</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#study">Study</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#afford">Afford</a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  href="#traditions">Traditions</a>
          </li>
        </ul>
      </div>


      <main id="content">
      {[[
      // <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true"  displayed="false">
      //   <div className="modal-dialog">
      //     <div className="modal-content">
      //       <div className="modal-header">
      //         <h5 className="modal-title" id="exampleModalLabel">Tell Us a Little About You!</h5>
      //         <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
      //           <span aria-hidden="true">&times;</span>
      //         </button>
      //       </div>
      //       <div className="modal-body">
      //         <div id="form_37fdc06c-875e-4e16-b7ba-f74b4c074deb">Loading...</div>
      //          // reinsert form here
      //       </div>
      //     </div>
      //   </div>
      // </div>
      ]]}


      <div
        className="row bg-light align-items-end mb-md-5 mb-lg-0 align-items-lg-center bg-img-header no-gutters"
        style={{
          backgroundImage: 'url(//images.utk.edu/designsystem/meet/2021-smokey_header.jpg)'

        }}

        >

        <div className="container-top">
          <div className="row no-gutters">

            <div className="col-12 col-lg-5  py-3">
              <div className="p-4 bg-white">
                <h1
                  className="text-uppercase text-stroke text-hide"
                  style={{
                    backgroundImage: 'url(https://images.utk.edu/designsystem/meet/welcometout.svg)',
                  }}
                  >Meet UT</h1>
                <p className="lead">UT is a place to learn and a place to grow. We hope you&lsquo;ll call it your home, sweet home.</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div id="experience">
        <div className="container-fluid bg-orange  pt-lg-1 pb-5">
          <div className="col-12 col-md-10 offset-md-1 mt-n5   bg-homesweet"

            style={{
              backgroundImage: 'url(//images.utk.edu/designsystem/meet/campusview_1.jpg)'

            }}
          >
            <div className="row align-items-end">
              <div className="col-12 col-xl-6 bg-white mb-xl-5  offset-xl-7 pt-5 p-2 p-md-5   bg-illustration"
              style={{
                backgroundImage: 'url(https://images.utk.edu/designsystem/meet/meet_bg_illustrations_torch_1.svg)'
              }}
              >
                <h2>Our Home Sweet Home</h2>
                <p className="mb-0">The moment you set foot on Rocky Top (our affectionate name for campus), you&lsquo;ll find a place that feels like home. Our 910-acre campus is filled with energy and tradition. This is a place where you can learn and grow with the support of a Volunteer family.</p>
            </div>
          </div>
        </div>
        </div>


      <div className="container-fluid bg-smokey text-center py-5 bg-img-cta   row no-gutters align-items-center"
      style={{
        backgroundImage: 'url(//images.utk.edu/designsystem/meet/meet_web_ayres_gray_bg_1.jpg)',

        backgroundSize: 'cover',
      }}
      >
        <div className="col-12 col-md-6 mx-auto">
          <svg
            version="1.1"
            className="icon-tn"
            xmlnsXlink="//www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 103 25"
            xmlSpace="preserve">
              <path
                className="st0"
                d="M13.2,2.8l-11,20.7l69,0.2l6.5-7.5l5.6,0l17.4-15.9l-70,0.2L28.4,3L13.2,2.8z" />
          </svg>
          <h2 className="text-white mt-5 text-uppercase">Want to learn more?</h2>
          <p className="text-white mb-5">...and get a free sticker!</p>
          <button type="button" className="btn btn-light btn-chevron mb-5 text-uppercase" data-toggle="modal" data-target="#exampleModal">Join our mailing list</button>
        </div>
      </div>


        <div className="container-fluid bg-light   pb-4 py-md-5"
        style={{
          backgroundImage: 'url(//images.utk.edu/designsystem/meet/meet_web_mtn_bg_1.jpg)'

        }}
        >
          <div className="container">
            <div className="row align-items-center mt-5">
              <div className="col-12 col-lg-6 order-lg-2 mb-5">
                <div className="framed">
                  <div className="embed-responsive embed-responsive-16by9 mb-md-0">
                  <iframe width="560" height="315" className="embed-responsive-item" src="https://www.youtube.com/embed/QAS8yNqJj9M"   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-4 offset-xl-1 mb-4 mb-lg-0">
                <img
                  src="//images.utk.edu/designsystem/meet/arrow_1.svg"

                  className="img-arrow"
                  alt=""
                />
                <h2>Everything you need to know about UT in three minutes!</h2>
            </div>
          </div>
        </div>
        </div>


      <div id="study">
        <div className="bg-orange pb-5">
          <div className="container">
        </div>
        <div className="container">
          <div className="row no-gutters">
              <div className="col-12 col-md-10 offset-md-1  mt-md-n5">
                <picture className=" ">

                  <source media="(min-width: 1400px)" srcSet="//images.utk.edu/designsystem/meet/girlengineer_xl.jpg" />
                  <source media="(min-width: 992px)" srcSet="//images.utk.edu/designsystem/meet/girlengineer_lg.jpg" />
                  <source media="(min-width: 768px)" srcSet="//images.utk.edu/designsystem/meet/girlengineer_md.jpg" />
                  <source media="(min-width: 600px)" srcSet="//images.utk.edu/designsystem/meet/girlengineer_sm.jpg" />
                  <source media="(min-width: 576px)" srcSet="//images.utk.edu/designsystem/meet/girlengineer_xs.jpg" />
                  <source srcSet="//images.utk.edu/designsystem/meet/girlengineer_xl.jpg" />
                  <img
                    src="//images.utk.edu/designsystem/meet/girlengineer_xl.jpg"
                    alt="" />
                </picture>
              </div>


            <div className="col-12 col-md-4 col-lg-5 offset-md-1">
                <picture className=" ">

                  <source media="(min-width: 1000px)" srcSet="//images.utk.edu/designsystem/meet/2021-Lab_900x1100.jpg" />
                  <source media="(min-width: 992px)" srcSet="//images.utk.edu/designsystem/meet/2021-Lab_900x1100.jpg" />
                  <source media="(min-width: 768px)" srcSet="//images.utk.edu/designsystem/meet/sciencesat_300x750.jpg" />
                  <source media="(min-width: 576px)" srcSet="//images.utk.edu/designsystem/meet/sciencesat_300x75dd0.jpg" />
                  <source srcSet="//images.utk.edu/designsystem/meet/2021-Lab_900x800.jpg" />
                  <img src="//images.utk.edu/designsystem/meet/2021-Lab_900x800.jpg" alt="" />
                </picture>
            </div>
            <div className="col-12 col-md-7 col-lg-6 bg-white">
              <div className="p-3 p-md-5 bg-white mt-n5   bg-illustration"
              style={{
                backgroundImage: 'url(https://images.utk.edu/designsystem/meet/meet_bg_illustrations_ayres_1.svg)'
              }}
              >
                <h2 className="text-condensed">Follow Your Passion</h2>
                <p>Want to become a teacher, an engineer, or have a vision for a job that is yet to exist? With <a className="info-link" href="https://admissions.utk.edu/study/?utm_source=meet-landing-page-2021&utm_medium=website&utm_campaign=meet-ut-2021&utm_id=0&utm_content=degree-options" target="_blank" rel="noreferrer">360+ undergraduate degree options</a>, honors programs, and an emphasis on research and service-learning, UT will prepare you for what comes after college. We may look like a large university, but our caring faculty and staff will make your time here personal and welcoming.</p>
              </div>
            </div>
          <div className="col-12 col-md-10 offset-md-1">
                <picture className=" ">

                  <source media="(min-width: 1400px)" srcSet="//images.utk.edu/designsystem/meet/sciencesat_1200x600.jpg" />
                  <source media="(min-width: 1200px)" srcSet="//images.utk.edu/designsystem/meet/sciencesat_1200x600.jpg" />
                  <source media="(min-width: 992px)" srcSet="//images.utk.edu/designsystem/meet/sciencesat_1200x600.jpg" />
                  <source media="(min-width: 768px)" srcSet="//images.utk.edu/designsystem/meet/2021-Lab_1200x600.jpg" />
                  <source srcSet="//images.utk.edu/designsystem/meet/sciencesat_xs.jpg" />
                  <img src="//images.utk.edu/designsystem/meet/sciencesat_xl.jpg" alt="" />

                </picture>
           </div>



          </div>
        </div>
      </div>


      <div>
      <div className="container-fluid bg-light pb-4 py-md-5 no-gutters"
      style={{

        backgroundImage: 'url(//images.utk.edu/designsystem/meet/repeatingpattern_white_1.jpg)'

      }}
      >
        <div className="container">
          <div className="row  align-items-center mt-5">
            <div className="col-12 col-md-5 col-lg-6 col-xl-5 order-md-2 mb-5">
              <div className="framed">

                <img className=" " src="//images.utk.edu/designsystem/meet/2021-research.jpg" width="900" height="900" alt="Graduates." />

              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 col-xl-5 offset-xl-1">
              <div className="border-orange-highlight text-left">
                <h2>Opportunities Made for You</h2>
                <p>With the support of our expert faculty, students <a className="info-link" href="https://admissions.utk.edu/study/undergraduate-research/?utm_source=meet-landing-page-2021&utm_medium=website&utm_campaign=meet-ut-2021&utm_id=0&utm_content=research" target="_blank" rel="noreferrer">engage in research and creative endeavors</a>, pursing career opportunites, and discovering answers to challenging questions.</p>
                <p>Our region is home to major businesses and innovators that partner with the university and offer internships and careers, including Oak Ridge National Laboratory, the US Department of Energy&apos;s largest science and energy laboratory.</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="container-fluid bg-smokey text-center py-5 bg-img-cta   row no-gutters align-items-center"
      style={{

        backgroundImage: 'url(://images.utk.edu/designsystem/meet/experiencecampus_1.svg)'

      }}
      >
        <div className="col-12 col-md-6 mx-auto">
          <svg
            version="1.1"
            className="icon-tn"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 103 25"
            >
      <path className="st0" d="M13.2,2.8l-11,20.7l69,0.2l6.5-7.5l5.6,0l17.4-15.9l-70,0.2L28.4,3L13.2,2.8z" />
      </svg>
          <h2 className="text-white my-5 text-uppercase">We Can&rsquo;t Wait To Show You Around Rocky Top</h2>
          <a className="btn btn-light btn-chevron mb-5 text-uppercase" href="https://admissions.utk.edu/visit/?utm_source=meet-landing-page-2021&utm_medium=website&utm_campaign=meet-ut-2021&utm_id=0&utm_content=visit" target="_blank" rel="noreferrer">Visit Campus</a>
        </div>
      </div>

        <div className="container-fluid bg-light bg-img-fixed p-0 no-gutters module-50 bg-aerial">
        </div>




      <div className="container-fluid bg-orange pb-5 pt-4 pt-md-0">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-12 col-lg-10 offset-lg-1 mt-md-n5">

              <img className=" " src="//images.utk.edu/designsystem/meet/knox_skyline.jpg" width="1800" height="600" alt="Knoxville Skyline" />

            </div>
            <div className="row no-gutters">


              <div className="col-12 col-md-8 col-lg-6 bg-white order-3 order-md-1 bg-illustration"
              style={{
                backgroundImage: 'url(https://images.utk.edu/designsystem/meet/meet_bg_illustrations_boat_1.svg)'
              }}
              >
                <div className="p-3 p-md-5">
                  <h2>Knoxville and Beyond</h2>
                  <p>In <a className="info-link" href="https://admissions.utk.edu/visit/knoxville-and-east-tennessee/?utm_source=meet-landing-page-2021&utm_medium=website&utm_campaign=meet-ut-2021&utm_id=0&utm_content=big-orange-country" target="_blank" rel="noreferrer">Big Orange Country</a>, mountains, rivers, and trails come together to connect the urban and the wild. Close to campus is downtown Knoxville with shops. restaurants, theaters, and more. Nearby is Knoxville&apos;s renowned Urban Wilderness, and the Great Smoky Mountains National Park, with 800+ miles of trails, is just down the road.</p>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-5 order-md-1">
                <div className="row no-gutters">
                  <div className="col-6 col-md-12">
                    <picture className=" ">

                      <source media="(min-width: 1200px)" srcSet="//images.utk.edu/designsystem/meet/wakeboard_lg-1.jpg" />
                      <source media="(min-width: 992px)" srcSet="//images.utk.edu/designsystem/meet/wakeboard_md.jpg" />
                      <source media="(min-width: 768px)" srcSet="//images.utk.edu/designsystem/meet/wakeboard_sm.jpg" />
                      <source srcSet="//images.utk.edu/designsystem/meet/wakeboard_xs.jpg" />
                      <img src="//images.utk.edu/designsystem/meet/wakeboard_xs.jpg" width="600" height="900" alt="Wake Board" />

                    </picture>
                  </div>
                  <div className="col-6 col-md-12">
                    <picture className=" ">

                      <source media="(min-width: 1200px)" srcSet="//images.utk.edu/designsystem/meet/bike_lg-1.jpg" />
                      <source media="(min-width: 992px)" srcSet="//images.utk.edu/designsystem/meet/bike_md.jpg" />
                      <source media="(min-width: 768px)" srcSet="//images.utk.edu/designsystem/meet/bike_sm.jpg" />
                      <source srcSet="//images.utk.edu/designsystem/meet/bike_xs.jpg" />
                      <img src="//images.utk.edu/designsystem/meet/bike_xl.jpg" width="600" height="900" alt="Mountain biking." />

                    </picture>
                  </div>
                </div>
              </div>


              <div className="row no-gutters order-md-3">
                <div className="col-5  col-lg-4 offset-lg-1">

                  <img className=" " src="//images.utk.edu/designsystem/meet/2021-marketsquare.jpg" width="1200" height="1000" alt="Market Square" />
                </div>
                <div className="col-7  col-lg-6 offset-lg-0 order-4">
                   <picture className=" ">
                      <source media="(min-width: 992px)" srcSet="//images.utk.edu/designsystem/meet/2021-smokies.jpg" />
                      <source srcSet="//images.utk.edu/designsystem/meet/2021-marketsquare_xs.jpg" />
                      <img src="//images.utk.edu/designsystem/meet/2021-smokies.jpg" width="600" height="900" alt="The Smokies." />
                    </picture>

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>




      </div>
      <div id="afford">
      <div className="container-fluid bg-light pb-4 py-md-5 no-gutters"
      style={{

        backgroundImage: 'url(//images.utk.edu/designsystem/meet/texture_2.jpg)'

      }}
      >
        <div className="container">
          <div className="row  align-items-center mt-5">
            <div className="col-12 col-md-5 col-lg-6 col-xl-5 order-md-2 mb-5">
              <div className="framed">

                <img className=" " src="//images.utk.edu/designsystem/meet/2021-graduates.jpg" width="900" height="900" alt="Graduates." />

              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-6 col-xl-5 offset-xl-1">
              <div className="border-orange-highlight">
                <h2>We Want to Invest in You</h2>
                <p>Nearly half of our students graduate with no debt thanks to a variety of scholarships. And we work with you to prepare for whatever may come next. More than 80 percent of our graduates are employed or in graduate school within six months of finishing their degree, and all our graduates join a global network of more than 260,000 alumni ready to help open doors for fellow Vols.</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="container-fluid bg-img-fixed-medium bg-bench"
      style={{

        backgroundImage: 'url(//images.utk.edu/designsystem/meet/pedwalkway_1.jpg)'

      }}
      >
          <div className="row align-items-end align-items-md-center module">
            <div className="col-12 col-md-10 mx-auto ml-lg-4 col-lg-5 bg-white mb-lg-5 offset-lg-0 pt-5 p-2 p-md-5">
              <blockquote className="blockquote">
                <p className="mb-0">People underestimate the connections you make in college. I wouldn’t be here in my career at all if it wasn’t for the friends I met in class or the professors I met.”</p>
                <footer className="blockquote-footer"><cite title="Source Title">Andy // young alumnus // Knoxville, TN</cite></footer>
              </blockquote>
            </div>
          </div>
      </div>


      <div className="container-fluid bg-smokey text-center py-5 bg-img-cta   row no-gutters align-items-center"
      style={{

        backgroundImage: 'url(//images.utk.edu/designsystem/meet/texture_rowing.jpg)'

      }}
      >
        <div className="col-12 col-md-6 mx-auto">
          <svg version="1.1" className="icon-tn" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 103 25" xmlSpace="preserve">
      <path  className="st0" d="M13.2,2.8l-11,20.7l69,0.2l6.5-7.5l5.6,0l17.4-15.9l-70,0.2L28.4,3L13.2,2.8z" />
      </svg>
          <h2 className="text-white  my-5 text-uppercase">Find out what makes UT such a good investment</h2>
          <a className="btn btn-light btn-chevron mb-5  text-uppercase" href="https://admissions.utk.edu/afford/?utm_source=meet-landing-page-2021&utm_medium=website&utm_campaign=meet-ut-2021&utm_id=0&utm_content=value" target="_blank" rel="noreferrer">Learn More about Our Value</a>
        </div>
      </div>

      </div>
      <div id="apply">


      <div className="container-fluid bg-orange  pt-lg-1 pb-5">
        <div className="col-12 col-md-10 offset-md-1 mt-lg-n5 bg-img-scroll   bg-community"
        style={{

          backgroundImage: 'url(//images.utk.edu/designsystem/meet/2021-community_service.jpg)'

        }}
        >
          <div className="row align-items-end">
            <div className="col-12 col-xl-6 bg-white mb-lg-5 ml-lg-n5 pt-5 p-2 p-md-5 bg-illustration"
            style={{
              backgroundImage: 'url(https://images.utk.edu/designsystem/meet/meet_bg_illustrations_torch_1.svg)'
            }}
            >
              <blockquote className="blockquote">
                <p className="mb-0">To me, being a Volunteer means giving yourself to others and also trying to help the community.”</p>
                <footer className="blockquote-footer"><cite title="Source Title">Elizabeth // Neuroscience // Oak Ridge, TN</cite></footer>
              </blockquote>
              <p>We live the Volunteer spirit, stepping forward in service and leadership, through our classes and countless opportunities for community involvement. We bear the torch to give light to others.</p>
            </div>
          </div>
        </div>
      </div>







        <div className="container-fluid bg-light bg-img-fixed p-0 no-gutters module-50 bg-campus"
        style={{

          backgroundImage: 'url(//images.utk.edu/designsystem/meet/studentsoncampus_1.jpg)'

        }}
        >
        </div>

      <div className="container-fluid bg-smokey text-center py-5 bg-img-cta   row no-gutters align-items-center"
      style={{

        backgroundImage: 'url(//images.utk.edu/designsystem/meet/2021-becomeavol_1.svg)'

      }}
      >
        <div className="col-12 col-md-6 mx-auto">
          <svg version="1.1" className="icon-tn" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 103 25"  xmlSpace="preserve">
      <path  className="st0" d="M13.2,2.8l-11,20.7l69,0.2l6.5-7.5l5.6,0l17.4-15.9l-70,0.2L28.4,3L13.2,2.8z" />
      </svg>
          <h2 className="text-white  my-5 text-uppercase">Ready to Join Us?</h2>
          <a className="btn btn-light btn-chevron mb-5 text-uppercase" href="https://admissions.utk.edu/apply/?utm_source=meet-landing-page-2021&utm_medium=website&utm_campaign=meet-ut-2021&utm_id=0&utm_content=apply" target="_blank" rel="noreferrer">Learn How to Apply</a>
        </div>
      </div>


      </div>
      <div id="traditions">
      <div className="container-fluid bg-orange  py-3 py-md-5">
        <div className="col-12 col-md-10 offset-md-1 bg-img-scroll   bg-traditions"
        style={{

          backgroundImage: 'url(//images.utk.edu/designsystem/meet/2021-smokey_photoop2.jpg)'

        }}
        >
          <div className="row align-items-end">
            <div className="col-12 col-lg-5 bg-white mt-lg-5 mb-lg-5 ml-lg-n5 p-2 p-md-5   bg-illustration"
            style={{
              backgroundImage: 'url(https://images.utk.edu/designsystem/meet/meet_bg_illustrations_pennant_1.svg)'
            }}
            >
              <h2>Living the Vol Life</h2>
              <p>We sing &ldquo;Rocky Top&rdquo; loudly and often, and everyone wants to pet our campus celebrity&mdash;a bluetick coonhound named Smokey. Outside the classroom, you&lsquo;ll have plenty of opportunities to make friends and memories through on-campus events and more than 400 student organizations.</p>
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid bg-img-fixed-medium bg-football"
      style={{

        backgroundImage: 'url(//images.utk.edu/designsystem/meet/mae_confirmation_1.jpg)'

      }}
      >
          <div className="row align-items-end align-items-md-center module">
            <div className="col-12 col-md-10 mx-auto ml-lg-4 col-lg-5 bg-white mb-lg-5 offset-lg-0 pt-5 p-2 p-md-5">
                <blockquote className="blockquote">
                  <p className="mb-0">As soon as you become a UT student, it doesn’t matter if you are from out of state or someone who grew up in Knoxville, you are a Volunteer.”</p>
                  <footer className="blockquote-footer"><cite title="Source Title">Emma // Deaf Education // San Diego, CA</cite></footer>
                </blockquote>
              </div>
        </div>
      </div>


      <div className="container-fluid bg-smokey text-center py-5 bg-img-cta   row no-gutters align-items-center"
      style={{

        backgroundImage: 'url(//images.utk.edu/designsystem/meet/repeatingpattern_gray_1.jpg)'

      }}
       >
        <div className="col-12 col-md-6 mx-auto">
          <svg version="1.1" className="icon-tn" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 103 25" xmlSpace="preserve">
      <path className="st0" d="M13.2,2.8l-11,20.7l69,0.2l6.5-7.5l5.6,0l17.4-15.9l-70,0.2L28.4,3L13.2,2.8z" />
      </svg>
          <h2 className="text-white mt-5 text-uppercase">That&lsquo;s a little about us. We can&lsquo;t wait to meet you!</h2>
          <p className="text-white mb-5">Tell us about you and get a free sticker!</p>
          <button type="button" className="btn btn-light btn-chevron mb-5 text-uppercase" data-toggle="modal" data-target="#exampleModal">Sign up for our mailing list</button>
        </div>
      </div>





      </div>
      </div>
      </div>
      </main>

    </Layout>
  );
}

export default Vision;
