import axios, { CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const httpClient = axios.create(axiosConfig);

export const personalToken = import.meta.env.VITE_PERSONAL_TOKEN ;