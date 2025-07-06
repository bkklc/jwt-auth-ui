import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
 

  const token = response.data.token || response.data;  
  if (!token) throw new Error("Token alınamadı.");

  localStorage.setItem("token", token);
  const decoded = jwtDecode(token);
  localStorage.setItem("user", JSON.stringify(decoded));
  return { token, user: decoded };
};


export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/user/register`, userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const stored = localStorage.getItem("user");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};
