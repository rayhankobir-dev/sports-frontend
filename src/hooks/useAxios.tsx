import { AxiosContext } from "@/context/AxiosContext";
import { useContext } from "react";

const useAxios = () => {
  const axiosContext = useContext(AxiosContext);
  if (!axiosContext) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return axiosContext;
};

export default useAxios;
