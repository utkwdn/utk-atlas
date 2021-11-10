import React from 'react';

interface calEventProps {
    title;
}

export default function calEvent({ title }: calEventProps): JSX.Element {
  return (
    <div>
      <h4>{title}</h4>
    </div>
  );
}