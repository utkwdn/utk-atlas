import React from 'react';
import Image from 'next/image';
import defaultImageJpg from '/public/images/home-hero/LayoutB-Vertical-Mobile.jpg';
import meetImageJpg from '/public/images/home-hero/LayoutB-Vertical-Mobile.jpg';

interface Props {
  dynamicSrc: string;
}

function LayoutBImageOne({ dynamicSrc }: Props): JSX.Element {
  return (
    <div className="heroRectangleHolderB layoutB ">
      <div className="heroRectangleB layoutB">
        {/* Begin Dynamic Content */}
        {dynamicSrc === 'meet' ? (
          // 'meet' content
          <picture>
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/2024/LayoutB-Vertical-Mobile.webp"
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/2024/LayoutB-Vertical-Mobile.jpg"
              type="image/jpeg"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/2024/LayoutB-Vertical-Desktop.webp"
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/2024/LayoutB-Vertical-Desktop.jpg"
              type="image/jpeg"
            />
            <Image
              src={meetImageJpg}
              alt="cheerleaders rush the field during a packed home game"
            />
          </picture>
        ) : (
          // default content
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
        )}
        {/* End Dynamic Content */}
      </div>
    </div>
  );
}

export default LayoutBImageOne;
