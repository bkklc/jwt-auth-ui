import axios from "axios";

const API_URL = "https://localhost:7130/api";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await instance.post("/auth/login", { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const register = (userData) => {
  return axios.post(`${API_URL}/user/register`, userData);
};

export const logout = () => {
  localStorage.removeItem("token");
};
