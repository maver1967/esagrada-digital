import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticateUser } from '@/core/use-cases/AuthenticateUser';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Código ou E-mail', type: 'text' },
        password: { label: 'Palavra-passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        try {
          const user = await authenticateUser({
            identifier: credentials.identifier,
            password: credentials.password,
          });

          if (user) {
            return {
              id: user.id,
              code: user.code,
              email: user.email || '',
              name: user.name,
              role: user.role,
            };
          }
        } catch (error) {
          console.error('Auth error:', error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.code = (user as any).code;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).code = token.code;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'esagrada_secret_key_synology_2026_super_secure_jwt',
};
