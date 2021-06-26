import { useEffect, useState } from 'react';
import { get } from './api';

const baseUrl = 'https://www.flickr.com/services/rest/';
const apiKey = process.env.REACT_APP_FLICKR_API_KEY;

const getURL = (params: {[key: string]: string }) => {
  const searchParams = new URLSearchParams(params);

  return `${baseUrl}?api_key=${apiKey}&format=json&nojsoncallback=true&${searchParams.toString()}`;
}

export const useGetSearchImagesHook = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const nextPage = () => setPage(page => page + 1);

  const method = text ? 'flickr.photos.search' : 'flickr.photos.getRecent';

  useEffect(() => {
    const fetch = async () => {
      try {
        const params: {
          method: string;
          page: string;
          text?: string;
        } =  {
          method,
          page: page.toString(),
          text,
        };

        if (!text) delete params['text']

        const responseData = await get(getURL(params));
        setData(data => [...data, ...responseData.photos.photo]);
      } catch (error) {
        console.log('Got Error: ', error);
      }
      setLoading(false);
    }

    fetch();
  }, [text, method, page]);

  return {
    loading,
    data,
    setText,
    nextPage,
  };
}
