import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: 'o_f{T]2G;@)}-:d!NwHOm{w+S@y7G1w{A@bG_n4l.wZrbh:H$RO|9H;kh"28_=?', // Move secret inside authOptions
};

export default NextAuth(authOptions);
