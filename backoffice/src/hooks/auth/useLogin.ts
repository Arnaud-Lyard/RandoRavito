import { AuthService } from "@/services/auth.service";

export const useLogin = () => {
  const login = async (email: string, password: string) => {
    const authService = new AuthService(process.env.NEXT_PUBLIC_SERVER_URL!);

    await authService.login(email, password);
  };
  return { login };
};
