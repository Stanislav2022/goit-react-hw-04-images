import css from "./ImageGallery.module.css"
import PropTypes from 'prop-types';

const ImageGallery = ({ items, onClick }) => {
  const imageGalleryItems = items.map(({ id, webformatURL, largeImageURL, tags }) => <li className={css.ImageGalleryItem} key={id} onClick={() => onClick({ largeImageURL, tags })}><img className={css.ImageGalleryItem__image} src={webformatURL} alt={tags} /></li>);
  return (
    <ul className={css.ImageGallery}>
      {imageGalleryItems}
    </ul>
  )
}

ImageGallery.propTypes = {}

export default ImageGallery
ImageGallery.defaultProps = {
  items: []
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
  )
  };