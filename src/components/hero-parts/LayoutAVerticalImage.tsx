import React from 'react';
import Image from 'next/image';
import defaultImageJpg from '/public/images/home-hero/LayoutA-Vertical-Mobile.jpg';
import meetImageJpg from '/public/images/home-hero/2024/LayoutA-Vertical-Mobile.jpg';

interface Props {
  dynamicSrc: string;
}

function LayoutAImageTwo({ dynamicSrc }: Props): JSX.Element {
  return (
    <div className="heroRectangleHolderA layoutA ">
      <div className="heroRectangleA ">
        {/* Begin Dynamic Content */}
        {dynamicSrc === 'meet' ? (
          // 'meet' content
          <picture>
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/2024/LayoutA-Vertical-Mobile.webp"
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/2024/LayoutA-Vertical-Mobile.jpg"
              type="image/jpeg"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/2024/LayoutA-Vertical-Desktop.webp"
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/2024/LayoutA-Vertical-Desktop.jpg"
              type="image/jpeg"
            />
            <Image
              src={meetImageJpg}
              alt="students walk through the middle of campus"
            />
          </picture>
        ) : (
          // default content
          <picture>
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/LayoutA-Vertical-Mobile.webp"
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet="/images/home-hero/LayoutA-Vertical-Mobile.jpg"
              type="image/jpeg"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/LayoutA-Vertical-Desktop.webp"
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet="/images/home-hero/LayoutA-Vertical-Desktop.jpg"
              type="image/jpeg"
            />
            <Image
              src={defaultImageJpg}
              alt="students walk through the middle of campus"
            />
          </picture>
        )}
        {/* End Dynamic Content */}
      </div>
      {/* end .heroRectangleA*/}
    </div>
  );
}

export default LayoutAImageTwo;
