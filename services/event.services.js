import { fetchWrapper, parseMarkdown } from '../lib';
import getConfig from 'next/config';
import { Router } from 'next/router';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/events`;

const create = async (title, author, content, time) => {
  return fetchWrapper
    .post(`${baseUrl}/create`, {
      title,
      author,
      content,
      time,
    })
    .then((event) => event);
};

const update = async (id, title, author, content) => {
  return fetchWrapper
    .put(`${baseUrl}/create`, {
      id,
      title,
      author,
      content,
    })
    .then((event) => event);
};

const getAll = async () => {
  return fetchWrapper.get(baseUrl, false);
};

const getOne = async (id) => {
  return fetchWrapper.get(`${baseUrl}/${id}`, false);
};

const deleteOne = async (id) => {
  return fetchWrapper.delete(`${baseUrl}/${id}`, true);
};

export const eventService = {
  create,
  getAll,
  getOne,
  deleteOne,
  update,
};
