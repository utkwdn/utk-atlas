import React from 'react';

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
            srcSet="//images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.webp"
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet="//images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.jpg"
            type="image/jpeg"
          />
          <source
            media="(min-width:768px)"
            srcSet="//images.utk.edu/images/www/hero202203/cheer-students-b1.webp"
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet="//images.utk.edu/images/www/hero202203/cheer-students-b1.jpg"
            type="image/jpeg"
          />
          <img
            src="//images.utk.edu/images/www/hero202203/cheer-students-mobile-b1.jpg"
            alt="cheerleaders rush the field during a packed home game"
          />
        </picture>
      </div>
    </div>
  );
}

export default LayoutBImageOne;
