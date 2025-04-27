import axious, { AxiosInstance, AxiosError } from "axios";

const apiClient: AxiosInstance = axious.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (!error.response) {
      // network or CORS error
      return Promise.reject(new Error("SERVER_DOWN"));
    }
    return Promise.reject(error);
  }
);

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  userId: string;
  token: string;
}

export async function loginUser(
  payload: ILoginRequest
): Promise<ILoginResponse> {
  const response = await apiClient.post<ILoginResponse>("/login", payload);
  return response.data;
}

export interface IRegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  userId: string;
  token: string;
  message: string;
}

export async function registerUser(
  payload: IRegisterRequest
): Promise<IRegisterResponse> {
  const response = await apiClient.post<IRegisterResponse>(
    "/register",
    payload
  );
  return response.data;
}
