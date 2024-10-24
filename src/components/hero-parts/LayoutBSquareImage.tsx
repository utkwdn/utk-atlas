import React from 'react';
import Image from 'next/image';
import defaultImageJpg from '/public/images/home-hero/LayoutB-Square-Default.jpg';
import meetImageJpg from '/public/images/home-hero/LayoutB-Square-Meet.jpg';

interface Props {
  dynamicSrc: string;
}

function LayoutBImageOne({ dynamicSrc }: Props): JSX.Element {
  return (
    <div className="heroHolderB layoutB">
      <div className="angleBracketDown angleSpaceMatchB softAppearItem"></div>
      <div className="heroSquareB layoutB">
        {/* Begin Dynamic Meet Content */}
        {dynamicSrc === 'meet' ? (
          // 'meet' content
          <picture>
            <source
              srcSet="/images/home-hero/LayoutB-Square-Meet.webp"
              type="image/webp"
            />
            <source
              srcSet="/images/home-hero/LayoutB-Square-Meet.jpg"
              type="image/jpeg"
            />
            <Image
              src={meetImageJpg}
              alt="The Smokey mascot crowdsurfs through a sea of smiling fans"
            />
          </picture>
        ) : (
          // default content
          <picture>
            <source
              srcSet="/images/home-hero/LayoutB-Square-Default.webp"
              type="image/webp"
            />
            <source
              srcSet="/images/home-hero/LayoutB-Square-Default.jpg"
              type="image/jpeg"
            />
            <Image
              src={defaultImageJpg}
              alt="a smiling student holding large glow sticks in the middle of a sea of orange jams to a concert"
            />
          </picture>
        )}
        {/* End Dynamic Meet Content */}
      </div>
    </div>
  );
}

export default LayoutBImageOne;
