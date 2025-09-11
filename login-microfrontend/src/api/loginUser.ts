import axiosInstance from "./axiosInstance";

export interface LoginUserPayload {
  email: string;
  password: string;
}

export async function loginUser(payload: LoginUserPayload) {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
}
