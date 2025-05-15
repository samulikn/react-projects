import axios from "../api/axios";
import useAuth from "./useAuth";
import { AuthType } from "../context/AuthProvider";

type prevType = {
  prev: AuthType;
};

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async (): Promise<String> => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    const newToken: string = response.data.accessToken;

    setAuth({
      email: auth.email,
      password: auth.password,
      accessToken: newToken,
    });

    // setAuth((prev) => {
    //   return { ...prev, accessToken: newToken };
    // });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
