import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { loginSchema } from "./validators/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { phoneNumber, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { phoneNumber },
        });

        if (!user) return null;

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          phoneNumber: user.phoneNumber,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: any; token?: any }) {
      if (token) session.user.id = token.sub!;
      return session;
    },
  },
};
