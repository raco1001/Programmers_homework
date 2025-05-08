import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEventLogger } from './useEventLogger';

export const usePageTracker = () => {
  const location = useLocation();
  const logEvent = useEventLogger();

  useEffect(() => {
    logEvent('page_view', { pathname: location.pathname });
  }, [location.pathname]);
};
