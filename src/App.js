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

  toggleModal = e => {
    if (!this.state.showModal) {
      console.log(e.target.dataset.source);
      this.setState({ largeImageURL: e.target.dataset.source });
    }

    if (this.state.showModal) {
      this.setState({ largeImageURL: '' });
    }

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Spinner />}
        <ToastContainer autoClose={3000} />
        <ImageGallery
          images={this.state.images}
          onClick={this.toggleModal}
          largeImageURL={this.state.largeImageURL}
        />
        {this.state.images.length > 0 && (
          <Button
            className="Button"
            onClick={this.handleNextPage}
            aria-label="Загрузить еще"
          >
            <span className="label">Load more</span>
          </Button>
        )}
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={this.state.largeImageURL}
            tag={this.state.images.tag}
            images={this.state.images}
          />
        )}
      </>
    );
  }
}

export default App;
