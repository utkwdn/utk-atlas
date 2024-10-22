import React from 'react';

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
              srcSet="//images.utk.edu/images/www/hero20240715/hero-image-smokey-crowdsurfing.webp"
              type="image/webp"
            />
            <source
              srcSet="//images.utk.edu/images/www/hero20240715/hero-image-smokey-crowdsurfing.jpg"
              type="image/jpeg"
            />
            <img
              src="//images.utk.edu/images/www/hero20240715/hero-image-smokey-crowdsurfing.jpg"
              alt="The Smokey mascot crowdsurfs through a sea of smiling fans"
            />
          </picture>
        ) : (
          // default content
          <picture>
            <source
              srcSet="//images.utk.edu/images/www/hero20240602/hero-image-glow-sticks-b2-02.webp"
              type="image/webp"
            />
            <source
              srcSet="//images.utk.edu/images/www/hero20240602/hero-image-glow-sticks-b2-02.jpg"
              type="image/jpeg"
            />
            <img
              src="//images.utk.edu/images/www/hero20240602/hero-image-glow-sticks-b2-02.jpg"
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
