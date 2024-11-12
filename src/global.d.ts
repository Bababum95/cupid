export {};

declare global {
  interface Window {
    gtag: (
      config: string,
      id: string,
      options?: Record<string, unknown>
    ) => void;
  }
}
