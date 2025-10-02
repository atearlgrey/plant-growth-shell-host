declare global {
  interface Window {
    env: {
      production?: trring;
      environment?: string;
      plantGrowthUrl?: string;
    };
  }
}

export {};
