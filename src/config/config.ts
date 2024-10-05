import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  CERT_KEY: process.env.CERT_KEY_PATH,
  CERT_CERT: process.env.CERT_CERT_PATH,
  SECRET_KEY: "SECRET_KEY",
  SECRET_KEY_ADMIN: "ADMIN_KEY",
  ENV: process.env.NODE_ENV || 'development'
};