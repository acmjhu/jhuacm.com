import getConfig from 'next/config';
import { fetchWrapper } from '../lib';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const user = process.browser && JSON.parse(localStorage.getItem('user'));

const login = async (username, password) => {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { username, password })
    .then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getAll = async () => {
  return fetchWrapper.get(baseUrl);
};

export const userService = {
  user,
  login,
  logout,
  getAll,
};
