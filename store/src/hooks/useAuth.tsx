import { useContext } from "react";
import { UseAuthContextType } from "../context/AuthProvider";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  return useContext<UseAuthContextType>(AuthContext);
};

export default useAuth;
