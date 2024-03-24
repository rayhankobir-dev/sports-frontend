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
      setAuth({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuth: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <SpinerLoading size={23} className="text-green-600" />
      </div>
    );
  }

  return <AppRoutes />;
};

export default App;
