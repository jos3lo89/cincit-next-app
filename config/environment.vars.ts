import { infer, object, string } from "zod";

const envVar = object({
  DATABASE_URL: string(),
  NODE_ENV: string(),
  CLOUDINARY_CLOUD_NAME: string(),
  CLOUDINARY_API_KEY: string(),
  CLOUDINARY_API_SECRET: string(),
});

envVar.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends infer<typeof envVar> {}
  }
}
