import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const useScrollToHash = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const scrollToElement = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 500);
        }
      }
    };
    scrollToElement();

    window.addEventListener('hashchange', scrollToElement);

    return () => {
      window.removeEventListener('hashchange', scrollToElement);
    };
  }, [pathname]);
};