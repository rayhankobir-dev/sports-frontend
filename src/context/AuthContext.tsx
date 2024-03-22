/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext({});
const { Provider } = AuthContext;

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuth: false,
    user: null,
  });

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth({
      accessToken: null,
      refreshToken: null,
      isAuth: false,
      user: null,
    });
    toast.success("User logged out");
  };

  const getAccessToken = () => {
    return auth.accessToken;
  };

  return (
    <Provider
      value={{
        auth,
        getAccessToken,
        setAuth,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
