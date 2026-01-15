import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// REGISTER
export const registerUser = (data) =>
  API.post("/auth/register", data);

// LOGIN
export const loginUser = (data) =>
  API.post("/auth/login", data);

export default API;
