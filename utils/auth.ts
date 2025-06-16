export function salvarToken(token: string) {
  localStorage.setItem('token', token);
}

export function obterToken(): string | null {
  return localStorage.getItem('token');
}

export function removerToken() {
  localStorage.removeItem('token');
}