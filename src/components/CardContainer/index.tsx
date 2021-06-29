import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import PhotoCard from '../PhotoCard';
import Loader from '../Loader';
import { useGetSearchImagesHook } from '../../services/flickr';

interface CardContainerProps {
  searchText: string;
}

const CardContainer = ({ searchText }: CardContainerProps) => {
  const {
    loading,
    photos,
    setSearchText,
    nextPage,
  } = useGetSearchImagesHook();

  useEffect(() => {
    if (searchText) {
      setSearchText(searchText);
    }
  }, [searchText])

  useEffect(() => {
    nextPage();
  }, [])

  const getNextPage = () => {
    if (!loading) {
      nextPage()
    }
  }

  return (
    <div className="container">
      <InfiniteScroll
        pageStart={1}
        hasMore={true}
        loadMore={getNextPage}
        threshold={250}
      >
        <div className="masonry">
          {photos.map(photo =>
            <PhotoCard key={photo.id} photo={photo} />
          )}
        </div>
        <Loader loading={loading} />
      </InfiniteScroll>
    </div>
  );
}

export default CardContainer;
