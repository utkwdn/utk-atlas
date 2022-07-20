import React from 'react';
import ReactDOM from 'react-dom';

// keep a list of the icon ids we put in the symbol
const icons = ['utk-logo-white', 'icon-2'];

// then define an Icon component that references the
function Icon({ id, ...props }) {
  return (
    <svg {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}

// In your App, you can now render the icons
function App() {
  return (
    <div className="App">
      {icons.map((id) => {
        return <Icon key={id} id={id} />;
      })}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
