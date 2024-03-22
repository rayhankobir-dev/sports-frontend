import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export default useAuth;
