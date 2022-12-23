import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { getImagesApi } from 'UTILS/constants';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export default function ImageGallery({ query }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [largeImgURL, setLargeImgURL] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getImg = (query, page = 1) => {
    setVisible(true);
    getImagesApi(query, page)
      .then(pictures => setImages(prevImages => [...prevImages, ...pictures]))
      .finally(() => {
        setVisible(false);
        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  };

  useEffect(() => {
    if (query) {
      getImg(query);
      setPage(1);
      setImages([]);
    }
  }, [query]);

  useEffect(() => {
    if (page !== 1) {
      getImg(query, page);
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setIsOpenModal(prev => !prev);
  };

  const setLargeImg = largeImgURL => {
    setLargeImgURL(largeImgURL);
  };

  return (
    <>
      {images.length > 0 && (
        <ul className="ImageGallery">
          {images.map(image => (
            <li
              key={image.id}
              onClick={toggleModal}
              className="ImageGalleryItem"
            >
              <img
                src={image.webformatURL}
                alt={image.tags}
                onClick={() => setLargeImg(image.largeImageURL)}
                className="ImageGalleryItem-image"
              />
            </li>
          ))}
        </ul>
      )}
      <div className="loader">
        {visible && (
          <div className="Loader">
            <ColorRing
              visible={true}
              height="250"
              width="250"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}
      </div>

      {isOpenModal && (
        <Modal largeImageURL={largeImgURL} closeModal={toggleModal} />
      )}
      {images.length > 1 && (
        <button className="Button" type="button" onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};
