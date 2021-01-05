export function authHeader(): { Authorization: string } {
  const text = localStorage.getItem('user');
  if (text == null) return { Authorization: '' };
  const user = JSON.parse(text);
  return { Authorization: user && user.token ? 'Bearer ' + user.token : '' };
}
