/* eslint-disable no-console */
import axios from 'axios';

import { BASE_URL } from './config';

export const getApiCall = async (url: string, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const postApiCall = async (url: string, body: any) => {
  try {
    const response = await axios.post(`${BASE_URL}${url}`, body);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
