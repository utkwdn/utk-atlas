import React from 'react';
import Image from 'next/image';
import headerLogo from '/public/images/chrome/logo-horizontal-left-smokey.svg';

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
            srcSet="//images.utk.edu/images/www/hero20240715/hero-2024-q2-01.webp"
            type="image/webp"
          />
          <source
            srcSet="//images.utk.edu/images/www/hero20240715/hero-2024-q2-01.jpg"
            type="image/jpeg"
          />
          <img
            src="//images.utk.edu/images/www/hero20240715/hero-2024-q2-01.jpg"
            alt="a smiling student holding large glow sticks in the middle of a sea of orange jams to a concert"
          />
        </picture>
      ) : (
        // default content
        <picture>
          <source
            srcSet="//images.utk.edu/images/www/hero20240320/hero-2024-q2-01.webp"
            type="image/webp"
          />
          <source
            srcSet="//images.utk.edu/images/www/hero20240320/hero-2024-q2-01.jpg"
            type="image/jpeg"
          />
          <img
            src="//images.utk.edu/images/www/hero20240320/hero-2024-q2-01.jpg"
            alt="A professor works with students on the MELD Machine inside the Machine Tool Research Center in the Dougherty Engineering Building."
          />
        </picture>
      )}
      {/* End Dynamic Meet Content */}
    </div>
  );
}

export default LayoutAImageOne;
