import React, { useEffect } from 'react';

export const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white animate-slide-in`}>
      {message}
    </div>
  );
};