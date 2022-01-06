import { getNextStaticProps } from '@faustjs/next';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header, Hero, Posts } from 'components';
import styles from 'scss/pages/home.module.scss';
import { client, PageIdType } from 'client';
//import { getArrayFields, castNotSkeleton } from 'gqty';
import TimelineEvent from '../components/TimelineEvent';


export default function Page() {
  const { useQuery, usePage, usePosts } = client;
  const generalSettings = useQuery().generalSettings;





  //const allPages = getArrayFields(useQuery().pages().nodes, 'isFrontPage', 'id', 'slug', 'pageId', 'uri');
  //const frontPage = allPages.findIndex(x => x.isFrontPage === true);
  //const frontPageID = allPages[frontPage].slug;

  //let frontPageParts = Object.entries(allPages[frontPage]);
	//let frontPageClean = Object.fromEntries(frontPageParts);

  const frontPageContent = usePage({
    id: "/",
    idType: PageIdType.URI,
  });

  const timelineEvents = useQuery().timelineEvents().nodes;

  const posts = usePosts({
    first: 6,
    where: {
      categoryName: 'uncategorized',
    },
  });
  //console.log(timelineEvents[0].slug);

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <div className="bg-summitt d-flex align-items-center" style={{height: "60vh"}}>

<h1 className="text-center">Hero Area Here</h1>
</div>


<div className="container">
<ul className="nav nav-fill internal-links py-4 row">
<li className="nav-item col-md-4">
<a className="btn btn-internal text-utlink" href="#academics">Areas of Study</a>
</li>
<li className="nav-item col-md-4">
<a className="btn btn-internal text-utlink" href="#experience">Campus Life</a>
</li>
<li className="nav-item col-md-4">
<a className="btn btn-internal text-utlink" href="#value">Financial Aid and Scholarships</a>
</li>
</ul>
</div>


<div className="container">




<main id="content">
<div className="strip strip-light strip-positioning bg-dark" style={{backgroundImage: 'url(http://images.utk.edu/designsystem/www2021/v1/i/dots_vertical_1.gif)' }}>

<div className="container-xxl">

<div className="row justify-content-center">
 <div className="col-3 col-md-2 col-lg-1">
<svg version="1.1" fill="#ff8200" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
viewBox="0 0 75.5 77.6" style={{ "enable-background": "new 0 0 75.5 77.6" }}>
<g id="Group_2862" transform="translate(27.376 0.421)">
<path id="Path_2062" d="M36.8,14.7c-2.4,0-4.8-0.5-7.1-1.4c2.7-2.1,3.4-5.8,3.8-8.9l0.4-3.5l-2.6,2.4c-3.2,3-4.2,3.4-6.2,3.4
c-1,0-2.2-0.1-3.8-0.3l-1.1-0.1C12.8,5.6,7,7.4,3.5,11.5c-1.6,1.9-2.7,4.2-3.2,6.7l2.4,1.4c0.3-2.3,1.2-4.5,2.7-6.4
c2.5-2.9,6.5-4.5,11.6-4.5c0.9,0,1.9,0.1,2.9,0.1l1.2,0.1c1.6,0.2,2.9,0.3,4,0.3c1.9,0.1,3.7-0.5,5.2-1.7c-0.7,2.5-1.9,3.9-3.7,4.5
l-2.3,0.8l2,1.4c3.1,2,6.8,3,10.5,2.9c1.1,0,2.2-0.1,3.3-0.3c-2.3,2.4-4.1,3-6.1,3c-2.7-0.2-5.3-0.8-7.7-1.8l-0.2-0.1H26
c-1.5-0.5-3.1-0.8-4.7-0.9c-1.2,0-2.4,0.3-3.4,0.8c-2.3,0.8-3.7,3.2-3.2,5.7c0.4,2.2,2.4,3.8,4.7,3.7c0.7,0,1.4-0.1,2.1-0.4
c1.6-0.5,3.3-0.8,5-0.9c2.2-0.1,4.3,0.7,5.9,2.1h-0.3c-2.3,0.1-4.5,0.6-6.6,1.6c-0.9,0.4-1.8,0.7-2.6,1l2.9,1.7
c0.3-0.1,0.5-0.2,0.8-0.3c1.7-0.8,3.6-1.3,5.6-1.4c1,0,1.9,0.2,2.8,0.5l3.1,1.2l-1.5-3c-1.9-3.8-5.8-6.1-10.1-5.9
c-2,0-3.9,0.4-5.8,1c-0.4,0.1-0.8,0.2-1.3,0.2c-1,0.1-2-0.6-2.1-1.7c-0.2-1.2,0.5-2.4,1.7-2.8c0.8-0.4,1.6-0.6,2.4-0.6
c1.4,0.1,2.8,0.4,4.2,0.9l0.2,0.1l0,0c2.7,1.1,5.5,1.7,8.3,1.8c4,0,6.9-1.9,10.5-7l2.2-3.2l-3.7,1.2C41,14.4,38.9,14.7,36.8,14.7"
/>
</g>
<path id="Path_2064" d="M43.1,43.9l1.7,1c1.9,1.1,4.2,0.4,5.3-1.4l3.9-6.9l-15.6-9l0,0l0,0l-15.6-8.9l-3.9,6.9
c-1.1,1.9-0.4,4.2,1.4,5.3l1.7,1c-0.3,0.9-0.4,1.8-0.4,2.8c0.1,2.6,1.2,5.1,2.9,7.1c-0.5,0.9-0.9,1.7-1.4,2.5h-2.5
c-7.3,0.1-12.5,2.1-15.7,5.8H0.5v2.6h5.1c0.4,0,0.8-0.2,1-0.5c1.2-1.5,2.6-2.6,4.4-3.4c2.2-1,4.5-1.6,6.9-1.7
c0.9-0.1,1.8-0.1,2.8-0.2h1.1c-0.4,0.7-0.7,1.3-1,1.8h-1v2.6h10.7c0.7,0,1.2,0.5,1.3,1.1v0.1c0,0.6-0.5,1.2-1.1,1.2
c-0.1,0-0.1,0-0.2,0h-5.6v2.6h4.6c0.7,0,1.2,0.5,1.3,1.1v0.1c0,0.6-0.5,1.2-1.1,1.2c-0.1,0-0.1,0-0.2,0h-5.4v2.6h4.2
c0.7,0,1.2,0.5,1.3,1.1v0.1c0,0.6-0.5,1.2-1.1,1.2c-0.1,0-0.1,0-0.2,0h-5v2.7h3.3c0.6,0,1,0.4,1.1,0.9c0,0.1,0,0.1,0,0.2
c0,0.5-0.4,1-1,1h-0.1h-3h-7h-0.9c-2.1,0.1-4.2-0.3-6.1-1c-1.1-0.3-2.1-1-2.8-1.9c-0.2-0.4-0.7-0.7-1.1-0.7H0.5v2.6h4.4
c1.4,1.5,3.2,2.5,5.2,2.9c-1.6,3.9-1.6,5.2-0.1,6.2c0.5,0.4,1.2,0.6,1.9,0.5c1.2-0.2,2.5-1.3,5.9-6.1h5h2.8h0.9
c2,0.1,3.6-1.5,3.7-3.4v-0.1c0-0.5-0.1-1-0.3-1.5c1.3-0.6,2.2-1.9,2.2-3.4c0-0.7-0.1-1.3-0.5-1.9c1.1-0.7,1.7-1.9,1.7-3.1
c0-0.7-0.2-1.4-0.5-2c1-0.7,1.5-1.8,1.5-3c0.1-1.6-0.9-3.1-2.4-3.6c0.4-0.7,0.9-1.4,1.3-2.2c0.8,0.1,1.6,0.2,2.4,0.2
c1.8,0,3.7-0.4,5.3-1.3C41.7,45.2,42.5,44.6,43.1,43.9 M29.8,42.7c-4-2.3-6.1-6.3-5.5-9.6l16.5,9.5c-1.4,1.2-3.3,1.8-5.2,1.8
C33.6,44.3,31.5,43.8,29.8,42.7 M21.1,26.8l2.7-4.6l26.7,15.3l-2.7,4.6c-0.4,0.6-1.1,0.8-1.8,0.5l-24.5-14
C21,28.2,20.7,27.5,21.1,26.8 M11.6,74.5C11.5,74.5,11.5,74.5,11.6,74.5c0.2-1.3,0.6-2.5,1.1-3.6c0.6,0.1,1.2,0.1,1.9,0.1
C12.7,73.7,11.9,74.4,11.6,74.5 M29.1,48.6h-5.4c0.8-1.5,1.7-3.2,2.7-5.1c0.6,0.5,1.3,1,2.1,1.4c0.7,0.4,1.5,0.8,2.2,1
C30.2,46.9,29.6,47.8,29.1,48.6"/>
</svg>

</div>

</div>


<div className="row my-5 justify-content-md-center">
  <div className="col-12 col-md-10 col-xl-12">
    <p className="lead-in text-center h3 text-white"><span className="text-condensed text-letterspaced text-uppercase fst-italic">We are the Tennessee Volunteers.</span><br/><span className="fs-4">We light the way for others.</span></p>
  </div>
</div>
</div>
</div>


<div className="strip bg-white py-0 pb-sm-4 pb-md-0" id="academics">

<div className="container">
<div className="row  mb-5 py-3 py-md-5">
<div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
  <div className="framed gingham">
    <img data-src="https://www.utk.edu/images/i/warmers/www-faculty_lg.jpg"  alt="Printmaking class." className="lazyload" width="1000" height="667"/>
  </div>
</div>

<div className="col-12 col-lg-6 offset-xxl-1 col-xxl-5">
<h2 className="text-uppercase display-3 mt-md-3 mt-lg-0"><span className="text-condensed text-letterspaced fst-italic fs-2">Create</span><br/>Your Own Path</h2>
<p>Study what you love while working alongside expert faculty in a supportive atmosphere emphasizing hands-on research and service&ndash;learning.</p>


<div className="list-group list-group-flush">

<a href="https://admissions.utk.edu/study/programs-and-majors" className="px-0 list-group-item list-group-item-action d-flex justify-content-between align-items-start home-info-links"><span>Explore 360+ majors and programs of study </span><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff8200" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></span></a>

<a href="https://gradschool.utk.edu/graduate-majors-degrees-and-certificates-programs/" className="px-0 list-group-item list-group-item-action d-flex justify-content-between align-items-start home-info-links"><span aria-hidden="true">Discover graduate degrees and programs </span><span><svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="#ff8200" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></span></a>

<a href="https://admissions.utk.edu/study/undergraduate-research/" className="px-0 list-group-item list-group-item-action d-flex justify-content-between align-items-start home-info-links"><span>Dig deeper with research opportunities </span><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="#ff8200" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></span></a>

<a href="https://honors.utk.edu/" className="px-0 list-group-item list-group-item-action d-flex justify-content-between align-items-start home-info-links"><span>Challenge yourself with honors programs </span><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="#ff8200" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></span></a>
</div>

</div>

</div>


</div>
</div>

<div className="strip strip-support position-relative">
<video autoPlay muted loop id="textvideo">
    <source src="https://images.utk.edu/designsystem/www2021/i/TextureClip4.mp4" type="video/mp4" />
</video>

  <div className="container-xxl">
      <div className="row justify-content-start">
        <div className="col col-lg-5">
          <div className="card card-value">
          <p className="lead text-white">As kinesiology major Chelsea and math major Diana prepared for their December graduation, <strong>they took a moment to reflect</strong> on their time at UT. </p>
          </div>
        </div>
      </div>
      <div className="card card-body col-12 col-md-8 col-lg-5 offset-lg-7 col-xl-4 offset-xl-8 align-self-end border-0 card-cta card-academic p-4 d-block">
         <h3 className="text-uppercase h5">Want to hear their advice for new Vols?</h3>
         <a href="https://www.youtube.com/watch?v=BblsCv0uaAo" className="btn btn-chevron text-uppercase home-cta" id="cta-requestinfo">Watch now</a>
      </div>
    </div>
  </div>

<div className="strip strip-dots p-5">
</div>

<div className="strip position-relative lazyload bg-transparent" id="experience" style={{ backgroundImage: "url('https://www.utk.edu/images/i/warmers/campus_aerial_sky_bg.jpg')" }}>
<div className="container-xxl py-xl-5">
<div className="row justify-content-center strip-row" >
  <div className="col-12 col-md-8 col-xl-4">
      <h2 className="display-1 text-uppercase text-center text-xl-start"><span className="text-condensed text-letterspaced fs-1 fst-italic">This is</span><br/> Rocky Top</h2>
  </div>
  <div className="col-12 col-sm-10  col-md-8  col-xl-6 align-self-start align-self-md-center  item">
    <div className="ratio ratio-16x9 yt-container framed right"  data-yt-url="https://www.youtube.com/embed/QAS8yNqJj9M?modestbranding=1&showinfo=0&showsearch=0&rel=0&autoplay=1"><button className="btn border-0 yt-play"><img data-src="https://www.utk.edu/images/i/warmers/utk_youtube_thumb_6.jpg" className="lazyload" alt="Play welcoming video." width="1000" height="563"/></button>
    </div>
  </div>
</div>
</div>
</div>


<div className="strip strip-dots strip-gallery pb-0">
<div className="container-xxl">
<div className="row g-0 fit-gallery">
  <div className="col-12 col-lg-6 align-self-start mt-lg-n5">
    <div className="card position-relative border-0  bg-smokey text-white" >
      <div className="card-body p-3 p-md-4 p-lg-5">
        <h3 className="text-uppercase">Home Sweet Home</h3>
        <p>The moment you set foot on Rocky Top, you’ll find a campus filled with energy, tradition, and a whole lot of orange.</p>
        <a href="https://admissions.utk.edu/visit/" className="stretched-link text-uppercase text-white home-info-links">Explore Our Campus <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff8200" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></a>

      </div>
    </div>

    <div className="card position-relative border-0 ratio"  style={{ "--bs-aspect-ratio": "50%" }}>

        <img data-src="https://www.utk.edu/images/i/warmers/mountains_mosaic_142517_dreamstimemaximum_28574749edit_lg.jpg" className="card-img lazyload" alt="Beautiful Smokey Mountains." width="940" height="470"/>

    </div>

    <div className="row g-0">
      <div className="col-12 col-sm-6 align-self-end">
        <div className="card hover position-relative border-0 ratio ratio-1x1">
          <img data-src="https://www.utk.edu/images/i/warmers/16_Leadership_Engagement.jpg" className="card-img lazyload" alt="Students working on service." height="1000" width="1000"/>
          <div className="card-body">
          <h3 className="text-uppercase fs-6 text-white mb-4 d-flex justify-content-between align-items-start fw-normal">Serving Others <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg></h3>
          <p className="text-white">Volunteers give back by working together and lighting the way for others.</p>
          <p><a className="text-white stretched-link home-info-links" href="https://www.utk.edu/outreach/">Learn how Vols help</a></p>
          </div>


        </div>
      </div>

      <div className="col-12 col-sm-6">
        <div className="card hover card-body bg-secondary position-relative text-white border-0 ratio ratio-1x1">
          <img data-src="https://www.utk.edu/images/i/warmers/gal-smokey.jpg" className="card-img lazyload" alt="Smokey, the blue-tick hound." height="1000" width="1000"/>
          <div className="card-body">
          <h3 className="text-uppercase h6 text-white mb-4 d-flex justify-content-between align-items-start fw-normal">Loving Orange <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg></h3>
          <p className="text-white"><strong>225+</strong> years of traditions and one very good boy.</p>
          <p><a className="text-white stretched-link home-info-links" href="https://torchbearer.utk.edu/2019/09/tennessee-traditions/">Learn about traditions</a></p>
          </div>

        </div>
      </div>
    </div>

</div>
<div className="col-12 col-lg-6 mt-lg-n2">

  <div className="card position-relative border-0 ratio"  style={{ "--bs-aspect-ratio": "50%" }}>
    <img data-src="https://www.utk.edu/images/i/warmers/gal-sunsphere.jpg" className="card-img lazyload" alt="Downtown Knoxville." width="1000" height="500"/>
  </div>

  <div className="row g-0">

    <div className="col-12 col-sm-6">
      <div className="card card-body hover bg-secondary position-relative text-white border-0 ratio ratio-1x1">
        <img data-src="https://www.utk.edu/images/i/warmers/on-campus.jpg" className="card-img lazyload" alt="Students walking on campus."  height="1000" width="1000"/>
        <div className="card-body">
        <h3 className="text-uppercase h6 text-white mb-4 d-flex justify-content-between align-items-start fw-normal">Living Here <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg></h3>
        <p className="text-white"><strong>14</strong> residence halls, <strong>16</strong> living and learning communities, and <strong>40+</strong> eateries.</p>
        <p><a className="text-white stretched-link home-info-links" href="https://housing.utk.edu">Discover the spaces you&rsquo;ll call home</a></p>
        </div>

      </div>
    </div>

    <div className="col-12 col-sm-6">
      <div className="card hover position-relative border-0 ratio ratio-1x1">
        <img data-src="https://www.utk.edu/images/i/warmers/student-orgs.jpg" className="card-img lazyload" alt="Students kayaking." height="1000" width="1000"/>
        <div className="card-body">
        <h3 className="text-uppercase h6 text-white mb-4 d-flex justify-content-between align-items-start fw-normal">Getting involved  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg></h3>
        <p className="text-white"><strong>400+</strong> student organizations will help you build connections.</p>
        <p><a className="text-white stretched-link home-info-links" href="https://studentlife.utk.edu/2021/08/03/find-your-community/">Check out student organizations</a></p>
        </div>
      </div>
    </div>


  </div>

  <div className="card position-relative border-0">
    <div className="card-body p-3 p-md-4 p-lg-5">
      <h3 className="text-uppercase">Beyond Campus</h3>
        <p>Knoxville is a friendly city with plenty to do—close to rivers, outdoor adventure, and the Great Smoky Mountains National Park.</p>
        <a href="https://www.utk.edu/aboutut/knoxville" className="stretched-link text-uppercase home-info-links">Explore Knoxville <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff8200" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></a>
    </div>
  </div>

</div>

</div>



 <div className="card card-secondary card-body col-12 col-md-8 col-lg-5 col-xl-4  col-xxl-3  my-md-4 mb-n5 mb-sm-0 mb-md-n5 border-0 card-cta p-4 d-block">
   <h3 className="h5 text-uppercase">Come see us!</h3>
    <a href="https://admissions.utk.edu/visit/" className="btn btn-chevron text-uppercase home-cta" id="cta-schedulevisit">Schedule a Visit</a>
</div>

</div>
</div>

<div className="strip strip-value lazyload"  data-bg="https://www.utk.edu/images/i/warmers/strip-nurse.jpg">
<div className="container-xxl">
<div className="row justify-content-end">
  <div className="col col-lg-5">
    <div className="card card-value">
    <p className="lead text-white">Become a part of the Volunteer family with a <strong>global network of 260,000+ alumni</strong> ready to make connections and open doors for students and new graduates.</p>
    </div>
  </div>
</div>
</div>
</div>
<div className="strip bg-light pb-md-0" id="value" >
<div className="container">

<div className="row">

  <div className="col-12 col-lg-6 col-xl-6 col-xxl-5">

          <h2 className="text-uppercase display-3"><span className="text-condensed text-letterspaced fst-italic fs-2">Invest in</span><br/>Your Future</h2>
          <p className="lead">Guided by our mission of making sure education is within reach, we are committed to investing in  your future too.</p>

          <p className="clearfix d-flex"><span className="fw-bolder float-start text-stroke text-data col-auto" style={{ minWidth: "165px" }}>92%</span> <span className="align-self-center d-flex ms-2 align-middle"> first-year students receive financial aid and scholarships</span></p>
    <p className="clearfix d-flex"><span className="fw-bolder float-start text-stroke text-data col-auto" style={{ minWidth: "165px" }}>$73M</span> <span className="align-self-center d-flex ms-2 align-middle"> in institutional scholarships awarded annually</span></p>



<div className="list-group list-group-flush mt-5 mb-5">

<a href="https://utk.studentaidcalculator.com/" className="px-0 py-2 text-decoration-none list-group-item list-group-item-action d-flex justify-content-between align-items-start home-info-links"><span>Get a Personalized Cost Estimate </span><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="#ff8200" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></span></a>

<a href="https://onestop.utk.edu/scholarships/" className="px-0 py-2 text-decoration-none list-group-item list-group-item-action d-flex justify-content-between align-items-start home-info-links"><span>Explore  Financial Aid and Scholarships </span><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" fill="#ff8200" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></span></a>
</div>

  </div>
  <div className="col-12 col-lg-5 offset-lg-1  offset-xxl-2">
    <div className="framed right gingham mb-5">
      <div className="card border-0 bg-white">
          <img data-src="https://www.utk.edu/images/i/warmers/www-kojak.jpg" alt="Kojak Wells." className="img-fluid lazyload" width="594" height="387"/>
          <div className="card-body">
            <h3 className="h4 text-uppercase">Dreams + Opportunity = Success</h3>
            <p>KoJak Wells, the first in his family to graduate from college, went from the stock room to a Fortune 500 company.</p>
            <p><a href="https://www.utk.edu/volunteer_stories/connecting-dreams-opportunity" className="stretched-link itav-link home-info-links">Read KoJak’s story <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff8200" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></a></p>
          </div>
      </div>
    </div>
  </div>
</div>




<div className="card card-secondary card-body col-12 col-md-8 col-lg-5 col-xl-4 my-4 mb-md-n5 border-0 card-cta p-4 d-block">
   <h3 className="text-uppercase h5">Become a Volunteer</h3>
     <a href="https://admissions.utk.edu/apply/" className="btn btn-chevron text-uppercase home-cta" id="cta-apply">Start your application</a>
</div>
</div>


</div>

<div className="strip strip-dots p-5">
</div>






</main>
</div>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
