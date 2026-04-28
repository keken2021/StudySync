export interface LoginDTO {
  email: string;
  password: string;
}
export interface TokenResponseDTO {
  isSuccess: boolean;
  token: string;
  message: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  school: string;
}

export interface UserResponseDTO {
  email: string;
  name: string;
  school: string;
}