import { infer, object, string } from "zod";

const envVar = object({
  DATABASE_URL: string(),
  NODE_ENV: string(),
  EMAIL_USER: string(),
  EMAIL_PASS: string(),
  EMAIL_HOST: string(),
  EMAIL_PORT: string(),
  JWT_SECRET: string(),
  AUTH_SECRET: string(),
  AUTH_URL: string(),
  NEXT_PUBLIC_URL_IMG_SERVICE: string(),
  MY_URL_SITE: string(),
});

envVar.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends infer<typeof envVar> {}
  }
}
