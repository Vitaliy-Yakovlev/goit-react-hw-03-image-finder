import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as basicLightbox from 'basiclightbox';
import 'react-toastify/dist/ReactToastify.css';
import imagesAPI from './services/images-api';
import Searchbar from './Searchbar';
import './App.css';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    isModal: false,
    error: null,
    largeImageURL:
      'https://pixabay.com/ru/photos/%d1%8d%d1%82%d0%b0%d0%b6-%d0%b2%d1%83%d0%b4-%d0%bf%d0%be%d0%bb-%d0%b4%d0%b5%d1%80%d0%b5%d0%b2%d1%8f%d0%bd%d0%bd%d1%8b%d0%b9-1256804/',
  };

  // модальное окно
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.onClose();
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOriginalImage = e => {
    const instance = basicLightbox.create(`
    <img src=${this.state.largeImageURL} alt="" />
`);

    instance.show();
  };
  // модальное окно

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    this.setState({ isLoading: true });

    imagesAPI
      .fetchImages({
        searchQuery: this.state.searchQuery,
        currentPage: this.state.currentPage,
      })
      .then(images => {
        if (!images.hits.length) {
          toast.error('Не верный запрос');
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));

        if (this.state.currentPage >= 2) {
          setTimeout(() => {
            window.scrollBy({
              top: document.documentElement.clientHeight - 120,
              behavior: 'smooth',
            });
          }, 600);
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery, currentPage: 1, images: [] });
  };

  handleNextPage = e => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    this.fetchImages();
  };

  render() {
    console.log(this.state.images);
    console.log(
      imagesAPI.fetchImages(this.state.searchQuery, this.state.currentPage),
    );
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer autoClose={3000} />

        <ul className="ImageGallery">
          {this.state.images.map(({ id, webformatURL, tag }) => (
            <li key={id} className="ImageGalleryItem">
              <img
                src={webformatURL}
                alt={tag}
                className="ImageGalleryItem-image"
              />
            </li>
          ))}
        </ul>

        {this.state.images.length > 0 && (
          <button
            onClick={this.handleNextPage}
            id="btn"
            type="button"
            className="Button"
            data-action="load-more"
          >
            <span
              className="spinner-border spinner-border-sm spinner is-hidden"
              role="status"
              aria-hidden="true"
            ></span>

            <span className="label">Load more</span>
          </button>
        )}

        {this.state.isModal && (
          <div onClick={this.handleBackdropClick} className="Overlay">
            <div className="Modal">
              <img src={this.state.largeImageURL} alt="" />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;
