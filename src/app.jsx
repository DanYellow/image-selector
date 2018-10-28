import React, { Component } from 'react';
import { debounce } from 'lodash';

import Gallery from './components/gallery';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.DELAY_SEARCH = 100;

    this.handleChange = this.handleChange.bind(this);
    this.dataMapping = this.dataMapping.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.goToSelectedImage = this.goToSelectedImage.bind(this);
    this.search = debounce(this.search, this.DELAY_SEARCH);

    this.state = {
      images: this.dataMapping(props.config.source),
      input: {
        value: '',
      },
      isSearching: false,
    };

    this.itemSelectedId = props.config.selected_item_value || null;
  }

  goToSelectedImage() {
    const element = document.getElementById(`thumbnail-${this.itemSelectedId}`);
    if (element) {
      element.scrollIntoView();
      element.classList.add('blink');

      element.addEventListener('animationend', this.selectedImageRemoveClass);
    }
  }

  handleChange(event) {
    const { input } = this.state;
    input.value = event.target.value;
    let searchResults = this.search(input.value) || [];

    if (input.value.length === 0) {
      searchResults = this.dataMapping(this.props.config.source);
    }

    this.setState({ input, images: searchResults });
  }

  search(value) {
    return this.state.images.filter(image => {
      return image.name.includes(value);
    });
  }

  dataMapping(data = []) {
    return data.map(item => {
      const newObj = {
        key: item.id,
        image: `${this.props.config.base_path}${item.value}`,
        name: `${item.value}`,
      };
      return newObj;
    });
  }

  selectImage(itemSelected) {
    this.itemSelectedId = itemSelected.id;
    if (this.props.config.input_id) {
      document.getElementById(
        this.props.config.input_id
      ).value = this.itemSelectedId;
    }
  }

  selectedImageRemoveClass(e) {
    e.target.classList.remove('blink');
  }

  render() {
    const {
      images,
      isSearching,
      input: { value },
    } = this.state;

    return (
      <div className="App">
        <header className="header">
          <form action="#">
            <input
              placeholder="Rechercher une image"
              type="search"
              value={value}
              onChange={this.handleChange}
            />
            <button
              className="scroll-to-btn"
              onClick={this.goToSelectedImage}
              type="button"
            >
              Scroll to the image selected
            </button>
          </form>
        </header>
        {images.length > 0 && (
          <Gallery
            handleClick={this.selectImage}
            images={images}
            isSearching={isSearching}
          />
        )}

        {images.length === 0 &&
          value.length > 0 && <p>Pas d'images trouvées :/</p>}
      </div>
    );
  }
}

export default App;
