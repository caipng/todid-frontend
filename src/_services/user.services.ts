import { config } from '../_constants/';
import { authHeader, parseResponse } from '../_helpers';

export const userService = {
  login,
  logout,
  signup,
  getUserData
};

export type User = {
  id: number;
  email: string;
  name: string;
  token: string;
};

export type UserSignupDetails = {
  name: string;
  email: string;
  password: string;
};

async function login(email: string, password: string) {
  const res = await fetch(`${config.apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const userData = (await parseResponse(res)) as User;
  if (!('token' in userData)) return Promise.reject('Invalid response');
  localStorage.setItem('user', JSON.stringify(userData));
  return userData;
}

async function getUserData() {
  const res = await fetch(`${config.apiUrl}/auth/me`, { method: 'GET', headers: authHeader() });
  return (await parseResponse(res)) as User;
}

function logout() {
  localStorage.removeItem('user');
}

async function signup(userSignupDetails: UserSignupDetails) {
  const res = await fetch(`${config.apiUrl}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userSignupDetails)
  });
  return (await parseResponse(res)) as User;
}
