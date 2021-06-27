import React, { useEffect } from 'react';
import { useGetSearchImagesHook } from '../../services/flickr';
import PhotoCard from '../PhotoCard';
import Loader from '../Loader';

interface CardContainerProps {
  searchText: string;
}

const CardContainer = ({ searchText } : CardContainerProps) => {
  const { loading, photos, setText: setSearchText, nextPage } = useGetSearchImagesHook();

  useEffect(() => {
    setSearchText(searchText);
  }, [searchText, setSearchText]);

  return (
    <div className="CardContainer">
      Card Container!
      {
        photos.map(photo => <PhotoCard key={photo.id} photo={photo}/>)
      }
      <Loader loading={loading} />
      <button onClick={() => nextPage()}>Next Page!</button>
    </div>
  );
}

export default CardContainer;
