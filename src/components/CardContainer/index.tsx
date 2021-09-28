import { useEffect } from 'react';
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
    error,
  } = useGetSearchImagesHook();

  useEffect(() => {
    if (searchText) {
      setSearchText(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  useEffect(() => {
    nextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getNextPage = () => {
    if (!loading && !error) {
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
        {error && <p>Got error while fetching Data. Please try again in sometime.</p>}
      </InfiniteScroll>
    </div>
  );
}

export default CardContainer;
