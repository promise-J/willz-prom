import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Check initial online status

  // Update state when the network status changes
  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    // Listen to online and offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup listeners when component unmounts
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        <p>You are connected to the internet!</p>
      ) : (
        <p style={{ color: 'red' }}>You are currently offline. Please check your network connection.</p>
      )}
    </div>
  );
};

export default NetworkStatus;
