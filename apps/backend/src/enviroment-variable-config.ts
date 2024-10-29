import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const CONFIG_KEYS = {
  DB_HOST: 'DB_HOST',
  DB_PORT: 'DB_PORT',
  DB_USER: 'DB_USER',
  DB_PASSWORD: 'DB_PASSWORD',

  DB_DATABASE: 'DB_DATABASE',

  MAIL_AUTH_EMAIL_ADDRESS: 'MAIL_AUTH_EMAIL_ADDRESS',
  MAIL_AUTH_EMAIL_PASSWORD: 'MAIL_AUTH_EMAIL_PASSWORD',

  COOKIE_SECRET: 'COOKIE_SECRET',

  FRONTEND_URL: 'FRONTEND_URL',
} as const;

const envFileValidationSchema = Joi.object(
  Object.values(CONFIG_KEYS)
    .map((variableName) => ({
      [variableName]: Joi.string().required(),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
);

export const GLOBAL_CONFIG_MODULES = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    validationSchema: envFileValidationSchema,
  }),
];
