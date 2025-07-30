import { Role } from "@prisma/client";
import { JWT } from "next-auth/jwt";

interface UserAuthorizeReturn {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: Role;
}

declare module "next-auth" {
  interface Session {
    user: UserAuthorizeReturn;
  }

  interface User extends UserAuthorizeReturn {}
}

declare module "next-auth/jwt" {
  interface JWT extends UserAuthorizeReturn {}
}
