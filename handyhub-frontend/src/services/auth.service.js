import { api } from './api';

const handleError = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 401) {
      throw new Error("Incorrect email or password");
    }
    if (status === 409) {
      throw new Error("Email already exists. Please try logging in.");
    }
    if (data && data.message) {
      throw new Error(data.message);
    }
    throw new Error("Something went wrong. Please try again.");
  } else {
    throw new Error("Network error. Please check your connection.");
  }
};

const register = async (name, email, password) => {
  try {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  getCurrentUser,
  logout,
};
