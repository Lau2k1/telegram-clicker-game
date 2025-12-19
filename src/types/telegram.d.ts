// src/types/telegram.d.ts
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        initDataUnsafe?: any;
        CloudStorage?: {
          setItem: (key: string, value: string) => Promise<void>;
          getItem: (key: string) => Promise<string | null>;
          removeItem: (key: string) => Promise<void>;
        };
        expand: () => void;
        BackButton?: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        close: () => void;
        sendData: (data: string) => void;
      };
    };
  }
}

export {}; // Это нужно для модуля