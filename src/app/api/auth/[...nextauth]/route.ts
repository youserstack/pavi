import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Naver from "next-auth/providers/naver";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { revalidatePath } from "next/cache";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Naver({
      clientId: process.env.NAVER_ID as string,
      clientSecret: process.env.NAVER_SECRET as string,
    }),
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        console.log(
          "☑️ api/auth/[...nextauth]/route > authorize callback : Credentials 인증/인가 처리"
        );

        try {
          // ⚪ 스프링서버에서 인증처리
          console.log("✔️ 스프링서버에서 인증처리중...");
          const res = await fetch(`${process.env.API_URL}/api/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
          });
          if (!res.ok) {
            const msg = "❌ 인증처리 실패";
            console.error(msg);
            throw new Error(msg);
          }
          const user = await res.json();
          console.log("✔️ 스프링서버로부터 인증된 사용자 데이터", { user });

          // ⚪ 넥스트서버에서 인가처리 (NextAuth는 이 객체를 기반으로 JWT/Session 생성)
          return user;
        } catch (error) {
          throw error;
          // if (error instanceof CredentialsSignin) throw error;
          // throw new CredentialsSignin("알 수 없는 인증 오류");
        }
      },
    }),
  ],
  callbacks: {
    // provider로부터 인증, 인가처리가 된후 호출
    // 로그인이 완료되기 직전에 호출되어 마무리한다.
    async signIn({ user, account, profile }) {
      console.log("☑️ api/auth/[...nextauth]/route > signIn callback : 로그인 처리");

      if (!account) {
        const msg = "❌ account 정보가 없습니다.";
        console.log(msg);
        return false;
      }

      if (account.provider === "credentials") {
        console.log("✔️ 인증/인가된 사용자 데이터", { user, account });
      }
      if (account.provider !== "credentials") {
        console.log("✔️ 인증/인가된 사용자 데이터", { user, account, profile });
      }

      console.log("🟢 로그인 성공");
      return true;
    },
    // async jwt({ token, user }) {
    //   // console.log("☑️ api/auth/[...nextauth]/route > jwt callback", { token, user });
    //   if (user) {
    //     token.userId = user.userId;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   // console.log("☑️ api/auth/[...nextauth]/route > session callback", { session, token });
    //   if (session.user && token.userId) {
    //     session.user.userId = token.userId as string;
    //   }
    //   return session;
    // },
  },
};

// export default NextAuth(authOptions);
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
