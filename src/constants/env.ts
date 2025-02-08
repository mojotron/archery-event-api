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
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const APP_ORIGIN_CLIENT = getEnv("APP_ORIGIN_CLIENT");
export const APP_ORIGIN_ADMIN = getEnv("APP_ORIGIN_ADMIN");
export const JWT_ACCESS_SECRET = getEnv("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
