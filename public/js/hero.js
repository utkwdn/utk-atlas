var _____WB$wombat$assign$function_____ = function (name) {
  return (
    (self._wb_wombat &&
      self._wb_wombat.local_init &&
      self._wb_wombat.local_init(name)) ||
    self[name]
  );
};
if (!self.__WB_pmw) {
  self.__WB_pmw = function (obj) {
    this.__WB_source = obj;
    return this;
  };
}
{
  let window = _____WB$wombat$assign$function_____('window');
  let self = _____WB$wombat$assign$function_____('self');
  let document = _____WB$wombat$assign$function_____('document');
  let location = _____WB$wombat$assign$function_____('location');
  let top = _____WB$wombat$assign$function_____('top');
  let parent = _____WB$wombat$assign$function_____('parent');
  let frames = _____WB$wombat$assign$function_____('frames');
  let opener = _____WB$wombat$assign$function_____('opener');

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.saveStyles('.hero202112Container, .layoutB'); // stores the css information before in-line styles from animation are put in place

  ScrollTrigger.matchMedia({
    // desktop
    '(min-width: 768px)': function () {
      /*
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
Pinning Section – .pointer-events: none; // must be added to the container in css, otherwise it won't scroll!!
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/

      gsap.to('.hero202112Container', {
        scrollTrigger: {
          trigger: '.hero202112A',
          start: 'top top',
          // markers: true,
          scrub: true,
          end: () => `+=${document.querySelector('.hero202112A').offsetHeight}`,
          // pinSpacing: false,
          pin: true,

          // end: "+=600%"
        },
      });

      /*
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
Timeline for hero image animations
––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero202112A',
          start: 'top top',
          // markers: true,
          scrub: true,
          toggleActions: 'start pause reverse pause',
        },
        //   pinnedContainer:  ".hero202112Container"
      });

      // –––––––––––––––––––––––––––––––––––––––––––––––
      /* Animation for getting LayoutA off the screen –– All at once */
      // –––––––––––––––––––––––––––––––––––––––––––––––
      /*
tl.to(".heroHolderA, .orangeBarHolderA, .heroRectangleA, .heroRainHolderTripleA, .heroRainHolderA", {
    // y: "random(-300, -500)",
    y: -500,
    duration: 2,
    opacity: 0,
    stagger:.5
    // delay:2
});
*/
      tl.addLabel('layoutA', 0);
      tl.addLabel('layoutB', 0.2);

      // tl.from(".layoutB", {
      //     opacity: 0,
      //     duration:.2
      // }, "layoutA");
      tl.to(
        '.heroHolderA',
        {
          // y: "random(-300, -500)",
          y: -500,
          duration: 2,
          opacity: 0,
        },
        'layoutA'
      );

      tl.from(
        '.heroHolderB',
        {
          // y: "random(500, 800)",
          // y: 740,
          // y: 940,
          // yPercent: "230%",
          y: '240%',
          duration: 2,
          // opacity: 0,
        },
        'layoutB'
      );

      tl.to(
        '.heroRainHolderA',
        {
          // y: "random(-300, -500)",
          y: -400,
          duration: 2,
          opacity: 0,
        },
        'layoutA+=.5'
      );

      tl.to(
        '.heroRainHolderTripleA',
        {
          // y: "random(-300, -500)",
          y: -500,
          duration: 2,
          opacity: 0,
        },
        'layoutA+=.75'
      );

      tl.to(
        '.orangeBarHolderA',
        {
          // y: "random(-300, -500)",
          y: -400,
          duration: 2,
          opacity: 0,
        },
        'layoutA+=1'
      );

      tl.to(
        '.heroRectangleA',
        {
          // y: "random(-300, -500)",
          y: -500,
          duration: 2,
          opacity: 0,
        },
        'layoutA+=.75'
      );

      /* Animation for getting LayoutB onto the screen —— All at once */

      /*
tl.from(".heroHolderB, .heroRainHolderB, .riverAerialHolder, .heroHolderB, .RainHolderB, .heroRectangleHolderB, .orangeBarHolderB", {
    // y: "random(500, 800)",
    y: 400,
    duration: 2.2,
    opacity: 0,
    stagger:0.25,
    delay:2
}, "-=6");
*/

      tl.from(
        '.heroRainHolderB',
        {
          // y: "random(500, 800)",
          // y: 500,
          // y: "1300%",
          y: '1150%',
          duration: 2.2,
          // opacity: 0,
          delay: 1,
        },
        'layoutB+=.25'
      );

      tl.from(
        '.riverAerialHolder',
        {
          // y: "random(500, 800)",
          // y: 450,
          // y: 100,
          // yPercent: 65,
          y: '65%',
          duration: 2.2,
          // opacity: 0
        },
        'layoutB+=1.25'
      );

      tl.from(
        '.heroRectangleHolderB',
        {
          // y: "random(500, 800)",
          // y: 700,
          y: '165%',
          duration: 2.5,
          // opacity: 0
        },
        'layoutB+=.75'
      );
      tl.from(
        '.orangeBarHolderB',
        {
          // y: "random(500, 800)",
          // y: 800,
          // y: 700,
          y: '1400%',
          // y: "850%",
          duration: 2.2,
          // opacity: 0
        },
        'layoutB+=.5'
      );
    },
    '(max-width: 799px)': function () {},
  });
}
