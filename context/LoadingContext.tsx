
import React, { createContext, useContext, useState, useCallback } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  startLoading: (msg?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const startLoading = useCallback((msg: string = '處理中...') => {
    setMessage(msg);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setMessage('');
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, message, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error('useGlobalLoading must be used within LoadingProvider');
  return context;
};
