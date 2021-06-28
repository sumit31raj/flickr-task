import { Photo } from '../../interfaces';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const description = photo.description._content.replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mx-auto my-2 pl-1">
      <div className="card">
        <div className="img-container">
          <img src={photo.url_s} className="img-fluid w-100" alt="feed" />
        </div>
        <div className="mx-1">
          <div className="mt-1">
            <a href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}/`} target="_blank" rel="noreferrer noopener" className="font-weight-bold">{photo.title}</a>
          </div>
          <div className="mt-1">
            by <a href={`https://www.flickr.com/photos/${photo.owner}`} target="_blank" rel="noreferrer noopener" className="font-weight-bold">{photo.ownername}</a>
          </div>
          {
            description.length > 0 ?
              <div className="mt-1" dangerouslySetInnerHTML={{ __html: `Description: ${description}` }} /> :
              false
          }
          {
            photo.tags.length > 0 ?
              <div className="tags mt-1">
                Tags: {photo.tags}
              </div> :
              false
          }
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
