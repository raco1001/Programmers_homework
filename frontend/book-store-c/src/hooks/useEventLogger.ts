export const useEventLogger = () => {
  return (eventName: string, payload: Record<string, any> = {}) => {
    if (process.env.REACT_APP_ENABLE_MONITORING !== 'true') return;

    const endpoint =
      process.env.REACT_APP_MONITORING_ENDPOINT || '/client-events';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        eventName,
        payload,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => {
      console.error('Failed to log user event:', err);
    });
  };
};
