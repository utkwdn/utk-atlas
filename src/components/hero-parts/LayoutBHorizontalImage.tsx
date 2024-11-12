import React from 'react';
import Image from 'next/image';
import defaultImageJpg from '/public/images/home-hero/LayoutB-Horizontal-Mobile-Default.jpg';
import meetImageJpg from '/public/images/home-hero/LayoutB-Horizontal-Mobile-Meet.jpg';

interface Props {
  dynamicSrc: string;
}

function LayoutBImageOne({ dynamicSrc }: Props): JSX.Element {
  return (
    <div className="riverAerialHolder layoutB test">
      <div className="riverAerial">
        {/* Begin Dynamic Meet Content */}
        {dynamicSrc === 'meet' ? (
          // 'meet' content
          <picture>
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/LayoutB-Horizontal-Mobile-Meet.webp"
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/LayoutB-Horizontal-Mobile-Meet.jpg"
              type="image/jpeg"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/LayoutB-Horizontal-Desktop-Meet.webp"
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/LayoutB-Horizontal-Desktop-Meet.jpg"
              type="image/jpeg"
            />
            <Image
              src={meetImageJpg}
              alt="Knoxville skyline as seen from the University of Tennessee campus"
            />
          </picture>
        ) : (
          // default content
          <picture>
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/LayoutB-Horizontal-Mobile-Default.webp"
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/LayoutB-Horizontal-Mobile-Default.jpg"
              type="image/jpeg"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/LayoutB-Horizontal-Desktop-Default.webp"
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/LayoutB-Horizontal-Desktop-Default.jpg"
              type="image/jpeg"
            />
            <Image
              src={defaultImageJpg}
              alt="sunset over the Tennessee River that surrounds campus"
            />
          </picture>
        )}
        {/* End Dynamic Meet Content */}
      </div>
      <div className="angleBracketUp"></div>
    </div>
  );
}

export default LayoutBImageOne;
