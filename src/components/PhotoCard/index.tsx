import EllipsisText from 'react-ellipsis-text';
import { Photo } from '../../interfaces';
import { LazyImage } from '../LazyImage';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const description = photo.description._content.replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <div className="item">
      <div className="card">
        <div className="img-container">
          <LazyImage src={photo.url_s} alt="feed" />
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
          {description.length > 0 && (
            <div className="mt-1">
              <b>Description:</b> <EllipsisText text={description} length={100} />
            </div>
          )}
          {photo.tags.length > 0 && (
            <div className="tags mt-1">
              <b>Tags:</b> <EllipsisText text={photo.tags.split(' ').join(', ')} length={100} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
