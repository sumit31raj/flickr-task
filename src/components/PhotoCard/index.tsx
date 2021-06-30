import EllipsisText from 'react-ellipsis-text';
import { Photo } from '../../interfaces';
import { LazyImage } from '../LazyImage';
import { useIsImageAppropriateHook } from '../../services/deepai';
import Loader from '../Loader';
import blurredPlaceholder from '../../assets/blurred-placeholder.jpeg';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  // const { loading, isAppropriate, error } = useIsImageAppropriateHook(photo.url_s);
  const description = photo.description._content.replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <div className="item">
      <div className="card">
        <div className="img-container">
          <LazyImage
            src={photo.url_s}
            alt="feed"
          />
          {/* {
            loading ? 
            (
              <>
                <img src={blurredPlaceholder} alt="placeholder"/>
                <Loader loading={loading} />
              </>
            ) : isAppropriate ?
            <img src={photo.url_s} className="img-fluid w-100" alt="feed" loading="lazy" /> :
            <img src={blurredPlaceholder} alt="placeholder"/>
          } */}
        </div>
        <div className="mx-1 card-content">
          <div className="mt-1">
            <a
              href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}/`}
              target="_blank"
              rel="noreferrer noopener"
              className="font-weight-bold"
            >
              {photo.title}
            </a>
          </div>
          <div className="mt-1">
            by <a
              href={`https://www.flickr.com/photos/${photo.owner}`}
              target="_blank"
              rel="noreferrer noopener"
              className="font-weight-bold"
            >
              {photo.ownername}
            </a>
          </div>
          {
            description.length > 0 ?
              <div className="mt-1">
                <b>Description:</b> <EllipsisText
                  text={description}
                  length={100}
                />
              </div>
              :
              false
          }
          {
            photo.tags.length > 0
              ? <div className="tags mt-1">
                <b>Tags:</b> <EllipsisText text={photo.tags.split(' ').join(', ')} length={100}></EllipsisText>
              </div> :
              false
          }
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
