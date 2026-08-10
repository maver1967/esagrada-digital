export type UserRole = 'DIRECAO' | 'SECRETARIA' | 'PROFESSOR' | 'ALUNO';

export interface UserEntity {
  id: string;
  code: string;       // e.g. 'p104', 'ESF000009', 'direcao'
  email?: string | null;
  name: string;
  role: UserRole;
  avatar?: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: {
    id: string;
    code: string;
    email?: string | null;
    name: string;
    role: UserRole;
  };
  expires: string;
}
