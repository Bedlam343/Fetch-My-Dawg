import { useEffect } from 'react';

function useDynamicScrollbar() {
  useEffect(() => {
    function updateScrollbar() {
      document.documentElement.style.overflowY =
        document.documentElement.scrollHeight > window.innerHeight
          ? 'scroll'
          : 'hidden';
    }

    window.addEventListener('resize', updateScrollbar);
    updateScrollbar(); // Run on mount

    return () => window.removeEventListener('resize', updateScrollbar);
  }, []);
}

export default useDynamicScrollbar;
