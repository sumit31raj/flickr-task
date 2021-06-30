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
  status: ImageAppropriationRequestStatus;
  isAppropriate: boolean;
  fetchImageAppropriation: () => void;
}

export enum ImageAppropriationRequestStatus {
  NotStarted = 1,
  Loading,
  GotResult,
  Error,
}

export const useIsImageAppropriateHook = (url: string): IsImageAppropriateHookResponse => {
  const [status, setStatus] = useState(ImageAppropriationRequestStatus.NotStarted);
  const [isAppropriate, setIsAppropriate] = useState(false);
  const abortControllerRef = useRef(new AbortController());

  const getImageAppropriationInfo = async (_url: string) => {
    setStatus(ImageAppropriationRequestStatus.Loading);
    try {
      const data = await checkImageAppropriation(_url, abortControllerRef.current.signal);
      setIsAppropriate(data);
      setStatus(ImageAppropriationRequestStatus.GotResult);
    } catch (error) {
      setStatus(ImageAppropriationRequestStatus.Error);
    }
  }

  useEffect(() => {
    const abortController = abortControllerRef.current;

    return () => {
      console.log('Un mounting:  ')
      abortController.abort();
    }
  }, []);

  const fetchImageAppropriation = () => {
    getImageAppropriationInfo(url)
  }
 
  return {
    status,
    isAppropriate,
    fetchImageAppropriation,
  };
}
