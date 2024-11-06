import { useEffect } from 'react';

export function useScrollbarWidth() {
  useEffect(() => {
    const calculateScrollbarWidth = () => {
      const scrollDiv = document.createElement('div');
      scrollDiv.style.visibility = 'hidden';
      scrollDiv.style.overflow = 'scroll';
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '0';
      scrollDiv.style.left = '0';
      scrollDiv.style.width = '100px';
      scrollDiv.style.height = '100px';

      document.body.appendChild(scrollDiv);
      document.body.style.setProperty(
        '--dialog-scrollgutter',
        `${scrollDiv.offsetWidth - scrollDiv.clientWidth}px`,
      );
      document.body.removeChild(scrollDiv);
    };

    calculateScrollbarWidth();
  }, []);
}
