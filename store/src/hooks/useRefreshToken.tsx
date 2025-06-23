import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async (): Promise<String> => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth({
      email: response.data.username,
      password: auth.password,
      accessToken: response.data.accessToken,
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
