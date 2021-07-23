import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images, onClick }) {
  return (
    <ul className="ImageGallery">
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
}

export default ImageGallery;
