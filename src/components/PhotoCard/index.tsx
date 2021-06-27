import React from 'react';
import { Photo, PhotoDetail } from '../../interfaces';
import { useGetPhotoDetailHook } from '../../services/flickr';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const { photoDetail, loading } = useGetPhotoDetailHook(photo.id);
  return (
    <div className="Card">
      Card!
    </div>
  );
}

export default PhotoCard;
