/// <reference types="vite/client" />

// Declare CSS module types
declare module "*.css" {
  const content: string;
  export default content;
}

// Extend Vite's ImportMetaEnv for custom env variables
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  // Add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
