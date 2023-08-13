globalThis.asset = (path: string): string => {
  return `${env("asset")}/${path}`;
};
