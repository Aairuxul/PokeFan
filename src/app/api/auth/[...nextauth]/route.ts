import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
    callbacks: {
      async jwt({ token, account, session }) {
        if (account) {
          token.accessToken = account.access_token
          session.accessToken = token.accessToken
        }
        console.log(token)
        return token
      },
  }
})

export { handler as GET, handler as POST }