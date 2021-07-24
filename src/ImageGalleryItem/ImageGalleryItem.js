import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  onClick,
  largeImageURL,
}) => (
  <li onClick={onClick} key={id} className={s.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      className={s.ImageGalleryItemImage}
      data-source={largeImageURL}
    />
  </li>
);

export default ImageGalleryItem;
