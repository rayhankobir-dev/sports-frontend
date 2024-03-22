/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import SpinerLoading from "./components/spiner-loading";
import AppRoutes from "./routes";
import useAxios from "./hooks/useAxios";

const App = () => {
  const { setAuth }: any = useAuth();
  const [loading, setLoading] = useState(true);
  const { authAxios }: any = useAxios();

  const loadAuth = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const response = await authAxios.get("/user/profile");
        setAuth({
          accessToken,
          refreshToken,
          user: response.data.data.user,
          isAuth: true,
        });
      } else {
        setAuth({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuth: false,
        });
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(`localStorage Error: ${error.message}`);
      setAuth({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuth: false,
      });
    }
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  if (loading) {
    return <SpinerLoading />;
  }

  return <AppRoutes />;
};

export default App;
