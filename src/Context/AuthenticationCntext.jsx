import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { getLogedUserData } from "../Services/loginServices";

const AuthenticationCntext = createContext();

export function AuthenticationCntextProvider({ children }) {
  const [isLogedIn, setIsLogedIn] = useState(
    localStorage.getItem("token") != null,
  );
  const [userData, setuserData] = useState();

  async function getData() {
    const response = await getLogedUserData();
    if (response.message == "success") {
      setuserData(response.user);
    }
  }

  useEffect(() => {
    if (isLogedIn) {
      getData();
    }
  }, [isLogedIn]);

  return (
    <AuthenticationCntext.Provider
      value={{ isLogedIn, setIsLogedIn, userData, setuserData }}
    >
      {children}
    </AuthenticationCntext.Provider>
  );
}

export default AuthenticationCntext;
