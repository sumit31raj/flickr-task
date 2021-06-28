import { useState } from 'react';
import { get } from '../api';
import { getURL } from './config';
import { Photo } from '../../interfaces';

interface SearchImageHookResponse {
  loading: boolean;
  photos: Photo[];
  setText: (text: string) => void;
  fetch: (page: number) => void;
  setPageLimit: (limit: number) => void;
}

export const useGetSearchImagesHook = (): SearchImageHookResponse => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [perPage, setPerPage] = useState(10);

  const setPageLimit = (limit: number) => setPerPage(limit);

  const method = 'flickr.photos.search';

  const fetch = async (page: number) => {
    try {
      const params: {
        method: string;
        page: string;
        text?: string;
        per_page: string;
        safe_search: string;
      } = {
        method,
        page: page.toString(),
        per_page: perPage.toString(),
        safe_search: '1',
        text,
      };

      if (!text) delete params['text']

      const responseData = await get(getURL(params));
      if (text) {
        setPhotos(responseData.photos.photo)
      } else {
        setPhotos([...photos, ...responseData.photos.photo]);
      }
    } catch (error) {
      console.log('Got Error: ', error);
    }
    setLoading(false);
  };

  return {
    loading,
    photos,
    setText,
    setPageLimit,
    fetch,
  };
}
