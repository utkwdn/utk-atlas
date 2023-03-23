// import React from 'react';
import { useState, useRef, useLayoutEffect, useEffect, UIEvent } from 'react';
import styles from 'scss/components/Carousel.module.scss';
import Modal from 'react-bootstrap/Modal';

interface Props {
  cardWidth: number;
  cardMargin: number;
}

interface VideoObject {
  id: string;
  title: string;
}

const youtubeArray = [
  { id: '3nQnoEQH2x4', title: 'Neyland Stadium' },
  { id: 'MbWWxJXK0BI', title: 'John C. Hodges Library' },
  { id: '7BVQuavvCtw', title: 'The Torchbearer' },
  { id: 'rh1RiDUFj3Y', title: 'The Student Union' },
  { id: '6Ah3-8WtVZ4', title: 'Dorm Tour' },
  { id: 'P1pnAs9pEhA', title: 'Haslam College of Business' },
  { id: '8-iAwCr1tK8', title: 'Recreation Center' },
  { id: 'Q5Y88EhmKzM', title: 'The Rock' },
  { id: '_z3Dc9O6Hg4', title: 'Campus Dining' },
  { id: 'MXG2iQ5MUr4', title: 'Student Health Center' },
  { id: 'HWIedcPkxx4', title: 'Ayres Hall' },
  { id: '8NuPxThtAHk', title: 'Rocky Top Dining Hall' },
];

function YoutubeCarousel({ cardWidth, cardMargin }: Props): JSX.Element {
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselInnerContainerRef = useRef<HTMLDivElement>(null);
  const carouselOuterContainerRef = useRef<HTMLDivElement>(null);

  const [youtubeCarouselContainerWidth, setYoutubeCarouselContainerWidth] =
    useState(0);
  const [
    youtubeCarouselOuterContainerWidth,
    setYoutubeCarouselOuterContainerWidth,
  ] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [modalVideoId, setModalVideoId] = useState('3nQnoEQH2x4');
  const [modalVideoTitle, setModalVideoTitle] = useState('Neyland Stadium');
  const [currentCarouselCard, setCurrentCarouselCard] = useState(1);

  const handleShowVideo = (video: VideoObject) => {
    setModalVideoId(video.id);
    setModalVideoTitle(video.title);
    setShowVideo(true);
  };

  useLayoutEffect(() => {
    if (carouselContainerRef.current) {
      setYoutubeCarouselContainerWidth(
        carouselContainerRef.current.offsetWidth
      );
    }
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      if (carouselContainerRef.current) {
        setYoutubeCarouselContainerWidth(
          carouselContainerRef.current.offsetWidth
        );
      }
      // Save outer container width to calculate white space at end of carousel
      if (carouselOuterContainerRef.current) {
        setYoutubeCarouselOuterContainerWidth(
          carouselOuterContainerRef.current.offsetWidth
        );
      }
    }

    // Save outer container width to calculate white space at end of carousel
    if (carouselOuterContainerRef.current) {
      setYoutubeCarouselOuterContainerWidth(
        carouselOuterContainerRef.current.offsetWidth
      );
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Set max card size to props.cardWidth or width of container -60px to insure part of second video always shows
  const youtubeCardWidth = Math.min(
    cardWidth,
    youtubeCarouselContainerWidth - 60
  );
  const youtubeCardHeight = youtubeCardWidth / 1.77;
  // margin set in props.cardMargin
  const youtubeCardMargin = cardMargin;

  const youtubeCarouselWidth =
    youtubeArray.length * youtubeCardWidth +
    (youtubeArray.length - 1) * youtubeCardMargin;

  const handleScroll = (e: UIEvent) => {
    const scrollLeftAmount = e.currentTarget.scrollLeft;
    // Determine card number visible based on left scroll position
    const currentCard = Math.round(
      scrollLeftAmount / (youtubeCardWidth + youtubeCardMargin) + 1
    );
    setCurrentCarouselCard(currentCard);
  };

  const scrollLeft = () => {
    if (carouselOuterContainerRef.current) {
      const scrollToPosition =
        (youtubeCardWidth + youtubeCardMargin) * (currentCarouselCard - 2);
      carouselOuterContainerRef.current?.scroll({
        left: scrollToPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (
      carouselOuterContainerRef.current &&
      // Don't scroll right if on last card
      currentCarouselCard <= youtubeArray.length - 1
    ) {
      const scrollToPosition =
        (youtubeCardWidth + youtubeCardMargin) * currentCarouselCard;
      carouselOuterContainerRef.current?.scroll({
        left: scrollToPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className={styles['carouselContainer']} ref={carouselContainerRef}>
        <div className={styles['carouselTopButtons']}>
          <div
            // Grey out back button if on card 1
            className={`${styles['carouselTopButton']} ${
              currentCarouselCard === 1 ? styles['diabledCarouselButton'] : ''
            }`}
            onClick={scrollLeft}
          >
            {/* {' '}
            &lt;{' '} */}
          </div>
          <div
            // Grey out next button if on last card
            className={`${
              styles['carouselTopButton'] + ' ' + styles['reflect']
            } ${
              currentCarouselCard === youtubeArray.length
                ? styles['diabledCarouselButton']
                : ''
            }`}
            onClick={scrollRight}
          >
            {/* {' '}
            &gt;{' '} */}
          </div>
        </div>
        <div
          className={styles['carouselOuterCardContainer']}
          style={{
            width: '100%',
          }}
          ref={carouselOuterContainerRef}
          onScroll={(e) => {
            handleScroll(e);
          }}
        >
          <div
            className={styles['carouselInnerCardContainer']}
            ref={carouselInnerContainerRef}
            style={{
              width:
                youtubeCarouselWidth +
                (youtubeCarouselOuterContainerWidth - youtubeCardWidth),
              // Adds white space to right of last carousel card.
              paddingRight:
                youtubeCarouselOuterContainerWidth - youtubeCardWidth,
            }}
          >
            {youtubeArray?.map((this_video, i) => {
              return (
                <div
                  key={i}
                  className={styles['videoCard']}
                  style={{
                    backgroundImage: `url("https://img.youtube.com/vi/${this_video.id}/maxresdefault.jpg")`,
                    marginRight: youtubeCardMargin,
                    width: youtubeCardWidth,
                    height: youtubeCardHeight,
                  }}
                  onClick={() => handleShowVideo(this_video)}
                >
                  <div className={styles['youtubeButtonContainer']}>
                    <div className={styles['youtubeButton']}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        show={showVideo}
        fullscreen={true}
        onHide={() => setShowVideo(false)}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>{modalVideoTitle}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className={styles['modalVideoContainer']}>
            <iframe
              width="1920"
              height="1080"
              src={`https://www.youtube.com/embed/${modalVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default YoutubeCarousel;
