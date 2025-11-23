/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACK_API: string;
  readonly VITE_BACK_STORAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}