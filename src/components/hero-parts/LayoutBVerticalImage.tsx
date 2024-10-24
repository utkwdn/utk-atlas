import React from 'react';
import Image from 'next/image';
import defaultImageJpg from '/public/images/home-hero/LayoutB-Vertical-Mobile.jpg';

interface Props {
  dynamicSrc: string;
}

function LayoutBImageOne({ dynamicSrc }: Props): JSX.Element {
  return (
    <div className="heroRectangleHolderB layoutB ">
      <div className="heroRectangleB layoutB">
        <picture>
          <source
            media="(max-width:767px)"
            srcSet="/images/home-hero/LayoutB-Vertical-Mobile.webp"
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet="/images/home-hero/LayoutB-Vertical-Mobile.jpg"
            type="image/jpeg"
          />
          <source
            media="(min-width:768px)"
            srcSet="/images/home-hero/LayoutB-Vertical-Desktop.webp"
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet="/images/home-hero/LayoutB-Vertical-Desktop.jpg"
            type="image/jpeg"
          />
          <Image
            src={defaultImageJpg}
            alt="cheerleaders rush the field during a packed home game"
          />
        </picture>
      </div>
    </div>
  );
}

export default LayoutBImageOne;
