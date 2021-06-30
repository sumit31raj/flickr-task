import { useState } from 'react';
import { get } from '../api';
import { getURL } from './config';
import { Photo } from '../../interfaces';

interface RequestParams {
  [key: string]: string;
}

const fetchPhotos = async (
  textToSearch: string,
  pageToFetch: number,
  perPage: number,
): Promise<Photo[]> => {
  const method = textToSearch ? 'flickr.photos.search' : 'flickr.photos.getRecent';

  try {
    const params: RequestParams = {
      method,
      page: pageToFetch.toString(),
      per_page: perPage.toString(),
      safe_search: '1',
    };

    if (textToSearch) params['text'] = textToSearch;

    const responseData = await get(getURL(params));
    return responseData.photos.photo;
  } catch (error) {
    console.log('Got Error: ', error);
    throw error;
  }
};

interface SearchImageHookResponse {
  loading: boolean;
  photos: Photo[];
  error: string;
  setSearchText: (text: string) => void;
  setPageLimit: (limit: number) => void;
  nextPage: () => void;
}

export const useGetSearchImagesHook = (): SearchImageHookResponse => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [perPage, setPerPage] = useState(20);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);

  const setPageLimit = (limit: number) => setPerPage(limit);

  const nextPage = async () => {
    setLoading(true);
    setPage(previousPage => previousPage + 1);
    try {
      const newData = await fetchPhotos(text, page + 1, perPage);
      setPhotos([...photos, ...newData]);
    } catch (error) {
      setError(error.message)
    }
    setLoading(false);
  }

  const setSearchText = async (searchText: string) => {
    setLoading(true);
    setText(searchText)
    setPage(1);
    try {
      const newData = await fetchPhotos(searchText, 1, perPage);
      setPhotos([...newData]);
    } catch (error) {
      setError(error.message)
    }
    setLoading(false);
  }

  return {
    loading,
    photos,
    error,
    setSearchText,
    setPageLimit,
    nextPage,
  };
}
