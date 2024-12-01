import {useState, useEffect} from 'react';

export const useMediaQuery = (query: string): boolean | null => {
    const [matches, setMatches] = useState<boolean | null>(null);

    useEffect(() => {
        let mediaQueryList: MediaQueryList | null = null;

        const updateMatches = () => {
            if (mediaQueryList) {
                setMatches(mediaQueryList.matches);
            }
        };

        if (typeof window !== 'undefined') {
            mediaQueryList = window.matchMedia(query);
            setMatches(mediaQueryList.matches);
            mediaQueryList.addEventListener('change', updateMatches);
        }

        return () => {
            if (mediaQueryList) {
                mediaQueryList.removeEventListener('change', updateMatches);
            }
        };
    }, [query]);

    return matches;
};

