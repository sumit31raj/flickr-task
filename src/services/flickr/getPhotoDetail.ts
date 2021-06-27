import { useEffect, useState } from 'react';
import { get } from '../api';
import { getURL } from './config';
import { PhotoDetail } from '../../interfaces';

interface PhotoDetailHookResponse  {
  loading: boolean;
  photoDetail?: PhotoDetail;
}

export const useGetPhotoDetailHook = (id: string): PhotoDetailHookResponse => {
  const [loading, setLoading] = useState(true);
  const [photoDetail, setPhotoDetail] = useState<PhotoDetail>();

  const method = 'flickr.photos.getInfo';

  useEffect(() => {
    const fetch = async () => {
      try {
        const params ={
          method,
          photo_id: id,
        };

        const responseData = await get(getURL(params));
        setPhotoDetail(responseData.photo);
      } catch (error) {
        console.log('Got Error: ', error);
      }
      setLoading(false);
    }

    fetch();
  }, [id, method]);

  return {
    loading,
    photoDetail,
  };
}
