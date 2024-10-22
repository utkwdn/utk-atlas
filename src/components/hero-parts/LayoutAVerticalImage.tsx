import React from 'react';

interface Props {
  dynamicSrc: string;
}

function LayoutAImageTwo({ dynamicSrc }: Props): JSX.Element {
  return (
    <div className="heroRectangleHolderA layoutA ">
      <div className="heroRectangleA ">
        <picture>
          <source
            media="(max-width:767px)"
            srcSet="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.webp"
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.jpg"
            type="image/jpeg"
          />
          <source
            media="(min-width:768px)"
            srcSet="//images.utk.edu/images/www/hero202112/aerial-crosswalk-02.webp"
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet="//images.utk.edu/images/www/hero202112/aerial-crosswalk-02.jpg"
            type="image/jpeg"
          />
          <img
            src="//images.utk.edu/images/www/hero202112/aerial-crosswalk-mobile-02.jpg"
            alt="students walk through the middle of campus"
          />
        </picture>
      </div>
      {/* end .heroRectangleA*/}
    </div>
  );
}

export default LayoutAImageTwo;
