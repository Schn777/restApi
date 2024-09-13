import dotenv from "dotenv"
dotenv.config();

export const DB_URL = process.env.DATABASE_URL || "";
export const PORT = process.env.PORT || 0;
export const SECRET_KEY = process.env.SECRET_KEY || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const NODE_ENV = process.env.NODE_ENV || "";
export const IS_PROD = process.env.NODE_ENV === "production";
