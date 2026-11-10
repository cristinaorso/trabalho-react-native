import { api } from './api';

// Erro de domínio: credenciais não conferem com os usuários da API.
export class AuthError extends Error {
  constructor(message = 'Credenciais inválidas.') {
    super(message);
    this.name = 'AuthError';
  }
}

// Regra de autenticação isolada da interface:
// 1) confere se o usuário existe na API; 2) realiza o login.
export async function login(username, password) {
  const cleanUsername = username.trim();

  const usersResponse = await api.get('/users?limit=0');
  const users = usersResponse.data.users || [];

  const userExists = users.some(
    (user) =>
      user.username.toLowerCase() === cleanUsername.toLowerCase() &&
      user.password === password
  );

  if (!userExists) {
    throw new AuthError();
  }

  const response = await api.post('/auth/login', {
    username: cleanUsername,
    password,
    expiresInMins: 30,
  });

  return response.data;
}
