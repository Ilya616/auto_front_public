/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACK_API: string;
  readonly VITE_BACK_STORAGE: string;
  VITE_REVERB_APP_KEY: string;
  VITE_REVERB_HOST: string;
  VITE_REVERB_PORT: number;
  VITE_REVERB_SCHEME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}