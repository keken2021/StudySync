import type {
  RegisterDTO,
  TokenResponseDTO,
  UserResponseDTO,
} from "@/types/AuthTypes";
import api from "./axios";

// create user (register)
export const createUser = async (
  user: RegisterDTO,
): Promise<TokenResponseDTO> => {
  const response = await api.post<TokenResponseDTO>("/auth/register", user);
  return response.data;
};

export async function getCurrentUser(): Promise<UserResponseDTO | null> {
  try {
    // Ensure the path is exactly what the controller expects
    const response = await api.get<UserResponseDTO>("/auth/me");
    console.log("RESPO:", response.data);
    return response.data;
  } catch (error) {
    console.error("Auth error:", error); // Debugging: check console to see if it's 401 or 404
    return null;
  }
}
