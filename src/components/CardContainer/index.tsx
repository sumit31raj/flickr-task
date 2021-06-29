import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import PhotoCard from '../PhotoCard';
import Loader from '../Loader';
import { useGetSearchImagesHook } from '../../services/flickr';

interface CardContainerProps {
  searchText: string;
}

const CardContainer = ({ searchText }: CardContainerProps) => {
  const [page, setPage] = useState(1);

  const {
    loading,
    photos,
    setText: setSearchText,
    fetch
  } = useGetSearchImagesHook();

  useEffect(() => {
    setSearchText(searchText);
  }, [searchText, setSearchText]);

  useEffect(() => {
    loadMore();
  }, [searchText]);

  const loadMore = async () => {
    await fetch(page)
    setPage(page + 1);
  };

  return (
    <div className="container">
      <InfiniteScroll
        pageStart={0}
        hasMore={true}
        loadMore={loadMore}
        threshold={500}
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
