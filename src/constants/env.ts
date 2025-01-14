const getEnv = (key: string) => {
  const value = process.env[key];

  if (value === undefined) {
    throw Error(`Missing environment variable for ${key}`);
  }

  return value;
};

export const NODE_ENV = getEnv("NODE_ENV");
export const PORT = getEnv("PORT");
export const APP_ORIGIN_ADMIN = getEnv("APP_ORIGIN_ADMIN");
export const APP_ORIGIN_CLIENT = getEnv("APP_ORIGIN_CLIENT");
export const JWT_ACCESS_SECRET = getEnv("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
