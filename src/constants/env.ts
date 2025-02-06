const getEnv = (key: string) => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`no environment variable with ${key} key`);
  }
  return value;
};

export const PORT = getEnv("PORT");
export const NODE_ENV = getEnv("NODE_ENV");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
