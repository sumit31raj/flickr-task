import React, { useEffect } from 'react';
import { useGetSearchImagesHook } from '../../services/flickr';

interface CardContainerProps {
  searchText: string;
}

const CardContainer = ({ searchText } : CardContainerProps) => {
  const { loading, data, setText: setSearchText, nextPage } = useGetSearchImagesHook();

  useEffect(() => {
    setSearchText(searchText);
  }, [searchText, setSearchText]);

  console.log('Loading:  ', loading);
  // console.log('Data:  ', data);

  return (
    <div className="CardContainer">
      Card Container!
      <button onClick={() => nextPage()}>Next Page!</button>
    </div>
  );
}

export default CardContainer;
