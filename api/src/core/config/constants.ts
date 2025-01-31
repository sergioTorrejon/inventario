import * as dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = 'PORT';
/**
 * Esta variable nos devolvera la configuracion de typeorm
 */
export const TYPEORM_CONFIG = 'database.config'
// export const DATABASE_HOST = 'DATABASE_HOST';
// export const DATABASE_PORT = 'DATABASE_PORT';
// export const DATABASE_USERNAME = 'DATABASE_USERNAME';
// export const DATABASE_PASSWORD = 'DATABASE_PASSWORD';
// export const DATABASE_NAME = 'DATABASE_NAME';
export const DEFAULT_USER_EMAIL = 'DEFAULT_USER_EMAIL';
export const DEFAULT_USER_PASSWORD = 'DEFAULT_USER_PASSWORD';
// REPOSITORIOS


export const appConfig = {
    SERVER_ENV:  process.env.NODE_ENV || '',
    SERVER_PORT: process.env.SERVER_PORT || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    PATH_ROOT: process.env.PATH_ROOT || '',
    IP_KONG : process.env.IP_KONG,
    ssl: false,
  };