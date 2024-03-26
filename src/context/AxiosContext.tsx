/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext, useContext } from "react";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AuthContext } from "./AuthContext";

const AxiosContext = createContext({});
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }: any) => {
  const authContext: any = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: "https://sports-backend-virid.vercel.app/api/v1",
  });

  const publicAxios = axios.create({
    baseURL: "https://sports-backend-virid.vercel.app/api/v1",
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext?.getAccessToken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest: any) => {
    const data = {
      refreshToken:
        authContext.auth.refreshToken || localStorage.getItem("refreshToken"),
    };

    const options = {
      method: "POST",
      data,
      url: "http://sports-backend-virid.vercel.app/api/v1/user/refresh-token",
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization =
          "Bearer " + tokenRefreshResponse.data.accessToken;

        authContext.setAuth({
          ...authContext.auth,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        localStorage.setItem(
          "accessToken",
          tokenRefreshResponse.data.accessToken
        );
        localStorage.setItem("refreshToken", authContext.auth.refreshToken);

        return Promise.resolve();
      })
      .catch((e: Error) => {
        console.log(e);
        authContext.setAuth({
          accessToken: null,
          refreshToken: null,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };
