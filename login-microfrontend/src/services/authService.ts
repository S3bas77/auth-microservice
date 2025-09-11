import axios from "axios";

const API_URL = "http://localhost:3000/auth"; 

export async function changePassword(newPassword: string, confirmPassword: string) {
  try {
    const response = await axios.post(`${API_URL}/change-password`, {
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al cambiar la contraseña" };
  }
}
