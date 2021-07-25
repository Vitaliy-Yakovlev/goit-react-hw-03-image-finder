import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import imagesAPI from './services/images-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Spinner from './Loader';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    currentPage: 1,
    isLoading: false,
    showModal: false,
    error: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;

    this.setState({ isLoading: true });

    imagesAPI
      .fetchImages({
        searchQuery,
        currentPage,
      })
      .then(images => {
        if (!images.hits.length) {
          toast.error('Не верный запрос');
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          currentPage: prevState.currentPage + 1,
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

  toggleModal = e => {
    const { showModal } = this.state;

    if (!showModal) {
      this.setState({ largeImageURL: e.target.dataset.source });
    }

    if (showModal) {
      this.setState({ largeImageURL: '' });
    }

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { isLoading, images, largeImageURL, showModal } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer autoClose={3000} />
        {isLoading && <Spinner />}

        <ImageGallery
          images={images}
          onClick={this.toggleModal}
          largeImageURL={largeImageURL}
        />

        {images.length > 0 && (
          <Button
            className="ButtonLoad"
            onClick={this.fetchImages}
            aria-label="Загрузить еще"
          >
            <span className="label">Load more</span>
          </Button>
        )}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tag={images.tag}
            images={images}
          />
        )}
      </>
    );
  }
}

export default App;
