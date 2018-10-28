import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './index';

const generateSource = (nbItems = 30) => {
  const images = [
    'cerise_1.png',
    'rhum_3.jpg',
    'dulce_1.png',
    'noixdecoco_1.png',
  ];
  return Array.apply(null, { length: nbItems }).map(item => {
    return {
      id: Math.random(),
      image: images[Math.floor(Math.random() * images.length)],
    };
  });
};

describe('<Gallery />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Gallery />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with images', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Gallery images={generateSource()} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
