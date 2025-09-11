import axiosInstance from "./axiosInstance";

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface LoginSuccess {
  code: number;          
  msg: string;           
  session_id: string;    
  access_token: string;  
  refresh_token: string; 
}

export interface LoginFailure {
  code: number;           
  msg: string;            
}

export async function loginUser(payload: LoginUserPayload): Promise<LoginSuccess> {
  try {
    const { data, status } = await axiosInstance.post<LoginSuccess>("/auth/login", payload);

    // 201 on success
    if (status === 201 && data?.access_token) {
      return data;
    }

    // if backend changes
    throw new Error("Unexpected login response");
  } catch (err: any) {
    const backend = err?.response?.data as LoginFailure | undefined;

    const message =
      backend?.code === 401
        ? "Correo o contraseña incorrectos"
        : backend?.msg ?? "No se pudo iniciar sesión";

    throw new Error(message);
  }
}
