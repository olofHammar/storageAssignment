import React, { useEffect, useState } from "react";
import {
  fbLogin,
  fbLogout,
  fbRegister,
  initFirebase,
} from "../services/firebase";

interface IAuthContext {
  isUserSignedIn: boolean;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<IAuthContext | undefined>(
  undefined
);

export const AuthContextProvider: React.FC = (props) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    initFirebase((result) => setIsUserSignedIn(result));
  }, []);

  const login = async (email: string, password: string) => {
    const userCredentials = await fbLogin(email, password);
    if (userCredentials) {
    } else {
      alert("Wrong username/password");
    }
  };

  const register = async (email: string, password: string) => {
    const userCreated = await fbRegister(email, password);
    if (userCreated.constructor === String) {
      alert(String(userCreated));
    } else {
      alert("Account created.");
    }
  };

  const logout = () => {
    fbLogout();
  };

  return (
    <AuthContext.Provider value={{ isUserSignedIn, register, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
