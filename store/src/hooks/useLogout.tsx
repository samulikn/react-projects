import useAuth from "./useAuth";
import useOrders from "./useOrders";
import useAxiosPrivate from "./useAxiosPrivate";

const LOGOUT_URL = "/auth/logout";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { setOrders } = useOrders();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      await axiosPrivate.post(LOGOUT_URL, JSON.stringify({}));
      setAuth({ email: "", accessToken: "", name: "" });
      setOrders([]);
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
