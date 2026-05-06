// environment level constants
import * as dotEnv from 'dotenv';

dotEnv.config();

const env = process.env;

export const PORT = Number(env.PORT!);

export enum NodeEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const NODE_ENV = (env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT;

export const DATABASE_SETTINGS = {
  URL: env.DATABASE_URL!,
};

export const SECRET_TOKEN = env.JWT_SECRET_TOKEN!;
export const LOGIN_TOKEN_LIFETIME = 6000;

export const EMAIL_SETTINGS = {
  SERVICE_PROVIDER: 'gmail',
  USER_ID: env.EMAIL_USER_ID,
  PASSWORD: env.EMAIL_PASSWORD,
};

export const LOG_SETTINGS = {
  PRINT: {
    COLORIZE: NODE_ENV === NodeEnv.DEVELOPMENT,
    LEVEL: env.PRINT_LOG_LEVEL || 'debug',
  },
  FILE: {
    LOG_TO_FILE: NODE_ENV === NodeEnv.DEVELOPMENT,
    LEVEL: env.FILE_LOG_LEVEL || 'debug',
  },
};
