import { useEffect, useRef, useState } from 'react';
import { getIsImageAppropriate } from './config';

const checkImageAppropriation = async (imageUrl: string, signal?: any): Promise<any> => {
  try {
    const isAppropriate = await getIsImageAppropriate(imageUrl, signal);
    return isAppropriate;
  } catch (error) {
    console.log('Got Error: ', error);
    throw error;
  }
};

interface IsImageAppropriateHookResponse {
  loading: boolean;
  isAppropriate: boolean;
  error: any;
}

export const useIsImageAppropriateHook = (url: string): IsImageAppropriateHookResponse => {
  const [loading, setLoading] = useState(true);
  const [isAppropriate, setIsAppropriate] = useState(false);
  const [error, setError] = useState();
  const abortControllerRef = useRef(new AbortController());

  const getImageAppropriationInfo = async (_url: string) => {
    try {
      const data = await checkImageAppropriation(_url, abortControllerRef.current.signal);
      setIsAppropriate(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    const abortController = abortControllerRef.current;

    if (url) {
      getImageAppropriationInfo(url)
    }

    return () => {
      console.log('Un mounting:  ')
      abortController.abort();
    }
  }, [url]);
 
  return {
    loading,
    isAppropriate,
    error,
  };
}
