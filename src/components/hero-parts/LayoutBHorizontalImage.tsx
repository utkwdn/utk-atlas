import React from 'react';

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
              srcSet="//images.utk.edu/images/www/hero20240715/skyline-blue-mobile-01.webp"
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet="//images.utk.edu/images/www/hero20240715/skyline-blue-mobile-01.jpg"
              type="image/jpeg"
            />
            <source
              media="(min-width:768px)"
              srcSet="//images.utk.edu/images/www/hero20240715/skyline-blue-01.webp"
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet="//images.utk.edu/images/www/hero20240715/skyline-blue-01.jpg"
              type="image/jpeg"
            />
            <img
              src="//images.utk.edu/images/www/hero20240715/skyline-blue-mobile-02.jpg"
              alt="Knoxville skyline as seen from the University of Tennessee campus"
            />
          </picture>
        ) : (
          // default content
          <picture>
            <source
              media="(max-width:767px)"
              srcSet="//images.utk.edu/images/www/hero202112/river-aerial-mobile-02.webp"
              type="image/webp"
            />
            <source
              media="(max-width:767px)"
              srcSet="//images.utk.edu/images/www/hero202112/river-aerial-mobile-02.jpg"
              type="image/jpeg"
            />
            <source
              media="(min-width:768px)"
              srcSet="//images.utk.edu/images/www/hero202112/river-aerial-02.webp"
              type="image/webp"
            />
            <source
              media="(min-width:768px)"
              srcSet="//images.utk.edu/images/www/hero202112/river-aerial-02.jpg"
              type="image/jpeg"
            />
            <img
              src="//images.utk.edu/images/www/hero202112/river-aerial-mobile-02.jpg"
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
