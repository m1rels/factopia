import { DefaultUser } from "next-auth";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | StaticImport | any;
    } & {
      id: string;
    };
  }
}
