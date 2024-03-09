import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import * as UserModal from "@models/user";
import { connectToDB } from "@utils/database";
import { error } from "console";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await UserModal.User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
  
        return session;
      },
      async signIn({ profile }) {
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
            await connectToDB();
    
            const UserExists = await UserModal.User.findOne({
              email: profile?.email,
            });
      
            if(!UserExists) {
              await UserModal.User.create({
                  email: profile?.email,
                  username: profile?.name?.replace(" ", "").toLowerCase(),
                  image: profile?.picture
              })
            }
      
            return true;
        } else {
            console.log(error);
            return false;
        }
      },
  }
});

export { handler as GET, handler as POST };
