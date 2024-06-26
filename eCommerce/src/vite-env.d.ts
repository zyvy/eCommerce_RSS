/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_KEY: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_SCOPE: string;
  readonly VITE_REGION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
