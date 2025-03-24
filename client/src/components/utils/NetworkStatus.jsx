import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { soundNotification } from '../../utils/helpers';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Check initial online status

  // Update state when the network status changes
  const handleOnline = () => {
    setTimeout(() => {
      soundNotification()
      toast.success('You are now connected to the internet', {position: 'top-right'})
    }, 1500);
    setIsOnline(true);
  };
  
  const handleOffline = () => {
    setTimeout(() => {
      soundNotification()
      toast.error('You are not connected to the internet. Please try again', {position: 'top-right'})
    }, 1500);
    setIsOnline(true);
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
  }, [navigator.onLine]);

  return (
    <div></div>
  );
};

export default NetworkStatus;
