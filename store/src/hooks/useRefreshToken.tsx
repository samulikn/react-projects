import axios from "../api/axios";
// import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
// import { jwtDecode } from "jwt-decode";
// import { UserInfoType } from "../components/Login";

const REFRESH_URL = "/auth/refresh";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  // const axiosPrivate = useAxiosPrivate();

  const refresh = async (): Promise<String> => {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });
    // const response = await axiosPrivate.get("/auth/refresh");

    // const accessToken: string = response?.data?.accessToken;

    // const decoded: UserInfoType | undefined = accessToken
    //   ? jwtDecode(accessToken)
    //   : undefined;

    // if (decoded) {
    //   const email = decoded?.userInfo.email;
    //   const name = decoded?.userInfo.name;
    setAuth({
      email: response.data.email,
      accessToken: response.data.accessToken,
      name: response.data.name,
    });
    // }
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
