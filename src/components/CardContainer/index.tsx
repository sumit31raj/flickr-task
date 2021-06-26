import React, { useEffect } from 'react';
import { useGetSearchImagesHook } from '../../services/flickr';

interface CardContainerProps {
  searchText: string;
}

const CardContainer = ({ searchText } : CardContainerProps) => {
  const { loading, data, setText: setSearchText } = useGetSearchImagesHook();

  useEffect(() => {
    setSearchText(searchText);
  }, [searchText, setSearchText]);

  return (
    <div className="CardContainer">
      Card Container!
    </div>
  );
}

export default CardContainer;
