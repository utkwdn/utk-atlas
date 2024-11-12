import React from 'react';
import Image from 'next/image';
import defaultImageJpg from '/public/images/home-hero/LayoutA-Square-Default.jpg';
import meetImageJpg from '/public/images/home-hero/LayoutA-Square-Meet.jpg';

interface Props {
  dynamicSrc: string;
}

function LayoutAImageOne({ dynamicSrc }: Props): JSX.Element {
  return (
    <div className="heroSquareA ">
      {/* Begin Dynamic Meet Content */}
      {dynamicSrc === 'meet' ? (
        // 'meet' content
        <picture>
          <source
            srcSet="/images/home-hero/LayoutA-Square-Meet.webp"
            type="image/webp"
          />
          <source
            srcSet="/images/home-hero/LayoutA-Square-Meet.jpg"
            type="image/jpeg"
          />
          <Image
            src={meetImageJpg}
            alt="a smiling student holding large glow sticks in the middle of a sea of orange jams to a concert"
            priority={true}
          />
        </picture>
      ) : (
        // default content
        <picture>
          <source
            srcSet="/images/home-hero/LayoutA-Square-Default.webp"
            type="image/webp"
          />
          <source
            srcSet="/images/home-hero/LayoutA-Square-Default.jpg"
            type="image/jpeg"
          />
          <Image
            src={defaultImageJpg}
            alt="A professor works with students on the MELD Machine inside the Machine Tool Research Center in the Dougherty Engineering Building."
            priority={true}
          />
        </picture>
      )}
      {/* End Dynamic Meet Content */}
    </div>
  );
}

export default LayoutAImageOne;
