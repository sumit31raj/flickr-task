import { useState, useEffect, useRef } from 'react'
import blurredPlaceholder from '../../assets/blurred-placeholder.jpeg';
import { useIsImageAppropriateHook, ImageAppropriationRequestStatus } from '../../services/moderateContent';
import Loader from '../Loader';

interface LazyImageProps {
  src: string;
  alt: string;
};

export const LazyImage = ({ src, alt }: LazyImageProps) => {
  const { status, isAppropriate, fetchImageAppropriation } = useIsImageAppropriateHook(src);

  const [imageSrc, setImageSrc] = useState(blurredPlaceholder);
  const [loadImage, setLoadImage] = useState(false);

  const imageRef = useRef(null);

  useEffect(() => {
    let observer: any;
    let didCancel: boolean = false;
    const imageElem = imageRef.current;

    if (imageRef && !loadImage) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // when image is visible in the viewport + rootMargin
              if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                setLoadImage(true);
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(imageRef.current);
      } else {
        // Old browsers fallback
        setLoadImage(true);
      }
    }
    return () => {
      didCancel = true;
      // on component unmount, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageElem);
      }
    }
  });

  useEffect(() => {
    if (loadImage && status === ImageAppropriationRequestStatus.NotStarted) {
      fetchImageAppropriation();
    }
  }, [loadImage, status]);

  useEffect(() => {
    if (status === ImageAppropriationRequestStatus.GotResult && isAppropriate) {
      setImageSrc(src);
    }
  }, [status, isAppropriate, src]);

  return (
    <div className="position-relative">
      <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
        <Loader loading={status === ImageAppropriationRequestStatus.Loading}/>
      </div>
      <img src={imageSrc} alt={alt} className="img-fluid w-100" ref={imageRef} />
    </div>
  );
};
