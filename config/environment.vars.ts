import { infer, object, string } from "zod";

const envVar = object({
  DATABASE_URL: string(),
  NODE_ENV: string(),
  CLOUDINARY_CLOUD_NAME: string(),
  CLOUDINARY_API_KEY: string(),
  CLOUDINARY_API_SECRET: string(),
  EMAIL_USER: string(),
  EMAIL_PASS: string(),
  EMAIL_HOST: string(),
  EMAIL_PORT: string(),
  JWT_SECRET: string(),
  AUTH_SECRET: string(),
  NEXT_PUBLIC_URL_IMG_SERVICE: string(),
});

envVar.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends infer<typeof envVar> {}
  }
}
