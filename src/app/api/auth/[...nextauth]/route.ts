import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
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
