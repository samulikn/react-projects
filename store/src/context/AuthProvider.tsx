import { ReactElement, createContext, useState } from "react";

export type AuthType = {
  email: string;
  password: string;
  accessToken: string;
};

const initAuthState: AuthType = {
  email: "",
  password: "",
  accessToken: "",
};

export type UseAuthContextType = {
  auth: AuthType;
  setAuth: (auth: AuthType) => void;
};

const initAuthContext: UseAuthContextType = {
  auth: { email: "", password: "", accessToken: "" },
  setAuth: () => {}
};

const AuthContext = createContext(initAuthContext);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const UserProvider = ({ children }: ChildrenType) => {
  const [auth, setAuth] = useState<AuthType>(initAuthState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
