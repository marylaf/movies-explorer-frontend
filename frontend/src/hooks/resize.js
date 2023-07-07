import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth
    });
  
    useEffect(() => {
        let resizeTimeout;

        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            setWindowSize({
              width: window.innerWidth,
            });
          }, 200);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
      return windowSize;
    };

  export default useWindowSize;