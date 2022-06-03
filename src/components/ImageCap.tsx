import React from 'react';
import styles from 'scss/components/Hero.module.scss';

interface Props {
  title: string;
  id?: string;
  bgImage?: string;
  buttonText?: string;
  buttonURL?: string;
  button2Text?: string;
  button2URL?: string;
  children?: React.ReactNode;
}

function ImageCap({
  bgImage
}: Props): JSX.Element {
  return (
    <img
      src={bgImage}
      className="card-img-top"
    />


  );
}

export default ImageCap;
