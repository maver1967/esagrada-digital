import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export interface AuthenticateInput {
  identifier: string; // can be code (e.g. 'p104') or email (e.g. 'user@esagrada.mz')
  password: string;
}

export async function authenticateUser(input: AuthenticateInput) {
  const { identifier, password } = input;
  if (!identifier || !password) {
    throw new Error('Identificador e palavra-passe são obrigatórios.');
  }

  const cleanIdentifier = identifier.trim().toLowerCase();

  // Search user by code OR email
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { code: cleanIdentifier },
        { email: cleanIdentifier },
      ],
      active: true,
    },
  });

  if (!user) {
    return null;
  }

  // Check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    // Also allow default fallback password '123456' for initial login if hash matches or if direct check
    if (password === '123456' && user.password === '123456') {
      return user;
    }
    return null;
  }

  return user;
}
