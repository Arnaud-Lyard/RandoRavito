import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string(),
  NODE_ENV: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),

  JWT_ACCESS_TOKEN_PRIVATE_KEY: z.string(),
  JWT_ACCESS_TOKEN_PUBLIC_KEY: z.string(),
  JWT_REFRESH_TOKEN_PRIVATE_KEY: z.string(),
  JWT_REFRESH_TOKEN_PUBLIC_KEY: z.string(),

  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),

  ORIGINS: z.string(),

  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string(),
});

export function validateEnv() {
  const envServer = envSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,

    JWT_ACCESS_TOKEN_PRIVATE_KEY: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
    JWT_ACCESS_TOKEN_PUBLIC_KEY: process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
    JWT_REFRESH_TOKEN_PRIVATE_KEY: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
    JWT_REFRESH_TOKEN_PUBLIC_KEY: process.env.JWT_REFRESH_TOKEN_PUBLIC_KEY,

    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    ORIGINS: process.env.ORIGINS,

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
  });

  if (!envServer.success) {
    console.error(envServer.error.issues);
    throw new Error("There is an error with the server environment variables");
    process.exit(1);
  }
}
// export const envServerSchema = envServer.data;

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
