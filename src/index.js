import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

// import './index.css';
import './reset.css';

const generateSource = (nbItems = 30) => {
  const images = [
    'cerise_1.png',
    'rhum_3.jpg',
    'dulce_1.png',
    'noixdecoco_1.png',
  ];
  return Array.apply(null, { length: nbItems }).map(_ => {
    return {
      id: Math.random(),
      value: images[Math.floor(Math.random() * images.length)],
    };
  });
};

const container = document.getElementById('image-selector');
let config = null;

try {
  config = JSON.parse(container.dataset.config);
} catch (e) {
  config = {
    base_path: 'http://danyellow.net/lrv/src/assets/',
    source: generateSource(30),
  };
}

console.warn('config ---', config);

ReactDOM.render(<App config={config} />, container);
