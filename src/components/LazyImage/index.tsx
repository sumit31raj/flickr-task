import { useState, useEffect, useRef } from 'react'

const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

interface LazyImageProps {
  src: string;
  alt: string;
};

export const LazyImage = ({ src, alt }: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const imageRef = useRef(null);

  useEffect(() => {
    let observer: any;
    let didCancel: boolean = false;

    if (imageRef && imageSrc === placeHolder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              // when image is visible in the viewport + rootMargin
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        )
        observer.observe(imageRef.current);
      } else {
        // Old browsers fallback
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      // on component unmount, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef.current);
      }
    }
  });   


  return <img src={imageSrc} alt={alt} className="img-fluid w-100" ref={imageRef} />
};
