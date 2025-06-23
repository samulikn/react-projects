import { Outlet } from "react-router-dom";
import { useState, useEffect, ReactElement } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async (): Promise<void> => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  const content: ReactElement | ReactElement[] = isLoading ? (
    <p>Loading...</p>
  ) : (
    <Outlet />
  );

  return content;
}

export default PersistLogin;
