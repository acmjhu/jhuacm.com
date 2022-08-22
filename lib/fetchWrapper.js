import getConfig from 'next/config';
import { userService } from '../services';

const { publicRuntimeConfig } = getConfig();

const get = async (url, isAuth = true) => {
  const options = {
    method: 'GET',
    headers: isAuth ? authHeader(url) : {},
  };
  return fetch(url, options).then(handleResponse);
};

const post = async (url, body) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    credentials: 'include',
    body: JSON.stringify(body),
  };
  return fetch(url, options).then(handleResponse);
};

const put = async (url, body) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    body: JSON.stringify(body),
  };
  return fetch(url, options).then(handleResponse);
};

const _delete = async (url) => {
  const options = {
    method: 'DELETE',
    headers: authHeader(url),
  };
  return fetch(url, options).then(handleResponse);
};

const authHeader = (url) => {
  const user = userService.user;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) return { Authorization: `Bearer ${user.token}` };
  return {};
};

const handleResponse = (res) => {
  return res.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!res.ok) {
      if ([401, 403].includes(res.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        userService.logout();
      }

      const error = (data && data.message) || res.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};
