import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => (
  <ul className={s.ImageGallery}>
    {images.map(image => (
      <ImageGalleryItem
        onClick={onClick}
        key={image.id}
        webformatURL={image.webformatURL}
        tags={image.tags}
        largeImageURL={image.largeImageURL}
      />
    ))}
  </ul>
);

export default ImageGallery;
