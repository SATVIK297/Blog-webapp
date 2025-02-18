import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


// to move to the top of the page while navigation

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;