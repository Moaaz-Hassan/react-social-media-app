import { useState } from "react";
import { createContext } from "react";
import { getLogedUserData } from "../Services/loginServices";
import { useQuery } from "@tanstack/react-query";

const AuthenticationCntext = createContext();

export function AuthenticationCntextProvider({ children }) {
  const [isLogedIn, setIsLogedIn] = useState(
    localStorage.getItem("loop_socialmediaApp_token") != null,
  );


  const { data: userData } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getLogedUserData ,
    enabled: isLogedIn ,
    select: (data) => data.data.user
  })



  return (
    <AuthenticationCntext.Provider
      value={{ isLogedIn, setIsLogedIn, userData }}
    >
      {children}
    </AuthenticationCntext.Provider>
  );
}

export default AuthenticationCntext;
