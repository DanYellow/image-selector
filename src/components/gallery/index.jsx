import React from 'react';

import Thumbnail from '../thumbnail';

import './style.css';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItemIdx: 0,
    };

    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(props) {
    this.setState({
      selectedItemIdx: props.id,
    });
    this.props.handleClick(props);
  }

  render() {
    const { images = [], handleClick } = this.props;
    return (
      <section className="gallery">
        <ul className="gallery-scrollview">
          {images.map(image => {
            return (
              <li key={image.key}>
                <Thumbnail
                  isActive={image.key === this.state.selectedItemIdx}
                  handleClick={this.selectItem}
                  {...{ ...image, id: image.key }}
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
