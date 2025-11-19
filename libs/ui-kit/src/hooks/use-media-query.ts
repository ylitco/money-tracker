import { useEffect, useState } from 'react';

export function useMediaQuery(mediaQueryString: string) {
  const [isMatch, setIsMatch] = useState<boolean>(
    window.matchMedia(mediaQueryString).matches
  );

  useEffect(() => {
    let remove: (() => void) | null = null;

    updateMatching();

    return () => {
      remove?.();
    };

    function updateMatching() {
      remove?.();
      const media = matchMedia(mediaQueryString);
      media.addEventListener('change', updateMatching);
      remove = () => {
        media.removeEventListener('change', updateMatching);
      }
      setIsMatch(media.matches);
    }
  }, [mediaQueryString]);

  return isMatch;
}
