/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: number;
  readonly VITE_SHOW_VERSION: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
