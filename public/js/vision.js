// Remove the transition class
const torchSlide = document.querySelector(".Vision_torchCamoAA");
torchSlide.classList.remove("Vision_torchCamoAnimate");

// Create the observer, same as before:
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      torchSlide.classList.add("Vision_torchCamoAnimate");
      return;
    }

    torchSlide.classList.remove("Vision_torchCamoAnimate");
  });
});

observer.observe(document.querySelector(".Vision_camoAAContainer"));

// End TorchCamoAA
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin TorchCamoBB
// Remove the transition class
const torchSlideBB = document.querySelector(".torchCamoBB");
torchSlideBB.classList.remove("torchCamoAnimate");

// Create the observer, same as before:
const observerBB = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      torchSlideBB.classList.add("torchCamoAnimate");
      return;
    }

    torchSlideBB.classList.remove("torchCamoAnimate");
  });
});

observerBB.observe(document.querySelector(".camoBBContainer"));

// End TorchCamoBB
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin TorchCamoCC
// Remove the transition class
const torchSlideCC = document.querySelector(".torchCamoCC");
torchSlideCC.classList.remove("torchCamoAnimate");

// Create the observer, same as before:
const observerCC = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      torchSlideCC.classList.add("torchCamoAnimate");
      return;
    }

    torchSlideCC.classList.remove("torchCamoAnimate");
  });
});

observerCC.observe(document.querySelector(".camoCCContainer"));

// End TorchCamoCC
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin stepSlide
// Remove the transition class
const stepSlide = document.querySelector(".textSteps");
stepSlide.classList.remove("stepsAnimate");

// Create the observer, same as before:
const observer04 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      stepSlide.classList.add("stepsAnimate");
      return;
    }

    stepSlide.classList.remove("stepsAnimate");
  });
});

observer04.observe(document.querySelector(".stepsSlide"));

// End stepsSlide
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin stepSlideBB
// Remove the transition class

// End stepsSlide
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideLAA Left
// Remove the transition class
const objTitleSlideAA = document.querySelector(".objTitleLAA");
objTitleSlideAA.classList.remove("objTitleAnimate");

// Create the observer, same as before:
const observerTitleAA = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlideAA.classList.add("objTitleAnimate");
      return;
    }

    objTitleSlideAA.classList.remove("objTitleAnimate");
  });
});

observerTitleAA.observe(document.querySelector(".objTitleLAA"));

// End ObjTitleSlideAA
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideLBB Left
// Remove the transition class
const objTitleSlideBB = document.querySelector(".objTitleLBB");
objTitleSlideBB.classList.remove("objTitleAnimate");

// Create the observer, same as before:
const observerTitleBB = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlideBB.classList.add("objTitleAnimate");
      return;
    }

    objTitleSlideBB.classList.remove("objTitleAnimate");
  });
});

observerTitleBB.observe(document.querySelector(".objTitleLBB"));

// End ObjTitleSlideBB
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideLCC Left
// Remove the transition class
const objTitleSlideCC = document.querySelector(".objTitleLCC");
objTitleSlideBB.classList.remove("objTitleAnimate");

// Create the observer, same as before:
const observerTitleCC = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlideCC.classList.add("objTitleAnimate");
      return;
    }

    objTitleSlideCC.classList.remove("objTitleAnimate");
  });
});

observerTitleCC.observe(document.querySelector(".objTitleLCC"));

// End ObjTitleSlideCC
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideRAA Right
// Remove the transition class
const objTitleSlideRAA = document.querySelector(".objTitleRAA");
objTitleSlideBB.classList.remove("objTitleAnimateRight");

// Create the observer, same as before:
const observerTitleRAA = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlideRAA.classList.add("objTitleAnimateRight");
      return;
    }

    objTitleSlideRAA.classList.remove("objTitleAnimateRight");
  });
});

observerTitleRAA.observe(document.querySelector(".objTitleRAA"));

// End ObjTitleSlideRAA
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideRBB Right
// Remove the transition class
const objTitleSlideRBB = document.querySelector(".objTitleRBB");
objTitleSlideRBB.classList.remove("objTitleAnimateRight");

// Create the observer, same as before:
const observerTitleRBB = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlideRBB.classList.add("objTitleAnimateRight");
      return;
    }

    objTitleSlideRBB.classList.remove("objTitleAnimateRight");
  });
});

observerTitleRBB.observe(document.querySelector(".objTitleRBB"));

// End ObjTitleSlideRAA
// ---------------------------------------------------------
// ---------------------------------------------------------
