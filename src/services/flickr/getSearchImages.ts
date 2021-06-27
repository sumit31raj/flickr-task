import { useEffect, useState } from 'react';
import { get } from '../api';
import { getURL } from './config';
import { Photo } from '../../interfaces';

interface SearchImageHookResponse  {
  loading: boolean;
  photos: Photo[];
  setText: (text: string) => void;
  nextPage: () => void;
  setPageLimit: (limit: number) => void;
}

export const useGetSearchImagesHook = (): SearchImageHookResponse => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(40);

  const nextPage = () => setPage(page => page + 1);
  const setPageLimit = (limit: number) => setPerPage(limit);

  const method = text ? 'flickr.photos.search' : 'flickr.photos.getRecent';

  useEffect(() => {
    const fetch = async () => {
      try {
        const params: {
          method: string;
          page: string;
          text?: string;
          per_page: string;
          safe_search: string;
        } =  {
          method,
          page: page.toString(),
          per_page: perPage.toString(),
          safe_search: '1',
          text,
        };

        if (!text) delete params['text']

        const responseData = await get(getURL(params));
        setPhotos(data => [...data, ...responseData.photos.photo]);
      } catch (error) {
        console.log('Got Error: ', error);
      }
      setLoading(false);
    }

    fetch();
  }, [text, method, page, perPage]);

  return {
    loading,
    photos,
    setText,
    nextPage,
    setPageLimit,
  };
}
