function ImageGalleryItem({ id, webformatURL, tags, onClick, largeImageURL }) {
  return (
    <li onClick={onClick} key={id} className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        data-source={largeImageURL}
      />
    </li>
  );
}

export default ImageGalleryItem;
