import { useEffect, useRef } from 'react';

const useScrollToElement = (elementId: string) => {
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const targetElement = document.getElementById(elementId);
    targetRef.current = targetElement;

    const handleScroll = () => {
      if (targetRef.current) {
        const { top } = targetRef.current.getBoundingClientRect();
        if (top <= window.innerHeight) {
          console.log('Element scrolled into view!');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementId]);

  return targetRef;
};

export default useScrollToElement;