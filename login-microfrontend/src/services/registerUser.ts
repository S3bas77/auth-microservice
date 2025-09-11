import axiosInstance from '../api/axiosInstance';

export interface RegisterUserData {
  nombre: string;
  email: string;
  contraseña: string;
}

export interface RegisterUserResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    nombre: string;
    email: string;
  };
}

export const registerUser = async (userData: RegisterUserData): Promise<RegisterUserResponse> => {
  try {
    const response = await axiosInstance.post('/auth/register-user', userData);
    return response.data;
  } catch (error: any) {
    console.error('Error en registerUser:', error);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Error al registrar usuario');
  }
};
