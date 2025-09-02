import axios from "../api/axios";
import useAuth from "./useAuth";

const REFRESH_URL = "/auth/refresh";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<String> => {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });
    setAuth({
      email: response.data.email,
      accessToken: response.data.accessToken,
      name: response.data.name,
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
