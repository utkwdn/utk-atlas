import React from 'react';

interface ButtonActionProps {
  label?: string;
}

const ButtonAction: React.FunctionComponent<ButtonActionProps> = ({
  label,
}) => (
  <a className={['btn', 'btn-link'].join(' ')} href="#">
    {label}
  </a>
);
export default ButtonAction;
