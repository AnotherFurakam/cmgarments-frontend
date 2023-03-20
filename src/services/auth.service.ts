import Api from "@/config/Api";
import { IAuth, ILogin } from "@/models/auth.interface";

const login = async (body: ILogin): Promise<IAuth> => {
  const res = await Api.post("/account/auth/login", body);
  return res.data;
};

const authService = {
  login,
};

export { authService };
