// Remove the transition class
const torchSlide = document.querySelector(".torchCamo01");
torchSlide.classList.remove("torchCamoAnimate");

// Create the observer, same as before:
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      torchSlide.classList.add("torchCamoAnimate");
      return;
    }

    torchSlide.classList.remove("torchCamoAnimate");
  });
});

observer.observe(document.querySelector(".camo01Container"));

// End TorchCamo01
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin TorchCamo02
// Remove the transition class
const torchSlide02 = document.querySelector(".torchCamo02");
torchSlide02.classList.remove("torchCamoAnimate");

// Create the observer, same as before:
const observer02 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      torchSlide02.classList.add("torchCamoAnimate");
      return;
    }

    torchSlide02.classList.remove("torchCamoAnimate");
  });
});

observer02.observe(document.querySelector(".camo02Container"));

// End TorchCamo02
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin TorchCamo03
// Remove the transition class
const torchSlide03 = document.querySelector(".torchCamo03");
torchSlide03.classList.remove("torchCamoAnimate");

// Create the observer, same as before:
const observer03 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      torchSlide03.classList.add("torchCamoAnimate");
      return;
    }

    torchSlide03.classList.remove("torchCamoAnimate");
  });
});

observer03.observe(document.querySelector(".camo03Container"));

// End TorchCamo03
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
// Begin stepSlide02
// Remove the transition class

// End stepsSlide
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideL01 Left
// Remove the transition class
const objTitleSlide01 = document.querySelector(".objTitleL01");
objTitleSlide01.classList.remove("objTitleAnimate");

// Create the observer, same as before:
const observerTitle01 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlide01.classList.add("objTitleAnimate");
      return;
    }

    objTitleSlide01.classList.remove("objTitleAnimate");
  });
});

observerTitle01.observe(document.querySelector(".objTitleL01"));

// End ObjTitleSlide01
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideL02 Left
// Remove the transition class
const objTitleSlide02 = document.querySelector(".objTitleL02");
objTitleSlide02.classList.remove("objTitleAnimate");

// Create the observer, same as before:
const observerTitle02 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlide02.classList.add("objTitleAnimate");
      return;
    }

    objTitleSlide02.classList.remove("objTitleAnimate");
  });
});

observerTitle02.observe(document.querySelector(".objTitleL02"));

// End ObjTitleSlide02
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideL03 Left
// Remove the transition class
const objTitleSlide03 = document.querySelector(".objTitleL03");
objTitleSlide02.classList.remove("objTitleAnimate");

// Create the observer, same as before:
const observerTitle03 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlide03.classList.add("objTitleAnimate");
      return;
    }

    objTitleSlide03.classList.remove("objTitleAnimate");
  });
});

observerTitle03.observe(document.querySelector(".objTitleL03"));

// End ObjTitleSlide03
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideR01 Right
// Remove the transition class
const objTitleSlideR01 = document.querySelector(".objTitleR01");
objTitleSlide02.classList.remove("objTitleAnimateRight");

// Create the observer, same as before:
const observerTitleR01 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlideR01.classList.add("objTitleAnimateRight");
      return;
    }

    objTitleSlideR01.classList.remove("objTitleAnimateRight");
  });
});

observerTitleR01.observe(document.querySelector(".objTitleR01"));

// End ObjTitleSlideR01
// ---------------------------------------------------------
// ---------------------------------------------------------
// Begin ObjTitleSlideR02 Right
// Remove the transition class
const objTitleSlideR02 = document.querySelector(".objTitleR02");
objTitleSlideR02.classList.remove("objTitleAnimateRight");

// Create the observer, same as before:
const observerTitleR02 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      objTitleSlideR02.classList.add("objTitleAnimateRight");
      return;
    }

    objTitleSlideR02.classList.remove("objTitleAnimateRight");
  });
});

observerTitleR02.observe(document.querySelector(".objTitleR02"));

// End ObjTitleSlideR01
// ---------------------------------------------------------
// ---------------------------------------------------------
